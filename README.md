### ENV VARS

Copy `app.json.sample` and re-name it to `app.json`. Set your env vars under `extra`.

```
{
  "expo": {
    "name": "ballboy",
    "slug": "bb",
    "privacy": "public",
    "sdkVersion": "35.0.0",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "extra": {
      "myApiKey" : "1234"
    }
  }
}
```

You can then access it via
```
import Constants from 'expo-constants';

Constants.manifest.extra.myApiKey
```

Find out more:
- [https://expo.canny.io/feature-requests/p/dotenv-support](https://expo.canny.io/feature-requests/p/dotenv-support)
- [https://stackoverflow.com/questions/52546254/react-native-with-expo-how-to-use-a-env-local-config-file](https://stackoverflow.com/questions/52546254/react-native-with-expo-how-to-use-a-env-local-config-file)
- [https://docs.expo.io/versions/latest/workflow/configuration/](https://docs.expo.io/versions/latest/workflow/configuration/)
- [https://docs.expo.io/versions/latest/sdk/constants/](https://docs.expo.io/versions/latest/sdk/constants/)

### Storybook

https://pusher.com/tutorials/storybook-react-native