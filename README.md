### Getting started

Clone the repo:

```
>> mkdir bb (you can call you project's folder whatever you want; bb stands for ballboy)
>> cd bb
>> git clone git@github.com:fede-rodes/ballboy_client.git client
>> yarn run install (install dependencies)
```

### Install Expo

[https://docs.expo.io/versions/latest/introduction/installation/](https://docs.expo.io/versions/latest/introduction/installation/)

### Set expo environment variables

At the root of the project you'll find a `app.json.sample` file. Re-name it to `app.json`. That's where expo keeps all the environment variables. Set your env vars under `extra` making sure
`expo.extra.isStorybook` is set to `false` (more on this later).

Example `app.json` file:
```
{
  "expo": {
    "name": "brand",
    "slug": "brand",
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
    "entryPoint": "./index.ts",
    "ios": {
      "supportsTablet": true,
      "infoPlist": {
        "LSApplicationQueriesSchemes": [
          "comgooglemaps",
          "citymapper",
          "uber",
          "lyft",
          "waze"
        ]
      }
    },
    "extra": {
      "graphqlServer": "http://192.168.56.1:3001/graphql",
      "isStorybook": false,
      "chatkitAuthEndpoint": "http://192.168.56.1:3001/chatkit-auth",
      "chatkitReadOnlyUser": "xxx",
      "chatkitInstanceLocator": "xxx",
      "googleMapsAndroidApiKey": "xxx",
      "googleMapsIosApiKey": "xxx",
      "cloudinaryCloudname": "xxx",
      "cloudinaryApiKey": "xxx",
      "cloudinaryApiSecret": "xxx",
      "cloudinaryUploadPreset": "xxx",
      "brand": "BRAND",
      "feedbackUrl": "https://goo.gl/forms/123",
      "privacyUrl": "https://brand.com/privacy",
      "termsUrl": "https://brand.com/terms",
      "cities": [
        {
          "id": "amsterdam",
          "city": "Amsterdam",
          "country": "Netherlands",
          "formattedAddress": "Amsterdam, Netherlands",
          "coordinates": [52.354733, 4.8284116]
        },
        {
          "id": "enschede",
          "city": "Enschede",
          "country": "Netherlands",
          "formattedAddress": "Enschede, Netherlands",
          "coordinates": [52.220615, 6.895782]
        },
        {
          "id": "rotterdam",
          "city": "Rotterdam",
          "country": "Netherlands",
          "formattedAddress": "Rotterdam, Netherlands",
          "coordinates": [51.92806, 4.420195]
        },
        {
          "id": "barcelona",
          "city": "Barcelona",
          "country": "Spain",
          "formattedAddress": "Barcelona, Spain",
          "coordinates": [41.394897, 2.0785563]
        },
        {
          "id":"buenosAires",
          "city":"Buenos Aires",
          "country":"Argentina",
          "formattedAddress": "Buenos Aires, Argentina",
          "coordinates": [-34.61566, -58.50351]
        }
      ]
    }
  }
}
```

Find out more about expo env vars:
- [https://expo.canny.io/feature-requests/p/dotenv-support](https://expo.canny.io/feature-requests/p/dotenv-support)
- [https://stackoverflow.com/questions/52546254/react-native-with-expo-how-to-use-a-env-local-config-file](https://stackoverflow.com/questions/52546254/react-native-with-expo-how-to-use-a-env-local-config-file)
- [https://docs.expo.io/versions/latest/workflow/configuration/](https://docs.expo.io/versions/latest/workflow/configuration/)
- [https://docs.expo.io/versions/latest/sdk/constants/](https://docs.expo.io/versions/latest/sdk/constants/)

### Storybook

```
Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.
```

[https://storybook.js.org/](https://storybook.js.org/)

To run storybook:
- Stop `expo` in case it's running, open the emulator in case it's closed and close the app from the emulator in case it's running;
- Go to `app.json` and set `expo.extra.isStorybook` to `true`. This tells expo to run storybook instead of the real app.
- Load/update stories: `yarn run storybook`. Wait until `/storybook/storyloader.ts` gets created/updated. Then stop storybook `ctrl + C` on Linux.
- Run expo as usual: `expo start`. Storybook should open automatically on the emulator.


https://pusher.com/tutorials/storybook-react-native