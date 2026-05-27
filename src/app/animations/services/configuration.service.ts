import { Injectable } from '@angular/core';
import { IConfigurationService, UserPreferences, AnimationPreset, EnvironmentConfig } from '../interfaces/configuration.interface';
import { AnimationType, AnimationConfig, EasingFunction } from '../interfaces/animation-config.interface';

/**
 * Configuration service - placeholder implementation
 * Will be fully implemented in task 1.4
 */
@Injectable({
    providedIn: 'root'
})
export class ConfigurationService implements IConfigurationService {

    getAnimationConfig(type: AnimationType): AnimationConfig {
        // Placeholder implementation
        console.log('ConfigurationService.getAnimationConfig called', type);
        return {
            duration: 600,
            easing: 'ease-out',
            delay: 0,
            fillMode: 'forwards',
            iterations: 1
        };
    }

    setUserPreferences(preferences: UserPreferences): void {
        // Placeholder implementation
        console.log('ConfigurationService.setUserPreferences called', preferences);
    }

    getUserPreferences(): UserPreferences {
        // Placeholder implementation
        console.log('ConfigurationService.getUserPreferences called');
        return {
            animationsEnabled: true,
            speedMultiplier: 1,
            respectReducedMotion: true,
            disabledAnimations: [],
            customTimings: {} as Record<AnimationType, Partial<AnimationConfig>>
        };
    }

    isAnimationEnabled(type: AnimationType): boolean {
        // Placeholder implementation
        console.log('ConfigurationService.isAnimationEnabled called', type);
        return true;
    }

    getTimingFunction(name: string): EasingFunction {
        // Placeholder implementation
        console.log('ConfigurationService.getTimingFunction called', name);
        return 'ease-out';
    }

    getAnimationPresets(): AnimationPreset[] {
        // Placeholder implementation
        console.log('ConfigurationService.getAnimationPresets called');
        return [];
    }

    applyPreset(presetName: string): void {
        // Placeholder implementation
        console.log('ConfigurationService.applyPreset called', presetName);
    }

    resetToDefaults(): void {
        // Placeholder implementation
        console.log('ConfigurationService.resetToDefaults called');
    }

    getEnvironmentConfig(): EnvironmentConfig {
        // Placeholder implementation
        console.log('ConfigurationService.getEnvironmentConfig called');
        return {
            isDevelopment: true,
            enableDebugLogging: true,
            showPerformanceWarnings: true,
            maxBundleSize: 50,
            supportedFeatures: {
                intersectionObserver: true,
                webAnimations: true,
                cssCustomProperties: true,
                prefersReducedMotion: true,
                hardwareAcceleration: true
            }
        };
    }

    updateAnimationConfig(type: AnimationType, config: Partial<AnimationConfig>): void {
        // Placeholder implementation
        console.log('ConfigurationService.updateAnimationConfig called', type, config);
    }
}