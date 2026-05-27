import { AnimationOptions, AnimationType, StaggerOptions, AnimationState } from './animation-config.interface';

/**
 * Core animation service interface
 */
export interface IAnimationCore {
    /**
     * Fade in an element
     * @param element Target HTML element
     * @param options Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    fadeIn(element: HTMLElement, options?: AnimationOptions): Promise<void>;

    /**
     * Fade out an element
     * @param element Target HTML element
     * @param options Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    fadeOut(element: HTMLElement, options?: AnimationOptions): Promise<void>;

    /**
     * Slide element up into view
     * @param element Target HTML element
     * @param options Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    slideUp(element: HTMLElement, options?: AnimationOptions): Promise<void>;

    /**
     * Slide element down into view
     * @param element Target HTML element
     * @param options Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    slideDown(element: HTMLElement, options?: AnimationOptions): Promise<void>;

    /**
     * Scale element into view
     * @param element Target HTML element
     * @param options Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    scaleIn(element: HTMLElement, options?: AnimationOptions): Promise<void>;

    /**
     * Scale element out of view
     * @param element Target HTML element
     * @param options Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    scaleOut(element: HTMLElement, options?: AnimationOptions): Promise<void>;

    /**
     * Pulse animation effect
     * @param element Target HTML element
     * @param options Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    pulse(element: HTMLElement, options?: AnimationOptions): Promise<void>;

    /**
     * Staggered animation for multiple elements
     * @param elements Array of HTML elements to animate
     * @param options Stagger animation configuration
     * @returns Promise that resolves when all animations complete
     */
    staggeredAnimation(elements: HTMLElement[], options?: StaggerOptions): Promise<void>;

    /**
     * Cancel any running animation on an element
     * @param element Target HTML element
     */
    cancelAnimation(element: HTMLElement): void;

    /**
     * Check if an element is currently animating
     * @param element Target HTML element
     * @returns True if element is currently animating
     */
    isAnimating(element: HTMLElement): boolean;

    /**
     * Get current animation state for an element
     * @param element Target HTML element
     * @returns Animation state or null if not animating
     */
    getAnimationState(element: HTMLElement): AnimationState | null;

    /**
     * Execute a custom animation type
     * @param element Target HTML element
     * @param type Animation type to execute
     * @param options Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    animate(element: HTMLElement, type: AnimationType, options?: AnimationOptions): Promise<void>;
}