import { TestBed } from '@angular/core/testing';
import { AnimationModule } from './animation.module';
import { AnimationCoreService } from './services/animation-core.service';
import { ScrollObserverService } from './services/scroll-observer.service';
import { AccessibilityService } from './services/accessibility.service';
import { PerformanceMonitorService } from './services/performance-monitor.service';
import { ConfigurationService } from './services/configuration.service';
import { ThemeService } from './services/theme.service';

/**
 * Basic tests for animation module structure
 * Task 1.1: Verify module can be imported and services are available
 */
describe('AnimationModule', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AnimationModule]
        }).compileComponents();
    });

    it('should create the animation module', () => {
        expect(AnimationModule).toBeDefined();
    });

    it('should provide all core animation services', () => {
        const animationCore = TestBed.inject(AnimationCoreService);
        const scrollObserver = TestBed.inject(ScrollObserverService);
        const accessibility = TestBed.inject(AccessibilityService);
        const performanceMonitor = TestBed.inject(PerformanceMonitorService);
        const configuration = TestBed.inject(ConfigurationService);
        const theme = TestBed.inject(ThemeService);

        expect(animationCore).toBeDefined();
        expect(scrollObserver).toBeDefined();
        expect(accessibility).toBeDefined();
        expect(performanceMonitor).toBeDefined();
        expect(configuration).toBeDefined();
        expect(theme).toBeDefined();
    });

    it('should have proper service interfaces', () => {
        const animationCore = TestBed.inject(AnimationCoreService);
        const configuration = TestBed.inject(ConfigurationService);

        // Test that services implement their interfaces
        expect(typeof animationCore.fadeIn).toBe('function');
        expect(typeof animationCore.slideUp).toBe('function');
        expect(typeof animationCore.scaleIn).toBe('function');
        expect(typeof configuration.getAnimationConfig).toBe('function');
        expect(typeof configuration.getUserPreferences).toBe('function');
    });
});