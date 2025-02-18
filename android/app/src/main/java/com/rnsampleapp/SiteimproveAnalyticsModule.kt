package com.rnsampleapp

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.siteimprove.analyticssdk.core.Siteimprove
import com.siteimprove.analyticssdk.model.CollectDataScreen
import com.siteimprove.analyticssdk.model.CollectDataStateChange

class SiteimproveAnalyticsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "AnalyticsModuleAndroid"

    @ReactMethod
    fun trackScreen(screenName: String, screenTitle: String, state: String) {
        Siteimprove.trackScreen(screenName, screenTitle, CollectDataScreen.State.valueOf(state))
    }

    @ReactMethod
    fun trackAppState(state: String) {
        Siteimprove.trackAppState(CollectDataStateChange.StateChange.valueOf(state))
    }

    @ReactMethod
    fun trackSearch(query: String, isSearchSuccessful: Boolean, numSearchResults: Int) {
        Siteimprove.trackSearch(query, isSearchSuccessful, numSearchResults)
    }

    @ReactMethod
    fun trackCustom(key: String, attributes: ReadableMap) {
        val attributesMap = Arguments.toBundle(attributes)
        val attributedHashMap = attributesMap?.let { it.keySet().associateWith { key -> it.getString(key) ?: "" } }
        Siteimprove.trackCustom(key, attributedHashMap ?: emptyMap())
    }
}