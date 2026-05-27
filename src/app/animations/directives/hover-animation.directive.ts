import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { AnimationType } from '../interfaces/animation-config.interface';

/**
 * Hover animation directive - placeholder implementation
 * Will be fully implemented in task 5.1
 */
@Directive({
    selector: '[hoverAnimation]',
    standalone: true
})
export class HoverAnimationDirective implements OnInit, OnDestroy {
    @Input() hoverAnimation: AnimationType = 'pulse';
    @Input() hoverScale: number = 1.05;

    constructor(private elementRef: ElementRef<HTMLElement>) { }

    ngOnInit(): void {
        // Placeholder implementation
        console.log('HoverAnimationDirective initialized', {
            element: this.elementRef.nativeElement,
            animation: this.hoverAnimation,
            scale: this.hoverScale
        });
    }

    ngOnDestroy(): void {
        // Placeholder implementation
        console.log('HoverAnimationDirective destroyed');
    }
}