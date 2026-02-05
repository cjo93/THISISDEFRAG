export const trackEvent = (event: string, data?: any) => { console.log(event, data); };
export const AnalyticsEvents = {
  VIEW_LANDING: 'view_landing',
  START_JOURNEY: 'start_journey',
  GENERATE_MANUAL_CLICK: 'generate_manual_click',
  MEMBER_LOGIN_CLICK: 'member_login_click',
};
export const initScrollTracking = () => {};
export const ConversionFunnel = {
  LANDING: 'landing',
  step1_landing: 'step1_landing',
};
