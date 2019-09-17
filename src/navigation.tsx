import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ConnexionScreen from './screens/Connexion';
import HomeScreen from './screens/Home';
import { styles, colors } from './styles/default';

const navigationOptions = () => ({
  headerStyle: styles.header,
  headerTintColor: colors.label,
  headerTitleStyle: styles.label
})

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Connexion: {
      screen: ConnexionScreen,
      navigationOptions,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

AppNavigator.navigationOptions = {
  header: {
    style: { shadowColor: 'transparent' },
  },
};

export default createAppContainer(AppNavigator);