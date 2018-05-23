package com.fix4u_screens;

import android.app.Application;

import me.pushy.sdk.react.PushyPackage;
import com.facebook.react.ReactApplication;
import com.xxsnakerxx.flurryanalytics.FlurryAnalyticsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.beefe.picker.PickerViewPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import tech.bam.RNBraintreeDropIn.RNBraintreeDropInPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.modules.i18nmanager.I18nUtil;



import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }
        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new FlurryAnalyticsPackage(),
                    new PickerViewPackage(),
                    new MapsPackage(),
                    new LinearGradientPackage(),
                    new ImagePickerPackage(),
                    new RNBraintreeDropInPackage(),
                    new LottiePackage(),
                    new VectorIconsPackage(),
                    new PushyPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        // FORCE LTR
                I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
                sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
    }

}
