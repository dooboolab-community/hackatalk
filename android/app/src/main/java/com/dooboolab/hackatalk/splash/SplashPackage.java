package com.dooboolab.hackatalk.splash;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by mj on 07, May, 2020
 */
public class SplashPackage implements ReactPackage {
    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> list = new LinkedList<>();
        list.add(new SplashModule(reactContext));
        return list;
    }
}
