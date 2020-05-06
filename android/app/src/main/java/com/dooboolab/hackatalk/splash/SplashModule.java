package com.dooboolab.hackatalk.splash;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


/**
 * Created by mj on 07, May, 2020
 */
public class SplashModule extends ReactContextBaseJavaModule {


    SplashModule(ReactApplicationContext context) {
        super(context);
    }


    @NonNull
    @Override
    public String getName() {
        return "SplashModule";
    }

    @ReactMethod
    public void hide(float duration) {
        if(this.getCurrentActivity() != null)
            BootSplash.hide(duration);
    }


}