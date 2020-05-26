package com.dooboolab.hackatalk.splash;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.dooboolab.hackatalk.MainActivity;

/**
 * Created by mj on 07, May, 2020
 */
public class SplashActivity extends AppCompatActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        runOnUiThread(() -> {
            try {
                Intent intent = new Intent(this, MainActivity.class);
                Bundle extras = getIntent().getExtras();
                String action = getIntent().getAction();

                if(extras != null) {
                    intent.putExtras(extras);
                }
                if(Intent.ACTION_VIEW.equals(action)) {
                    intent.setAction(action);
                    intent.setData(getIntent().getData());
                }

                startActivity(intent);
                finish();
            } catch(Exception e) {
                Log.e("SplashActivity", e.getMessage());
                e.printStackTrace();
                finishAffinity();
            }
        });


    }
}
