/**
 * Performance monitoring interfaces for animation system
 */

export interface IPerformanceMonitor {
    /**
     * Start monitoring performance for a specific animation
     * @param animationId Unique identifier for the animation
     */
    startMonitoring(animationId: string): void;

    /**
     * Stop monitoring and return performance metrics
     * @param animationId Animation identifier to stop monitoring
     * @returns Performance metrics for the animation
     */
    stopMonitoring(animationId: string): PerformanceMetrics;

    /**
     * Get current frame rate
     * @returns Current FPS
     */
    getCurrentFPS(): number;

    /**
     * Get current memory usage information
     * @returns Memory usage details
     */
    getMemoryUsage(): MemoryInfo;

    /**
     * Check if animations should be optimized based on performance
     * @returns True if optimization is recommended
     */
    shouldOptimizeAnimations(): boolean;

    /**
     * Get performance recommendations
     * @returns Array of performance optimization suggestions
     */
    getPerformanceRecommendations(): PerformanceRecommendation[];

    /**
     * Set performance thresholds for monitoring
     * @param thresholds Performance threshold configuration
     */
    setPerformanceThresholds(thresholds: PerformanceThresholds): void;

    /**
     * Get overall system performance health
     * @returns Performance health status
     */
    getPerformanceHealth(): PerformanceHealth;
}

export interface PerformanceMetrics {
    /** Average frames per second during animation */
    averageFPS: number;
    /** Minimum FPS recorded */
    minFPS: number;
    /** Maximum FPS recorded */
    maxFPS: number;
    /** Total animation duration in milliseconds */
    duration: number;
    /** Memory usage during animation */
    memoryUsage: MemoryInfo;
    /** Number of dropped frames */
    droppedFrames: number;
    /** CPU usage percentage */
    cpuUsage?: number;
    /** Animation start timestamp */
    startTime: number;
    /** Animation end timestamp */
    endTime: number;
}

export interface MemoryInfo {
    /** Used JavaScript heap size in bytes */
    usedJSHeapSize: number;
    /** Total JavaScript heap size in bytes */
    totalJSHeapSize: number;
    /** JavaScript heap size limit in bytes */
    jsHeapSizeLimit: number;
}

export interface PerformanceRecommendation {
    /** Recommendation type */
    type: 'fps' | 'memory' | 'cpu' | 'general';
    /** Severity level */
    severity: 'low' | 'medium' | 'high' | 'critical';
    /** Human-readable recommendation message */
    message: string;
    /** Suggested action to take */
    action: string;
}

export interface PerformanceThresholds {
    /** Minimum acceptable FPS */
    minFPS: number;
    /** Maximum acceptable memory usage in MB */
    maxMemoryUsage: number;
    /** Maximum acceptable CPU usage percentage */
    maxCPUUsage: number;
    /** Maximum acceptable dropped frames */
    maxDroppedFrames: number;
}

export interface PerformanceHealth {
    /** Overall health status */
    status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
    /** Health score from 0-100 */
    score: number;
    /** Current issues affecting performance */
    issues: PerformanceRecommendation[];
    /** Performance trend over time */
    trend: 'improving' | 'stable' | 'declining';
}