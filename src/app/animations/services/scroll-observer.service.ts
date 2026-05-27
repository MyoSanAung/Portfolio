import { Injectable } from '@angular/core';
import { IScrollObserver, ObserverCallback, ScrollDirection } from '../interfaces/scroll-observer.interface';
import { ObserverOptions } from '../interfaces/animation-config.interface';

/**
 * Scroll observer service - placeholder implementation
 * Will be fully implemented in task 2.1
 */
@Injectable({
    providedIn: 'root'
})
export class ScrollObserverService implements IScrollObserver {

    observe(element: HTMLElement, callback: ObserverCallback, options?: Partial<ObserverOptions>): void {
        // Placeholder implementation
        console.log('ScrollObserver.observe called', element, callback, options);
    }

    unobserve(element: HTMLElement): void {
        // Placeholder implementation
        console.log('ScrollObserver.unobserve called', element);
    }

    isInViewport(element: HTMLElement): boolean {
        // Placeholder implementation
        console.log('ScrollObserver.isInViewport called', element);
        return false;
    }

    getScrollProgress(): number {
        // Placeholder implementation
        console.log('ScrollObserver.getScrollProgress called');
        return 0;
    }

    getScrollDirection(): ScrollDirection {
        // Placeholder implementation
        console.log('ScrollObserver.getScrollDirection called');
        return ScrollDirection.NONE;
    }

    getScrollVelocity(): number {
        // Placeholder implementation
        console.log('ScrollObserver.getScrollVelocity called');
        return 0;
    }

    disconnect(): void {
        // Placeholder implementation
        console.log('ScrollObserver.disconnect called');
    }

    getIntersectionRatio(element: HTMLElement): number | null {
        // Placeholder implementation
        console.log('ScrollObserver.getIntersectionRatio called', element);
        return null;
    }
}