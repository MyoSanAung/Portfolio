import { ObserverOptions } from './animation-config.interface';

/**
 * Scroll observer callback function type
 */
export type ObserverCallback = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;

/**
 * Scroll direction enumeration
 */
export enum ScrollDirection {
    UP = 'up',
    DOWN = 'down',
    NONE = 'none'
}

/**
 * Scroll observer service interface
 */
export interface IScrollObserver {
    /**
     * Observe an element for intersection changes
     * @param element Element to observe
     * @param callback Callback function to execute on intersection
     * @param options Observer configuration options
     */
    observe(element: HTMLElement, callback: ObserverCallback, options?: Partial<ObserverOptions>): void;

    /**
     * Stop observing an element
     * @param element Element to stop observing
     */
    unobserve(element: HTMLElement): void;

    /**
     * Check if an element is currently in the viewport
     * @param element Element to check
     * @returns True if element is in viewport
     */
    isInViewport(element: HTMLElement): boolean;

    /**
     * Get current scroll progress as a percentage
     * @returns Scroll progress from 0 to 1
     */
    getScrollProgress(): number;

    /**
     * Get current scroll direction
     * @returns Current scroll direction
     */
    getScrollDirection(): ScrollDirection;

    /**
     * Get scroll velocity in pixels per second
     * @returns Current scroll velocity
     */
    getScrollVelocity(): number;

    /**
     * Disconnect all observers and clean up
     */
    disconnect(): void;

    /**
     * Get intersection ratio for a specific element
     * @param element Element to check
     * @returns Intersection ratio (0-1) or null if not observed
     */
    getIntersectionRatio(element: HTMLElement): number | null;
}