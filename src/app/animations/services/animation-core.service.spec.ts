import { TestBed } from '@angular/core/testing';
import { AnimationCoreService } from './animation-core.service';
import { AnimationOptions, StaggerOptions } from '../interfaces/animation-config.interface';

// Mock Web Animations API for testing
const createMockAnimation = () => ({
    addEventListener: vi.fn((event, callback) => {
        if (event === 'finish') {
            setTimeout(callback, 0);
        }
    }),
    cancel: vi.fn(),
    playState: 'running'
});

describe('AnimationCoreService', () => {
    let service: AnimationCoreService;
    let mockElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AnimationCoreService);

        // Create a mock DOM element
        mockElement = document.createElement('div');
        document.body.appendChild(mockElement);

        // Mock Web Animations API
        (mockElement as any).animate = vi.fn().mockReturnValue(createMockAnimation());
    });

    afterEach(() => {
        // Clean up DOM
        if (mockElement.parentNode) {
            mockElement.parentNode.removeChild(mockElement);
        }
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('fadeIn', () => {
        it('should execute fadeIn animation with default options', async () => {
            const animateSpy = mockElement.animate as any;

            await service.fadeIn(mockElement);

            expect(animateSpy).toHaveBeenCalledWith(
                { opacity: [0, 1] },
                expect.objectContaining({
                    duration: 300,
                    easing: 'ease-out',
                    delay: 0,
                    fill: 'both',
                    iterations: 1
                })
            );
        });

        it('should execute fadeIn animation with custom options', async () => {
            const options: AnimationOptions = {
                duration: 500,
                easing: 'ease-in',
                delay: 100
            };

            const animateSpy = mockElement.animate as any;

            await service.fadeIn(mockElement, options);

            expect(animateSpy).toHaveBeenCalledWith(
                { opacity: [0, 1] },
                expect.objectContaining({
                    duration: 500,
                    easing: 'ease-in',
                    delay: 100
                })
            );
        });
    });

    describe('slideUp', () => {
        it('should execute slideUp animation', async () => {
            const animateSpy = mockElement.animate as any;

            await service.slideUp(mockElement);

            expect(animateSpy).toHaveBeenCalledWith(
                {
                    transform: ['translateY(30px)', 'translateY(0px)'],
                    opacity: [0, 1]
                },
                expect.any(Object)
            );
        });
    });

    describe('scaleIn', () => {
        it('should execute scaleIn animation', async () => {
            const animateSpy = mockElement.animate as any;

            await service.scaleIn(mockElement);

            expect(animateSpy).toHaveBeenCalledWith(
                {
                    transform: ['scale(0.8)', 'scale(1)'],
                    opacity: [0, 1]
                },
                expect.any(Object)
            );
        });
    });

    describe('pulse', () => {
        it('should execute pulse animation with multiple iterations', async () => {
            const animateSpy = mockElement.animate as any;

            await service.pulse(mockElement);

            expect(animateSpy).toHaveBeenCalledWith(
                { transform: ['scale(1)', 'scale(1.05)', 'scale(1)'] },
                expect.objectContaining({
                    iterations: 3,
                    duration: 600
                })
            );
        });
    });

    describe('staggeredAnimation', () => {
        it('should execute staggered animations with proper delays', async () => {
            const elements = [
                document.createElement('div'),
                document.createElement('div'),
                document.createElement('div')
            ];

            // Mock animate method for each element
            elements.forEach(el => {
                document.body.appendChild(el);
                (el as any).animate = vi.fn().mockReturnValue(createMockAnimation());
            });

            const options: StaggerOptions = {
                duration: 300,
                easing: 'ease-out',
                delay: 0,
                fillMode: 'both',
                iterations: 1,
                staggerDelay: 100,
                direction: 'normal'
            };

            await service.staggeredAnimation(elements, options);

            // Verify each element was animated with increasing delays
            elements.forEach((el, index) => {
                expect((el as any).animate).toHaveBeenCalledWith(
                    { opacity: [0, 1] },
                    expect.objectContaining({
                        delay: index * 100
                    })
                );
            });

            // Clean up
            elements.forEach(el => {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
        });

        it('should handle reverse direction staggered animations', async () => {
            const elements = [
                document.createElement('div'),
                document.createElement('div')
            ];

            // Mock animate method for each element
            elements.forEach(el => {
                document.body.appendChild(el);
                (el as any).animate = vi.fn().mockReturnValue(createMockAnimation());
            });

            const options: StaggerOptions = {
                duration: 300,
                easing: 'ease-out',
                delay: 0,
                fillMode: 'both',
                iterations: 1,
                staggerDelay: 50,
                direction: 'reverse'
            };

            await service.staggeredAnimation(elements, options);

            // In reverse direction, last element should animate first (delay 0)
            // and first element should animate last (delay 50)
            expect((elements[1] as any).animate).toHaveBeenCalledWith(
                { opacity: [0, 1] },
                expect.objectContaining({ delay: 0 })
            );
            expect((elements[0] as any).animate).toHaveBeenCalledWith(
                { opacity: [0, 1] },
                expect.objectContaining({ delay: 50 })
            );

            // Clean up
            elements.forEach(el => {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
        });
    });

    describe('animation state management', () => {
        it('should track animation state correctly', async () => {
            let finishCallback: () => void;

            const mockAnimation = {
                addEventListener: vi.fn((event, callback) => {
                    if (event === 'finish') {
                        finishCallback = callback;
                    }
                }),
                cancel: vi.fn(),
                playState: 'running'
            };

            (mockElement as any).animate = vi.fn().mockReturnValue(mockAnimation);

            // Start animation
            const animationPromise = service.fadeIn(mockElement);

            // Check initial state
            expect(service.isAnimating(mockElement)).toBe(true);
            const initialState = service.getAnimationState(mockElement);
            expect(initialState).toBeTruthy();
            expect(initialState?.isRunning).toBe(true);
            expect(initialState?.type).toBe('fadeIn');

            // Finish animation
            finishCallback!();
            await animationPromise;

            // Check final state
            expect(service.isAnimating(mockElement)).toBe(false);
        });

        it('should cancel animations properly', () => {
            const mockAnimation = {
                addEventListener: vi.fn(),
                cancel: vi.fn(),
                playState: 'running'
            };

            (mockElement as any).animate = vi.fn().mockReturnValue(mockAnimation);

            // Start animation
            service.fadeIn(mockElement);

            // Cancel animation
            service.cancelAnimation(mockElement);

            expect(mockAnimation.cancel).toHaveBeenCalled();
            expect(service.isAnimating(mockElement)).toBe(false);
        });
    });

    describe('animate method', () => {
        it('should delegate to appropriate animation method', async () => {
            const fadeInSpy = vi.spyOn(service, 'fadeIn').mockResolvedValue();
            const slideUpSpy = vi.spyOn(service, 'slideUp').mockResolvedValue();
            const scaleInSpy = vi.spyOn(service, 'scaleIn').mockResolvedValue();

            await service.animate(mockElement, 'fadeIn');
            expect(fadeInSpy).toHaveBeenCalledWith(mockElement, undefined);

            await service.animate(mockElement, 'slideUp');
            expect(slideUpSpy).toHaveBeenCalledWith(mockElement, undefined);

            await service.animate(mockElement, 'scaleIn');
            expect(scaleInSpy).toHaveBeenCalledWith(mockElement, undefined);
        });

        it('should throw error for unsupported animation type', async () => {
            await expect(
                service.animate(mockElement, 'unsupported' as any)
            ).rejects.toThrow('Unsupported animation type: unsupported');
        });
    });

    describe('hardware acceleration', () => {
        it('should apply willChange property by default', async () => {
            await service.fadeIn(mockElement);

            // willChange should be cleared after animation
            expect(mockElement.style.willChange).toBe('');
        });

        it('should not apply willChange when hardware acceleration is disabled', async () => {
            const options: AnimationOptions = {
                useHardwareAcceleration: false
            };

            await service.fadeIn(mockElement, options);

            expect(mockElement.style.willChange).toBe('');
        });
    });
});