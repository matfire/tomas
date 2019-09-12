import Login from '../Components/Login';
import Register from '../Components/Register';

import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

const MainNavigator = createMaterialTopTabNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: "Se connecter",
        },
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: "S'enregistrer",
        },
    },
},
{
    swipeEnabled: true,
    animationEnabled: true,
});

export default createAppContainer(MainNavigator);