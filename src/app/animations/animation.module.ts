import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { AnimationCoreService } from './services/animation-core.service';
import { ScrollObserverService } from './services/scroll-observer.service';
import { AccessibilityService } from './services/accessibility.service';
import { PerformanceMonitorService } from './services/performance-monitor.service';
import { ConfigurationService } from './services/configuration.service';
import { ThemeService } from './services/theme.service';

import { ScrollAnimationDirective } from './directives/scroll-animation.directive';
import { HoverAnimationDirective } from './directives/hover-animation.directive';
import { LoadAnimationDirective } from './directives/load-animation.directive';
import { ThreeDTiltDirective } from './directives/three-d-tilt.directive';

/**
 * Portfolio Animations Module
 * 
 * Provides a comprehensive animation system with:
 * - Scroll-based animations with Intersection Observer
 * - Interactive hover and focus animations
 * - Page load and component mounting animations
 * - Accessibility compliance with reduced motion support
 * - Performance monitoring and optimization
 * - Theme-aware animations
 * - Configurable animation presets
 */
@NgModule({
    imports: [
        CommonModule,
        // Import standalone directives
        ScrollAnimationDirective,
        HoverAnimationDirective,
        LoadAnimationDirective,
        ThreeDTiltDirective
    ],
    providers: [
        // Core Animation Services
        AnimationCoreService,
        ScrollObserverService,
        AccessibilityService,
        PerformanceMonitorService,
        ConfigurationService,
        ThemeService
    ],
    exports: [
        // Export directives for use in other modules
        ScrollAnimationDirective,
        HoverAnimationDirective,
        LoadAnimationDirective,
        ThreeDTiltDirective
    ]
})
export class AnimationModule {
    constructor() {
        // Initialize animation system
        if (typeof window !== 'undefined') {
            console.log('🎬 Portfolio Animation System initialized');
        }
    }
}