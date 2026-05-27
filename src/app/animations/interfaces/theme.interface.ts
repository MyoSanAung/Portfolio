/**
 * Theme service interface for animation system
 */

export interface IThemeService {
    /**
     * Get theme-specific animation configurations
     * @returns Theme animation configuration
     */
    getThemeAnimations(): ThemeAnimationConfig;

    /**
     * Apply theme transition to an element
     * @param element Target element
     * @param theme Theme to transition to
     */
    applyThemeTransition(element: HTMLElement, theme: Theme): void;

    /**
     * Get current active theme
     * @returns Current theme
     */
    getCurrentTheme(): Theme;

    /**
     * Register callback for theme changes
     * @param callback Function to call when theme changes
     * @returns Unsubscribe function
     */
    onThemeChange(callback: ThemeChangeCallback): () => void;

    /**
     * Get available themes
     * @returns Array of available themes
     */
    getAvailableThemes(): Theme[];

    /**
     * Switch to a different theme
     * @param themeName Name of theme to switch to
     */
    switchTheme(themeName: string): void;

    /**
     * Get theme-specific CSS custom properties
     * @param themeName Theme name
     * @returns CSS custom properties for theme
     */
    getThemeProperties(themeName: string): Record<string, string>;

    /**
     * Check if dark mode is active
     * @returns True if dark mode is active
     */
    isDarkMode(): boolean;
}

export interface ThemeAnimationConfig {
    /** Primary theme color for animations */
    primaryColor: string;
    /** Accent color for animations */
    accentColor: string;
    /** Default transition duration for theme changes */
    transitionDuration: number;
    /** Default easing function for theme animations */
    easingFunction: string;
    /** CSS custom properties for animations */
    customProperties: Record<string, string>;
    /** Gradient configurations */
    gradients: Record<string, string>;
}

export interface Theme {
    /** Unique theme identifier */
    name: string;
    /** Display name for theme */
    displayName: string;
    /** Theme color palette */
    colors: ThemeColors;
    /** Animation-specific configuration */
    animations: ThemeAnimationConfig;
    /** Whether this is a dark theme */
    isDark: boolean;
}

export interface ThemeColors {
    /** Primary brand color */
    primary: string;
    /** Secondary brand color */
    secondary: string;
    /** Accent color */
    accent: string;
    /** Background color */
    background: string;
    /** Surface color */
    surface: string;
    /** Text color */
    text: string;
    /** Muted text color */
    textMuted: string;
    /** Border color */
    border: string;
    /** Success color */
    success: string;
    /** Warning color */
    warning: string;
    /** Error color */
    error: string;
}

export type ThemeChangeCallback = (theme: Theme, previousTheme: Theme) => void;

export interface ThemeTransitionOptions {
    /** Duration of theme transition in milliseconds */
    duration?: number;
    /** Easing function for transition */
    easing?: string;
    /** Whether to animate color changes */
    animateColors?: boolean;
    /** Whether to animate background changes */
    animateBackground?: boolean;
    /** Custom properties to animate */
    customProperties?: string[];
}