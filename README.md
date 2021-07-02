# sendETH

This is a mobile app created for an interview test.

**Framework:** React Native (React Native CLI)

**Version:** 0.64.2

### Installation Steps

Setup the React Native CLI Development environment for your machine if you haven't already: [Follow this guide](https://reactnative.dev/docs/environment-setup)

Now, follow the below steps in order to run the app:

1. Clone this repo using Sourcetree or using git: `git clone https://github.com/Cypherball/sendETH.git`

2. `cd sendETH`

3. `npm i` to install node packages (use _`--force`_ argument if any dependency error occurs)

4. `cd ios && pod install` to generate ios pod files (skip if building for android only on windows)

5. `cd ../` traverse back to the root directory

6. `npx react-native start` to start the metro server (keep running in terminal)

7. `react-native run-android` (in separate/new terminal) to run app in android simulator. Before running android please open the android simulator to run the app

8. `react-native run-ios` (in separate/new terminal) to run the app in ios simulator
