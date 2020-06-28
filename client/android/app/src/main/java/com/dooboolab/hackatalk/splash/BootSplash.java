package com.dooboolab.hackatalk.splash;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.view.animation.AccelerateInterpolator;
import android.widget.FrameLayout;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.view.ViewCompat;

import com.dooboolab.hackatalk.R;
import com.facebook.react.bridge.UiThreadUtil;

/**
 * Created by mj on 07, May, 2020
 */
public class BootSplash {

    private static BootSplash INSTANCE;
    public static BootSplash getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new BootSplash();
        }
        return INSTANCE;
    }

    private boolean mVisible = false;
    private int viewId = ViewCompat.generateViewId();
    private ObjectAnimator logoScaleXAnimator;
    private ObjectAnimator logoScaleYAnimator;
    private FrameLayout root;

    public void show(@NonNull final Activity activity) {

        Context context = activity.getApplicationContext();

        root = new FrameLayout(context);
        root.setId(viewId);
        root.setBackgroundResource(R.drawable.splash_background);

        ConstraintLayout splashLayout = (ConstraintLayout) LayoutInflater.from(context).inflate(R.layout.view_splash,
                null);
        anim(splashLayout);
        root.addView(splashLayout, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));

        ((ViewGroup) activity.getWindow().getDecorView()).addView(root,
                new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        mVisible = true;

    }

    private void anim(ViewGroup view) {
        ImageView logo = view.findViewById(R.id.logo);
        logoScaleXAnimator = ObjectAnimator.ofFloat(logo, "scaleX", 1.1f).setDuration(500);
        logoScaleXAnimator.setRepeatCount(ObjectAnimator.INFINITE);
        logoScaleXAnimator.setRepeatMode(ObjectAnimator.REVERSE);
        logoScaleXAnimator.start();

        logoScaleYAnimator = ObjectAnimator.ofFloat(logo, "scaleY", 1.1f).setDuration(500);
        logoScaleYAnimator.setRepeatCount(ObjectAnimator.INFINITE);
        logoScaleYAnimator.setRepeatMode(ObjectAnimator.REVERSE);
        logoScaleYAnimator.start();
    }


    void hide(final Float duration) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(!mVisible)
                    return;

                mVisible = false;

                logoScaleXAnimator.cancel();
                logoScaleYAnimator.cancel();

                int roundedDuration = duration.intValue();
                root.animate().setDuration(roundedDuration).alpha(0.0f).setInterpolator(new AccelerateInterpolator()).setListener(new AnimatorListenerAdapter() {
                    @Override
                    public void onAnimationEnd(Animator animation) {
                        super.onAnimationEnd(animation);
                        ((ViewGroup) root.getParent()).removeView(root);
                        root = null;
                    }
                }).start();
            }
        });
    }
}
