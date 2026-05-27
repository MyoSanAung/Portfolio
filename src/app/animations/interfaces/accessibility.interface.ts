/**
 * Accessibility service interface for animation compliance
 */

export interface IAccessibilityService {
    /**
     * Check if user prefers reduced motion
     * @returns True if reduced motion is preferred
     */
    shouldReduceMotion(): boolean;

    /**
     * Get all focusable elements within a container
     * @param container Container element to search within
     * @returns Array of focusable elements
     */
    getFocusableElements(container: HTMLElement): HTMLElement[];

    /**
     * Preserve focus on an element during animations
     * @param element Element to maintain focus on
     */
    preserveFocus(element: HTMLElement): void;

    /**
     * Announce a message to screen readers
     * @param message Message to announce
     * @param priority Announcement priority level
     */
    announceToScreenReader(message: string, priority?: 'polite' | 'assertive'): void;

    /**
     * Check if an element is currently focused
     * @param element Element to check
     * @returns True if element has focus
     */
    hasFocus(element: HTMLElement): boolean;

    /**
     * Set up focus management for an animated element
     * @param element Element that will be animated
     * @param options Focus management options
     */
    setupFocusManagement(element: HTMLElement, options?: FocusManagementOptions): void;

    /**
     * Clean up focus management for an element
     * @param element Element to clean up
     */
    cleanupFocusManagement(element: HTMLElement): void;

    /**
     * Check if animations should be disabled for accessibility
     * @returns True if animations should be disabled
     */
    shouldDisableAnimations(): boolean;

    /**
     * Get alternative animation configuration for reduced motion
     * @returns Reduced motion animation settings
     */
    getReducedMotionConfig(): ReducedMotionConfig;
}

export interface FocusManagementOptions {
    /** Whether to maintain focus during animation */
    maintainFocus?: boolean;
    /** Whether to announce animation start/end to screen readers */
    announceChanges?: boolean;
    /** Custom focus restoration element */
    focusTarget?: HTMLElement;
}

export interface ReducedMotionConfig {
    /** Use instant transitions instead of animations */
    useInstantTransitions: boolean;
    /** Maximum allowed animation duration in milliseconds */
    maxDuration: number;
    /** Allowed animation types for reduced motion */
    allowedAnimations: string[];
    /** Whether to show static alternatives */
    showStaticAlternatives: boolean;
}