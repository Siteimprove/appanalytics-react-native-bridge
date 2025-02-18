export enum ETrackScreenState {
    Shown = 'Shown',
    Dismissed = 'Dismissed'
}

export enum EAppStateChange {
    PutInForeground = 'PutInForeground',
    PutInBackground = 'PutInBackground',
    Opened = 'Opened',
    Closed = 'Closed'
}

export interface AnalyticsInterface {
    trackScreen(screenName: string, screenTitle: string, state: ETrackScreenState): void;
    trackAppState(state: EAppStateChange): void;
    trackSearch(query: string, isSearchSuccessful: boolean, numSearchResults: number): void;
    trackCustom(key: string, attributes: Record<string, string>): void;
}
