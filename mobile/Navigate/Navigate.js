import QRScan from '../Components/QRScan';
import Home from "../Components/Home";
import Contactes from '../Components/Contacts';
import Message from '../Components/Message';
import Image from '../Components/Image';

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
    },

    Message: {
        screen: Message,
        navigationOptions: {
            title: 'Message',
        },
    },
    Camera: {
        screen: Image,
        navigationOptions: {
            title: 'Camera',
        },
    },
});

export default createAppContainer(MainNavigator);