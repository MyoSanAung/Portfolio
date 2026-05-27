import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { AnimationType } from '../interfaces/animation-config.interface';

/**
 * Load animation directive - placeholder implementation
 * Will be fully implemented in task 6.1
 */
@Directive({
    selector: '[loadAnimation]',
    standalone: true
})
export class LoadAnimationDirective implements OnInit, OnDestroy {
    @Input() loadAnimation: AnimationType = 'staggeredFadeIn';
    @Input() staggerDelay: number = 100;

    constructor(private elementRef: ElementRef<HTMLElement>) { }

    ngOnInit(): void {
        // Placeholder implementation
        console.log('LoadAnimationDirective initialized', {
            element: this.elementRef.nativeElement,
            animation: this.loadAnimation,
            staggerDelay: this.staggerDelay
        });
    }

    ngOnDestroy(): void {
        // Placeholder implementation
        console.log('LoadAnimationDirective destroyed');
    }
}