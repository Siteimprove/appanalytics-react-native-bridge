import { useEffect } from 'react';
import AnalyticsModule from './AnalyticsModule';
import { ETrackScreenState } from './types';

const useTrackScreen = (component: React.FunctionComponent, title?: string) => {
  useEffect(() => {
    const screenName = component.name;
    const screenTitle = title || screenName;

    AnalyticsModule.trackScreen(screenName, screenTitle, ETrackScreenState.Shown);

    return () => {
      AnalyticsModule.trackScreen(screenName, screenTitle, ETrackScreenState.Dismissed);
    };
  }, [component, title]);
};

export default useTrackScreen;
