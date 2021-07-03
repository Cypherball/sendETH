/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import _ from 'lodash';

// Ignore the warnings thrown by long timers from the ethers library
LogBox.ignoreLogs(['Setting a timer']);

AppRegistry.registerComponent(appName, () => App);
