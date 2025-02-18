import { Platform } from 'react-native';

import AnalyticsModuleAndroid from './AnalyticsModule.android';
import AnalyticsModuleIOS from './AnalyticsModule.ios';
import { AnalyticsInterface } from './types';

const AnalyticsModule = Platform.select({
    ios: AnalyticsModuleIOS,
    android: AnalyticsModuleAndroid,
  });

export default AnalyticsModule as AnalyticsInterface;
