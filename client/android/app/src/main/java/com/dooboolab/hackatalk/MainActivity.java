package com.dooboolab.hackatalk;

import android.graphics.Color;
import android.os.Bundle;

import android.content.res.Configuration;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import expo.modules.splashscreen.singletons.SplashScreen;
import expo.modules.splashscreen.SplashScreenImageResizeMode;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // SplashScreen.show(...) has to be called after super.onCreate(...)
    // Below line is handled by '@expo/configure-splash-screen' command and it's discouraged to modify it manually
    SplashScreen.show(this, SplashScreenImageResizeMode.COVER, ReactRootView.class, false);

    int nightModeFlags =
          getApplicationContext().getResources().getConfiguration().uiMode &
                  Configuration.UI_MODE_NIGHT_MASK;

    switch (nightModeFlags) {
        case Configuration.UI_MODE_NIGHT_YES:
            getWindow().getDecorView().setBackgroundColor(Color.parseColor("#222222"));
            break;

        case Configuration.UI_MODE_NIGHT_NO:
        case Configuration.UI_MODE_NIGHT_UNDEFINED:
            getWindow().getDecorView().setBackgroundColor(Color.WHITE);
            break;
    }
  }

    static String currentLocale;

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HackaTalk";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        String locale = newConfig.locale.toString();
        if (!locale.equals(MainActivity.currentLocale)) {
            MainActivity.currentLocale = locale;
            final ReactInstanceManager instanceManager = getReactInstanceManager();
            instanceManager.recreateReactContextInBackground();
        }
    }
}
