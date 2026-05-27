import { AnimationType, AnimationConfig, EasingFunction } from './animation-config.interface';

/**
 * Configuration service interface for animation system
 */

export interface IConfigurationService {
    /**
     * Get animation configuration for a specific type
     * @param type Animation type to get configuration for
     * @returns Animation configuration
     */
    getAnimationConfig(type: AnimationType): AnimationConfig;

    /**
     * Set user preferences for animations
     * @param preferences User animation preferences
     */
    setUserPreferences(preferences: UserPreferences): void;

    /**
     * Get current user preferences
     * @returns Current user preferences
     */
    getUserPreferences(): UserPreferences;

    /**
     * Check if a specific animation type is enabled
     * @param type Animation type to check
     * @returns True if animation is enabled
     */
    isAnimationEnabled(type: AnimationType): boolean;

    /**
     * Get timing function by name
     * @param name Timing function name
     * @returns CSS timing function string
     */
    getTimingFunction(name: string): EasingFunction;

    /**
     * Get all available animation presets
     * @returns Array of available presets
     */
    getAnimationPresets(): AnimationPreset[];

    /**
     * Apply an animation preset
     * @param presetName Name of preset to apply
     */
    applyPreset(presetName: string): void;

    /**
     * Reset configuration to defaults
     */
    resetToDefaults(): void;

    /**
     * Get environment-specific configuration
     * @returns Environment configuration
     */
    getEnvironmentConfig(): EnvironmentConfig;

    /**
     * Update configuration for specific animation type
     * @param type Animation type to update
     * @param config New configuration
     */
    updateAnimationConfig(type: AnimationType, config: Partial<AnimationConfig>): void;
}

export interface UserPreferences {
    /** Whether animations are globally enabled */
    animationsEnabled: boolean;
    /** Preferred animation speed multiplier */
    speedMultiplier: number;
    /** Whether to respect system reduced motion preference */
    respectReducedMotion: boolean;
    /** Disabled animation types */
    disabledAnimations: AnimationType[];
    /** Custom timing preferences */
    customTimings: Record<AnimationType, Partial<AnimationConfig>>;
    /** Preferred animation preset */
    preferredPreset?: string;
}

export interface AnimationPreset {
    /** Preset name */
    name: string;
    /** Preset display name */
    displayName: string;
    /** Preset description */
    description: string;
    /** Animation configurations for this preset */
    animations: Record<AnimationType, AnimationConfig>;
    /** Whether this is the default preset */
    isDefault?: boolean;
}

export interface EnvironmentConfig {
    /** Whether running in development mode */
    isDevelopment: boolean;
    /** Whether to enable debug logging */
    enableDebugLogging: boolean;
    /** Whether to show performance warnings */
    showPerformanceWarnings: boolean;
    /** Maximum bundle size for animations in KB */
    maxBundleSize: number;
    /** Supported browser features */
    supportedFeatures: BrowserFeatures;
}

export interface BrowserFeatures {
    /** Whether Intersection Observer is supported */
    intersectionObserver: boolean;
    /** Whether Web Animations API is supported */
    webAnimations: boolean;
    /** Whether CSS custom properties are supported */
    cssCustomProperties: boolean;
    /** Whether prefers-reduced-motion is supported */
    prefersReducedMotion: boolean;
    /** Whether hardware acceleration is available */
    hardwareAcceleration: boolean;
}