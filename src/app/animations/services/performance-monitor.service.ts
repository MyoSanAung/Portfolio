import { Injectable } from '@angular/core';
import { IPerformanceMonitor, PerformanceMetrics, MemoryInfo, PerformanceRecommendation, PerformanceThresholds, PerformanceHealth } from '../interfaces/performance-monitor.interface';

/**
 * Performance monitor service - placeholder implementation
 * Will be fully implemented in task 4.3
 */
@Injectable({
    providedIn: 'root'
})
export class PerformanceMonitorService implements IPerformanceMonitor {

    startMonitoring(animationId: string): void {
        // Placeholder implementation
        console.log('PerformanceMonitor.startMonitoring called', animationId);
    }

    stopMonitoring(animationId: string): PerformanceMetrics {
        // Placeholder implementation
        console.log('PerformanceMonitor.stopMonitoring called', animationId);
        return {
            averageFPS: 60,
            minFPS: 60,
            maxFPS: 60,
            duration: 0,
            memoryUsage: { usedJSHeapSize: 0, totalJSHeapSize: 0, jsHeapSizeLimit: 0 },
            droppedFrames: 0,
            startTime: 0,
            endTime: 0
        };
    }

    getCurrentFPS(): number {
        // Placeholder implementation
        console.log('PerformanceMonitor.getCurrentFPS called');
        return 60;
    }

    getMemoryUsage(): MemoryInfo {
        // Placeholder implementation
        console.log('PerformanceMonitor.getMemoryUsage called');
        return { usedJSHeapSize: 0, totalJSHeapSize: 0, jsHeapSizeLimit: 0 };
    }

    shouldOptimizeAnimations(): boolean {
        // Placeholder implementation
        console.log('PerformanceMonitor.shouldOptimizeAnimations called');
        return false;
    }

    getPerformanceRecommendations(): PerformanceRecommendation[] {
        // Placeholder implementation
        console.log('PerformanceMonitor.getPerformanceRecommendations called');
        return [];
    }

    setPerformanceThresholds(thresholds: PerformanceThresholds): void {
        // Placeholder implementation
        console.log('PerformanceMonitor.setPerformanceThresholds called', thresholds);
    }

    getPerformanceHealth(): PerformanceHealth {
        // Placeholder implementation
        console.log('PerformanceMonitor.getPerformanceHealth called');
        return {
            status: 'excellent',
            score: 100,
            issues: [],
            trend: 'stable'
        };
    }
}