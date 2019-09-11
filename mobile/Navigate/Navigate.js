import QRScan from '../Components/QRScan';
import Home from "../Components/Home";
import Contactes from '../Components/Contacts';

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

    Contactes: {
        screen: Contactes,
        navigationOptions: {
            title: 'Contactes',
        },
    }
});

export default createAppContainer(MainNavigator);