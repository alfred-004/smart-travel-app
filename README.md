# 🛍 Smart Travel Suggestion App

A React Native mobile app (built with Expo) that uses your device's GPS location to fetch smart travel suggestions — including nearby supermarkets, restaurants, and other points of interest — using the Geoapify Places API.

Built to be lightweight, fast, and simple, this app gives users local recommendations based on their location.

---

## 🚀 Features

* 📍 Real-time location detection (via Expo Location API)
* 🗺️ Fetches nearby places using the Geoapify Places API
* 🎨 Clean and modern card-based UI
* 🛒 Categories include supermarkets, restaurants, and more
* ⚡ Cross-platform support via Expo

---

## 🧪 Tech Stack

* React Native (with Expo)
* Axios for API calls
* Geoapify Places API
* Expo Location API

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/smart-travel-app.git
cd smart-travel-app
```

2. Install dependencies:

```bash
npm install
```

3. Add your Geoapify API key:

In App.js, replace the following line:

```js
const GEOAPIFY_API_KEY = 'YOUR_API_KEY_HERE';
```

with your actual API key from [https://myprojects.geoapify.com/](https://myprojects.geoapify.com/)

4. Start the app:

```bash
npx expo start
```

Then scan the QR code using the Expo Go app on your phone.

---

## 🧐 How It Works

* App requests permission to access location.
* It calculates a small bounding box around your current location.
* Uses Geoapify's /places endpoint with a rect filter to query locations in that area.
* Displays the places in a modern card layout.

---

## 🔐 Optional: Environment Variables

You can also store your API key securely in an environment file:

1. Create a .env file in the root of your project:

```env
GEOAPIFY_API_KEY=your_api_key_here
```

2. Use react-native-dotenv or expo-constants to access the key in App.js.

---

## 🙌 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:

   ```bash
   git commit -am "Add new feature"
   ```
4. Push the branch:

   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request

---

## 📚 Resources

* Geoapify Places API: [https://apidocs.geoapify.com/docs/places/](https://apidocs.geoapify.com/docs/places/)
* React Native Docs: [https://reactnative.dev/](https://reactnative.dev/)
* Expo Location API: [https://docs.expo.dev/versions/latest/sdk/location/](https://docs.expo.dev/versions/latest/sdk/location/)

---

##
