/**
 * Core animation configuration interfaces
 */

export type AnimationType =
    | 'fadeIn'
    | 'fadeOut'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'scaleIn'
    | 'scaleOut'
    | 'pulse'
    | 'bounce'
    | 'staggeredFadeIn'
    | 'blurIn';

export type FillMode = 'none' | 'forwards' | 'backwards' | 'both';

export type EasingFunction =
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | 'linear'
    | 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    | string;

export interface AnimationConfig {
    /** Animation duration in milliseconds */
    duration: number;
    /** CSS easing function */
    easing: EasingFunction;
    /** Delay before animation starts in milliseconds */
    delay: number;
    /** Animation fill mode */
    fillMode: FillMode;
    /** Number of iterations (1 for single, Infinity for infinite) */
    iterations: number;
}

export interface StaggerOptions extends AnimationConfig {
    /** Delay between staggered elements in milliseconds */
    staggerDelay: number;
    /** Direction of stagger animation */
    direction: 'normal' | 'reverse';
}

export interface AnimationOptions extends Partial<AnimationConfig> {
    /** Custom CSS properties to animate */
    customProperties?: Record<string, string>;
    /** Whether to use hardware acceleration */
    useHardwareAcceleration?: boolean;
}

export interface ObserverOptions {
    /** Intersection threshold (0-1) */
    threshold: number;
    /** Root margin for intersection observer */
    rootMargin: string;
    /** Whether to trigger animation only once */
    triggerOnce: boolean;
    /** Custom root element for intersection observer */
    root?: Element | null;
}

export interface AnimationState {
    /** Whether the animation is currently running */
    isRunning: boolean;
    /** Animation start time */
    startTime?: number;
    /** Animation end time */
    endTime?: number;
    /** Current animation progress (0-1) */
    progress: number;
    /** Animation type being executed */
    type: AnimationType;
}