import QRScan from '../Components/QRScan';
import Home from "../Components/Home";

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
        },
    },

    QRScan: {
        screen: QRScan,
        navigationOptions: {
            title: 'QRScanner',
        },
    },
});

export default createAppContainer(MainNavigator);