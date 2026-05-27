import { Injectable } from '@angular/core';
import { IThemeService, ThemeAnimationConfig, Theme, ThemeChangeCallback } from '../interfaces/theme.interface';

/**
 * Theme service - placeholder implementation
 * Will be fully implemented in task 6.3
 */
@Injectable({
    providedIn: 'root'
})
export class ThemeService implements IThemeService {

    getThemeAnimations(): ThemeAnimationConfig {
        // Placeholder implementation
        console.log('ThemeService.getThemeAnimations called');
        return {
            primaryColor: '#2b7bc4',
            accentColor: '#7c3aed',
            transitionDuration: 300,
            easingFunction: 'ease-out',
            customProperties: {},
            gradients: {}
        };
    }

    applyThemeTransition(element: HTMLElement, theme: Theme): void {
        // Placeholder implementation
        console.log('ThemeService.applyThemeTransition called', element, theme);
    }

    getCurrentTheme(): Theme {
        // Placeholder implementation
        console.log('ThemeService.getCurrentTheme called');
        return {
            name: 'default',
            displayName: 'Default',
            colors: {
                primary: '#2b7bc4',
                secondary: '#1a5fb4',
                accent: '#7c3aed',
                background: '#0a0a0f',
                surface: '#1a1a24',
                text: '#ffffff',
                textMuted: '#a1a1aa',
                border: '#27272a',
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444'
            },
            animations: this.getThemeAnimations(),
            isDark: true
        };
    }

    onThemeChange(callback: ThemeChangeCallback): () => void {
        // Placeholder implementation
        console.log('ThemeService.onThemeChange called', callback);
        return () => { };
    }

    getAvailableThemes(): Theme[] {
        // Placeholder implementation
        console.log('ThemeService.getAvailableThemes called');
        return [this.getCurrentTheme()];
    }

    switchTheme(themeName: string): void {
        // Placeholder implementation
        console.log('ThemeService.switchTheme called', themeName);
    }

    getThemeProperties(themeName: string): Record<string, string> {
        // Placeholder implementation
        console.log('ThemeService.getThemeProperties called', themeName);
        return {};
    }

    isDarkMode(): boolean {
        // Placeholder implementation
        console.log('ThemeService.isDarkMode called');
        return true;
    }
}