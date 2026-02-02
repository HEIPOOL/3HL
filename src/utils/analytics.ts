export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    console.log('[Analytics]', eventName, properties)
  }
}

export function trackPageView(pageName: string): void {
  trackEvent('page_view', { page: pageName })
}

export function trackInteraction(component: string, action: string): void {
  trackEvent('interaction', { component, action })
}
