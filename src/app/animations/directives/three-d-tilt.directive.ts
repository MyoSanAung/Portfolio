import { Directive, Input, ElementRef, OnInit, OnDestroy, HostListener, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[app3dTilt]',
    standalone: true
})
export class ThreeDTiltDirective implements OnInit, OnDestroy {
    @Input() maxTilt: number | string = 12;
    @Input() perspective: number | string = 1000;
    @Input() scale: number | string = 1.04;
    @Input() speed: number | string = 300;
    @Input() glare: boolean | string = true;
    @Input() maxGlare: number | string = 0.25;

    private parsedMaxTilt: number = 12;
    private parsedPerspective: number = 1000;
    private parsedScale: number = 1.04;
    private parsedSpeed: number = 300;
    private parsedGlare: boolean = true;
    private parsedMaxGlare: number = 0.25;

    private hostEl!: HTMLElement;
    private glareEl: HTMLElement | null = null;
    private transitionTimeout: any = null;
    private isBrowser: boolean;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.hostEl = this.elementRef.nativeElement;
    }

    ngOnInit(): void {
        if (!this.isBrowser) return;

        // Parse inputs to ensure correct types
        this.parsedMaxTilt = typeof this.maxTilt === 'string' ? parseFloat(this.maxTilt) : this.maxTilt;
        this.parsedPerspective = typeof this.perspective === 'string' ? parseFloat(this.perspective) : this.perspective;
        this.parsedScale = typeof this.scale === 'string' ? parseFloat(this.scale) : this.scale;
        this.parsedSpeed = typeof this.speed === 'string' ? parseFloat(this.speed) : this.speed;
        this.parsedGlare = typeof this.glare === 'string' ? this.glare !== 'false' : !!this.glare;
        this.parsedMaxGlare = typeof this.maxGlare === 'string' ? parseFloat(this.maxGlare) : this.maxGlare;

        // Prepare host styles for 3D
        this.renderer.setStyle(this.hostEl, 'transform-style', 'preserve-3d');
        this.renderer.setStyle(this.hostEl, 'will-change', 'transform');
        
        if (this.parsedGlare) {
            this.createGlare();
        }
    }

    ngOnDestroy(): void {
        this.cleanup();
    }

    private createGlare(): void {
        // Create glare container and inner glare element
        this.glareEl = this.renderer.createElement('div');
        this.renderer.setStyle(this.glareEl, 'position', 'absolute');
        this.renderer.setStyle(this.glareEl, 'top', '0');
        this.renderer.setStyle(this.glareEl, 'left', '0');
        this.renderer.setStyle(this.glareEl, 'width', '100%');
        this.renderer.setStyle(this.glareEl, 'height', '100%');
        this.renderer.setStyle(this.glareEl, 'overflow', 'hidden');
        this.renderer.setStyle(this.glareEl, 'pointer-events', 'none');
        this.renderer.setStyle(this.glareEl, 'border-radius', 'inherit');
        this.renderer.setStyle(this.glareEl, 'z-index', '99');

        const glareInner = this.renderer.createElement('div');
        this.renderer.setStyle(glareInner, 'position', 'absolute');
        this.renderer.setStyle(glareInner, 'top', '50%');
        this.renderer.setStyle(glareInner, 'left', '50%');
        this.renderer.setStyle(glareInner, 'width', '200%');
        this.renderer.setStyle(glareInner, 'height', '200%');
        this.renderer.setStyle(glareInner, 'background', 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)');
        this.renderer.setStyle(glareInner, 'transform', 'translate(-50%, -50%)');
        this.renderer.setStyle(glareInner, 'opacity', '0');
        this.renderer.setStyle(glareInner, 'transition', `opacity ${this.parsedSpeed}ms ease`);
        this.renderer.setStyle(glareInner, 'pointer-events', 'none');

        this.renderer.appendChild(this.glareEl, glareInner);
        
        // Ensure host is positioned so absolute overlays align to it
        const position = window.getComputedStyle(this.hostEl).position;
        if (position === 'static') {
            this.renderer.setStyle(this.hostEl, 'position', 'relative');
        }
        
        this.renderer.appendChild(this.hostEl, this.glareEl);
    }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        if (!this.isBrowser) return;
        this.renderer.setStyle(this.hostEl, 'transition', `transform ${this.parsedSpeed}ms cubic-bezier(0.25, 1, 0.5, 1)`);
        
        if (this.glareEl) {
            const innerGlare = this.glareEl.firstChild as HTMLElement;
            if (innerGlare) {
                this.renderer.setStyle(innerGlare, 'transition', `transform 0ms, opacity ${this.parsedSpeed}ms ease`);
                this.renderer.setStyle(innerGlare, 'opacity', this.parsedMaxGlare.toString());
            }
        }

        // Temporarily disable transition during mousemove after entry
        if (this.transitionTimeout) {
            clearTimeout(this.transitionTimeout);
        }
        this.transitionTimeout = setTimeout(() => {
            this.renderer.setStyle(this.hostEl, 'transition', 'none');
            if (this.glareEl) {
                const innerGlare = this.glareEl.firstChild as HTMLElement;
                if (innerGlare) {
                    this.renderer.setStyle(innerGlare, 'transition', 'none');
                }
            }
        }, this.parsedSpeed);
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        if (!this.isBrowser) return;
        const rect = this.hostEl.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Calculate mouse position relative to element, from center (-0.5 to 0.5)
        const mouseX = (event.clientX - rect.left) / width - 0.5;
        const mouseY = (event.clientY - rect.top) / height - 0.5;

        // Calculate rotation angles
        const rotateX = -(mouseY * this.parsedMaxTilt);
        const rotateY = mouseX * this.parsedMaxTilt;

        // Apply transformations
        this.renderer.setStyle(
            this.hostEl,
            'transform',
            `perspective(${this.parsedPerspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.parsedScale}, ${this.parsedScale}, ${this.parsedScale})`
        );

        // Update glare position
        if (this.glareEl) {
            const innerGlare = this.glareEl.firstChild as HTMLElement;
            if (innerGlare) {
                // Calculate position relative to container center
                const glareX = (event.clientX - rect.left - width / 2) * 2;
                const glareY = (event.clientY - rect.top - height / 2) * 2;
                
                this.renderer.setStyle(
                    innerGlare,
                    'transform',
                    `translate(-50%, -50%) translate3d(${glareX}px, ${glareY}px, 0px)`
                );
            }
        }
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        if (!this.isBrowser) return;
        if (this.transitionTimeout) {
            clearTimeout(this.transitionTimeout);
        }

        // Apply transition back to default state
        this.renderer.setStyle(this.hostEl, 'transition', `transform ${this.parsedSpeed}ms cubic-bezier(0.25, 1, 0.5, 1)`);
        this.renderer.setStyle(
            this.hostEl,
            'transform',
            `perspective(${this.parsedPerspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
        );

        if (this.glareEl) {
            const innerGlare = this.glareEl.firstChild as HTMLElement;
            if (innerGlare) {
                this.renderer.setStyle(innerGlare, 'transition', `transform ${this.parsedSpeed}ms ease, opacity ${this.parsedSpeed}ms ease`);
                this.renderer.setStyle(innerGlare, 'opacity', '0');
            }
        }
    }

    private cleanup(): void {
        if (this.transitionTimeout) {
            clearTimeout(this.transitionTimeout);
        }
        if (this.glareEl && this.glareEl.parentNode) {
            this.glareEl.parentNode.removeChild(this.glareEl);
        }
    }
}
