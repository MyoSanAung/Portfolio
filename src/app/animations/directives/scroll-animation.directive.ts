import { Directive, Input, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AnimationType } from '../interfaces/animation-config.interface';

@Directive({
    selector: '[scrollAnimation]',
    standalone: true
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
    @Input() scrollAnimation: AnimationType = 'fadeIn';
    @Input() animationDelay: number = 0;
    @Input() animationDuration: number = 800;
    @Input() threshold: number = 0.1;

    private hostEl: HTMLElement;
    private observer: IntersectionObserver | null = null;
    private timeoutId: any = null;
    private hasAnimated = false;

    constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {
        this.hostEl = this.elementRef.nativeElement;
    }

    ngOnInit(): void {
        if (typeof window === 'undefined') return;

        // Apply base transition properties
        this.renderer.addClass(this.hostEl, 'scroll-animate');
        this.renderer.setStyle(this.hostEl, 'transition-duration', `${this.animationDuration}ms`);
        this.renderer.setStyle(this.hostEl, 'transition-timing-function', 'cubic-bezier(0.25, 1, 0.5, 1)');

        // Apply initial hidden styles depending on animation type
        const initClass = this.getInitClass();
        if (initClass) {
            this.renderer.addClass(this.hostEl, initClass);
        }

        // Set up intersection observer
        this.setupObserver();
    }

    ngOnDestroy(): void {
        this.cleanup();
    }

    private setupObserver(): void {
        const options = {
            root: null,
            threshold: this.threshold,
            rootMargin: '0px 0px -50px 0px' // triggers slightly before entering viewport fully
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.triggerAnimation();
                    this.disconnectObserver();
                }
            });
        }, options);

        this.observer.observe(this.hostEl);
    }

    private triggerAnimation(): void {
        // Handle delay in JS to ensure clean staggering that isn't overridden by CSS transition delays
        this.timeoutId = setTimeout(() => {
            const initClass = this.getInitClass();
            const activeClass = this.getActiveClass();

            if (initClass && activeClass) {
                this.renderer.removeClass(this.hostEl, initClass);
                this.renderer.addClass(this.hostEl, activeClass);
            }
        }, this.animationDelay);
    }

    private getInitClass(): string {
        switch (this.scrollAnimation) {
            case 'blurIn':
                return 'scroll-blur-in-init';
            case 'fadeIn':
            default:
                return 'scroll-fade-in-init';
        }
    }

    private getActiveClass(): string {
        switch (this.scrollAnimation) {
            case 'blurIn':
                return 'scroll-blur-in-active';
            case 'fadeIn':
            default:
                return 'scroll-fade-in-active';
        }
    }

    private disconnectObserver(): void {
        if (this.observer) {
            this.observer.unobserve(this.hostEl);
            this.observer.disconnect();
            this.observer = null;
        }
    }

    private cleanup(): void {
        this.disconnectObserver();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}