// Google Analytics 4 Tracking Utility
// Privacy-compliant analytics with TypeScript support

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

// Event names following GA4 conventions
export const AnalyticsEvents = {
    // Page views
    PAGE_VIEW: 'page_view',

    // User journey
    GENERATE_MANUAL_CLICK: 'generate_manual_click',
    MEMBER_LOGIN_CLICK: 'member_login_click',
    START_FORM_BEGIN: 'start_form_begin',
    START_FORM_COMPLETE: 'start_form_complete',
    ANALYSIS_VIEW: 'analysis_view',
    CHECKOUT_BEGIN: 'checkout_begin',
    PURCHASE_COMPLETE: 'purchase',

    // Engagement
    SCROLL_DEPTH: 'scroll_depth',
    VIDEO_PLAY: 'video_play',
    LINK_CLICK: 'link_click',

    // Errors
    ERROR_OCCURRED: 'error_occurred',
} as const;

type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

interface EventParams {
    [key: string]: string | number | boolean | undefined;
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(eventName: AnalyticsEvent, params?: EventParams): void {
    if (typeof window === 'undefined' || !window.gtag) {
        console.warn('Analytics not initialized');
        return;
    }

    try {
        window.gtag('event', eventName, {
            ...params,
            timestamp: new Date().toISOString(),
        });

        console.log(`[Analytics] Event tracked: ${eventName}`, params);
    } catch (error) {
        console.error('Analytics tracking error:', error);
    }
}

/**
 * Track page view
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
    trackEvent(AnalyticsEvents.PAGE_VIEW, {
        page_path: pagePath,
        page_title: pageTitle || document.title,
    });
}

/**
 * Track conversion (purchase)
 */
export function trackPurchase(transactionId: string, value: number, currency: string = 'USD'): void {
    trackEvent(AnalyticsEvents.PURCHASE_COMPLETE, {
        transaction_id: transactionId,
        value: value,
        currency: currency,
    });
}

/**
 * Track user journey step
 */
export function trackJourneyStep(step: string, stepNumber: number): void {
    trackEvent('journey_step', {
        step_name: step,
        step_number: stepNumber,
    });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number): void {
    trackEvent(AnalyticsEvents.SCROLL_DEPTH, {
        scroll_percentage: percentage,
    });
}

/**
 * Track error
 */
export function trackError(errorMessage: string, errorType: string = 'unknown'): void {
    trackEvent(AnalyticsEvents.ERROR_OCCURRED, {
        error_message: errorMessage,
        error_type: errorType,
    });
}

/**
 * Initialize scroll depth tracking
 */
export function initScrollTracking(): void {
    if (typeof window === 'undefined') return;

    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
        const scrollPercentage = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        milestones.forEach((milestone) => {
            if (scrollPercentage >= milestone && !tracked.has(milestone)) {
                tracked.add(milestone);
                trackScrollDepth(milestone);
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Set user properties
 */
export function setUserProperty(property: string, value: string | number): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('set', 'user_properties', {
        [property]: value,
    });
}

/**
 * Track conversion funnel
 */
export const ConversionFunnel = {
    step1_landing: () => trackJourneyStep('landing', 1),
    step2_start: () => trackJourneyStep('start_form', 2),
    step3_analysis: () => trackJourneyStep('analysis', 3),
    step4_checkout: () => trackJourneyStep('checkout', 4),
    step5_purchase: (transactionId: string, value: number) => {
        trackJourneyStep('purchase', 5);
        trackPurchase(transactionId, value);
    },
};
