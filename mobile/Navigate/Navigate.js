import QRScan from '../Components/QRScan';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
    QRScan: {
        screen: QRScan,
        navigationOptions: {
            title: 'QRScanner',
        },
    },
});

export default createAppContainer(MainNavigator);