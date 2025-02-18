//
//  SiteimproveAnalyticsModule.m
//  RNSampleApp
//

#import "SiteimproveAnalyticsModule.h"
#import "SiteimproveAppAnalytics/SiteimproveAppAnalytics-Swift.h"

@implementation SiteimproveAnalyticsModule

RCT_EXPORT_MODULE(AnalyticsModuleIos);

RCT_EXPORT_METHOD(trackScreen:(NSString *)screenName title:(NSString *)title state:(NSString *)state)
{
  [Siteimprove trackScreenWithS:state name:screenName navTitle:title];
}

RCT_EXPORT_METHOD(trackSearch:(NSString *)query isSuccessful:(BOOL)isSuccessfull numberOfResults:(NSInteger)numberOfResults )
{
  [Siteimprove trackSearchEventWithQuery:query isSuccessful:isSuccessfull numberOfResults:numberOfResults];
}

RCT_EXPORT_METHOD(trackCustom:(NSString *)eventName attributes:(NSDictionary *)attributes)
{
  [Siteimprove trackCustomEventWithK:eventName a:attributes];
}

@end
