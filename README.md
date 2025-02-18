# Siteimprove Analytics React Native Bridge

## Introduction
This guide explains how to integrate the Siteimprove Analytics SDK for Android and iOS into a React Native project using a Native Module approach.

By following these steps, you can expose the native SDK functionality to React Native without installing additional libraries.

This approach ensures that consumers of the SDK do not have to wait for a new library version whenever a new React Native version is released. Instead, they can upgrade their project and make minimal modifications to the provided supporting files, found in this repository.

## Prerequisites

* A React Native project set up.
* Basic understanding of React Native's Native Modules.
* An API key to use with the SDK.
* The supporting files from this repository.

## Android Integration

### Step 1: Copy Native Module and Package Files
Copy the following files into your React Native project’s Android module (`android/app/src/main/java/com/yourpackage/`):

* `SiteimproveAnalyticsModule.kt`
* `SiteimproveAnalyticsPackage.kt`

These files define the native methods that can be called from Javascript.

### Step 2: Modify `MainApplication.kt`

Update your `MainApplication.kt` file to manually add the native module so that React Native can see it:

```kotlin
class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : ReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    add(SiteimproveAnalyticsPackage())
                }
        }
}
```

Additionally, `MainApplication.kt` is where the SDK needs to be initialized. Add a call to the init method at the end of your `onCreate` method:

```kotlin
override fun onCreate() {
    super.onCreate()


    Siteimprove.init(
        application = this,
        apiKey = "<api-key>",
        region = Region.Region1
    )
}
```

#### Step 3: Add Dependency to `build.gradle`

Before rebuilding the project, add the dependency for the Siteimprove Analytics SDK to your app’s `build.gradle` file:

```groovy
dependencies {
    implementation("com.siteimprove:analyticssdk:<latest-version>")
}
```

Replace `<latest-version>` with the most [up-to-date version](https://mvnrepository.com/artifact/com.siteimprove/analyticssdk) of the SDK.

### Step 4: Rebuild Your Project

Run the following commands to apply the changes:

```
cd android && ./gradlew clean && cd ..
npx react-native run-android
```


## iOS Integration

### Step 1: Copy Native Module

Copy the following files into the `ios` directory of your React Native project (`ios/<your-project-name>`):

* `SiteimproveAnalyticsModule.m`
* `SiteimproveAnalyticsModule.h`


### Step 2: Install the SDK using Cocoa Pods

Modify your `Podfile` and add the following line:

```podfile
pod 'SiteimproveAppAnalytics', :git => 'https://github.com/Siteimprove/appanalytics-ios-sdk-public', :branch => 'main'
```

Then run:

```bash
cd ios && pod install && cd ..
```

### Step 3: Modify `AppDelegate.mm`

Update your `AppDelegate.mm` file to initialize the SDK in the `application:didFinishLaunchingWithOptions` method:

```objective-c
@implementation AppDelegate

- (BOOL) application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [Siteimprove configureWithApiKey:@"<your-api-key>" region:@"R1"];

    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```


### Step 4: Rebuild your project

Run the following commands to link the native code and rebuild:

```
cd ios && pod install && cd ..
npx react-native run-ios
```

## Using the SDK in JavaScript

In this repository, under the `src/siteimprove-analytics` directory, several files are provided to help with the integration process:

* `types.ts` - Contains the types used by the javascript module.

* `AnalyticsModule.android.ts` - Android bindings that allow JavaScript to call native SDK methods.

* `AnalyticsModule.ios.ts` - iOS bindings that allow JavaScript to call native SDK methods.

* `AnalyticsModule.ts` - Selects the appropriate bindings depending on the platform (iOS or Android).

* `useTrackScreen.ts` - A hook that takes care of calling [Track Screen](#track-screen) at the appropriate times and with the correct parameters.

Copy these files to a directory inside your React Native application source code. This guide assumes that the React Native Application stores all source files under `<project-root>/src`.

### Using the `useTrackScreen` Hook

You can use the provided `useTrackScreen` hook in your functional components like this:

```javascript
import useTrackScreen from '../src/siteimprove-analytics/useTrackScreen';

const MyFunctionalComponent = () => {
    useTrackScreen(HomeScreen, 'Home');

    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    );
};
```

### Using the Javascript Module

After importing the JavaScript module:

```javascript
import AnalyticsModule from 'siteimprove-analytics/AnalyticsModule';
```

You will have access to the following tracking methods:

#### Track Screen
To manually track the state of a screen:

```javascript
AnalyticsModule.trackScreen(HomeScreen, 'Home', ETrackScreenState.Shown);
```

#### Track Search
To track searches in your application:

```javascript
AnalyticsModule.trackSearch('React Native Integration', true, 5);
```

#### Track Custom Event
To track a custom event:

```javascript
AnalyticsModule.trackCustom('user.login', {
  "user.id": '12345',
  method: 'google',
  "first_time": 'true'
});
```

## Troubleshooting

### Android

- Ensure you have added `SiteimproveAnalyticsPackage()` in `MainApplication.kt`.

- Run `npx react-native run-android` after making changes.

### iOS

- Make sure `pod install` is run in the ios directory.

- Restart Metro Bundler (`npx react-native start --reset-cache`).
