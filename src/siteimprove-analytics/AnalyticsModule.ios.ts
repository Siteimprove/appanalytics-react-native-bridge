import { NativeModules } from 'react-native'
import { ETrackScreenState } from './types';

const { AnalyticsModuleIos } = NativeModules;

export default {
    trackScreen(screenName: string, screenTitle: string, state: ETrackScreenState): void {
        AnalyticsModuleIos.trackScreen(screenName, screenTitle, state.toLowerCase());
    },

    trackSearch(query: string, isSearchSuccessful: boolean, numSearchResults: number): void {
        AnalyticsModuleIos.trackSearch(query, isSearchSuccessful, numSearchResults)
    },

    trackCustom(eventName: string, attributes: Record<string, string>): void {
        AnalyticsModuleIos.trackCustom(eventName, attributes)
    }
};
