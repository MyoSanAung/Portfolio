import { Injectable } from '@angular/core';
import { IAnimationCore } from '../interfaces/animation-core.interface';
import { AnimationOptions, AnimationType, StaggerOptions, AnimationState, AnimationConfig } from '../interfaces/animation-config.interface';

/**
 * Core animation service using Web Animations API
 * Provides hardware-accelerated animations with proper cleanup and state management
 */
@Injectable({
    providedIn: 'root'
})
export class AnimationCoreService implements IAnimationCore {
    private readonly animationMap = new WeakMap<HTMLElement, Animation>();
    private readonly stateMap = new WeakMap<HTMLElement, AnimationState>();
    private readonly animationQueue = new Map<HTMLElement, Promise<void>>();

    private readonly defaultConfig: AnimationConfig = {
        duration: 300,
        easing: 'ease-out',
        delay: 0,
        fillMode: 'both',
        iterations: 1
    };

    async fadeIn(element: HTMLElement, options?: AnimationOptions): Promise<void> {
        return this.executeAnimation(element, 'fadeIn', {
            opacity: [0, 1]
        }, options);
    }

    async fadeOut(element: HTMLElement, options?: AnimationOptions): Promise<void> {
        return this.executeAnimation(element, 'fadeOut', {
            opacity: [1, 0]
        }, options);
    }

    async slideUp(element: HTMLElement, options?: AnimationOptions): Promise<void> {
        return this.executeAnimation(element, 'slideUp', {
            transform: ['translateY(30px)', 'translateY(0px)'],
            opacity: [0, 1]
        }, options);
    }

    async slideDown(element: HTMLElement, options?: AnimationOptions): Promise<void> {
        return this.executeAnimation(element, 'slideDown', {
            transform: ['translateY(-30px)', 'translateY(0px)'],
            opacity: [0, 1]
        }, options);
    }

    async scaleIn(element: HTMLElement, options?: AnimationOptions): Promise<void> {
        return this.executeAnimation(element, 'scaleIn', {
            transform: ['scale(0.8)', 'scale(1)'],
            opacity: [0, 1]
        }, options);
    }

    async scaleOut(element: HTMLElement, options?: AnimationOptions): Promise<void> {
        return this.executeAnimation(element, 'scaleOut', {
            transform: ['scale(1)', 'scale(0.8)'],
            opacity: [1, 0]
        }, options);
    }

    async pulse(element: HTMLElement, options?: AnimationOptions): Promise<void> {
        const pulseOptions = {
            ...options,
            iterations: options?.iterations ?? 3,
            duration: options?.duration ?? 600
        };

        return this.executeAnimation(element, 'pulse', {
            transform: ['scale(1)', 'scale(1.05)', 'scale(1)']
        }, pulseOptions);
    }

    async staggeredAnimation(elements: HTMLElement[], options?: StaggerOptions): Promise<void> {
        if (!elements.length) return;

        const config = this.mergeConfig(options);
        const staggerDelay = options?.staggerDelay ?? 100;
        const direction = options?.direction ?? 'normal';

        const elementsToAnimate = direction === 'reverse' ? [...elements].reverse() : elements;

        const promises = elementsToAnimate.map((element, index) => {
            const delay = config.delay + (index * staggerDelay);
            return this.fadeIn(element, { ...options, delay });
        });

        await Promise.all(promises);
    }

    cancelAnimation(element: HTMLElement): void {
        const animation = this.animationMap.get(element);
        if (animation) {
            animation.cancel();
            this.cleanupAnimation(element);
        }

        // Cancel any queued animations
        const queuedPromise = this.animationQueue.get(element);
        if (queuedPromise) {
            this.animationQueue.delete(element);
        }
    }

    isAnimating(element: HTMLElement): boolean {
        const animation = this.animationMap.get(element);
        return animation ? animation.playState === 'running' : false;
    }

    getAnimationState(element: HTMLElement): AnimationState | null {
        return this.stateMap.get(element) ?? null;
    }

    async animate(element: HTMLElement, type: AnimationType, options?: AnimationOptions): Promise<void> {
        switch (type) {
            case 'fadeIn':
                return this.fadeIn(element, options);
            case 'fadeOut':
                return this.fadeOut(element, options);
            case 'slideUp':
                return this.slideUp(element, options);
            case 'slideDown':
                return this.slideDown(element, options);
            case 'scaleIn':
                return this.scaleIn(element, options);
            case 'scaleOut':
                return this.scaleOut(element, options);
            case 'pulse':
                return this.pulse(element, options);
            default:
                throw new Error(`Unsupported animation type: ${type}`);
        }
    }

    private async executeAnimation(
        element: HTMLElement,
        type: AnimationType,
        keyframes: Keyframe[] | PropertyIndexedKeyframes,
        options?: AnimationOptions
    ): Promise<void> {
        // Cancel any existing animation
        this.cancelAnimation(element);

        // Queue animation if element is already animating
        const existingPromise = this.animationQueue.get(element);
        if (existingPromise) {
            await existingPromise;
        }

        const config = this.mergeConfig(options);

        // Create animation promise
        const animationPromise = new Promise<void>((resolve, reject) => {
            try {
                // Apply hardware acceleration if enabled
                if (options?.useHardwareAcceleration !== false) {
                    element.style.willChange = 'transform, opacity';
                }

                // Create Web Animation
                const animation = element.animate(keyframes, {
                    duration: config.duration,
                    easing: config.easing,
                    delay: config.delay,
                    fill: config.fillMode,
                    iterations: config.iterations
                });

                // Store animation and state
                this.animationMap.set(element, animation);
                this.updateAnimationState(element, type, true);

                // Handle animation completion
                animation.addEventListener('finish', () => {
                    this.updateAnimationState(element, type, false);
                    this.cleanupAnimation(element);
                    resolve();
                });

                // Handle animation cancellation
                animation.addEventListener('cancel', () => {
                    this.updateAnimationState(element, type, false);
                    this.cleanupAnimation(element);
                    resolve();
                });

                // Handle animation errors
                animation.addEventListener('error', (error) => {
                    this.updateAnimationState(element, type, false);
                    this.cleanupAnimation(element);
                    reject(error);
                });

            } catch (error) {
                this.cleanupAnimation(element);
                reject(error);
            }
        });

        // Store promise in queue
        this.animationQueue.set(element, animationPromise);

        try {
            await animationPromise;
        } finally {
            this.animationQueue.delete(element);
        }
    }

    private mergeConfig(options?: AnimationOptions): AnimationConfig {
        return {
            duration: options?.duration ?? this.defaultConfig.duration,
            easing: options?.easing ?? this.defaultConfig.easing,
            delay: options?.delay ?? this.defaultConfig.delay,
            fillMode: options?.fillMode ?? this.defaultConfig.fillMode,
            iterations: options?.iterations ?? this.defaultConfig.iterations
        };
    }

    private updateAnimationState(element: HTMLElement, type: AnimationType, isRunning: boolean): void {
        const currentTime = performance.now();

        if (isRunning) {
            this.stateMap.set(element, {
                isRunning: true,
                startTime: currentTime,
                progress: 0,
                type
            });
        } else {
            const existingState = this.stateMap.get(element);
            if (existingState) {
                this.stateMap.set(element, {
                    ...existingState,
                    isRunning: false,
                    endTime: currentTime,
                    progress: 1
                });
            }
        }
    }

    private cleanupAnimation(element: HTMLElement): void {
        // Remove animation reference
        this.animationMap.delete(element);

        // Clean up hardware acceleration hint
        if (element.style.willChange) {
            element.style.willChange = '';
        }

        // Clean up state after a delay to allow for state queries
        setTimeout(() => {
            this.stateMap.delete(element);
        }, 100);
    }
}