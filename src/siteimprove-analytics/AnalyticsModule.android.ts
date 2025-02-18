import { NativeModules } from 'react-native'
import { EAppStateChange, ETrackScreenState } from './types';

const { AnalyticsModuleAndroid } = NativeModules;

export default {
    trackScreen(screenName: string, screenTitle: string, state: ETrackScreenState): void {
        AnalyticsModuleAndroid.trackScreen(screenName, screenTitle, state);
    },

    trackAppState(state: EAppStateChange): void {
        AnalyticsModuleAndroid.trackAppState(state);
    },

    trackSearch(query: string, isSearchSuccessful: boolean, numSearchResults: number): void {
        AnalyticsModuleAndroid.trackSearch(query, isSearchSuccessful, numSearchResults);
    },

    trackCustom(key: string, attributes: Record<string, string>): void {
        AnalyticsModuleAndroid.trackCustom(key, attributes);
    },
};
