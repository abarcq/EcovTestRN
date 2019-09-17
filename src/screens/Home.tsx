import React from 'react';
import { View, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { styles as homeStyles } from '../styles/home';
import { styles as defaultStyles } from '../styles/default';

interface Props {
  navigation: NavigationScreenProp<any, any>
}

export default function HomeScreen(props: Props) {
  return (
    <View style={[homeStyles.title, defaultStyles.background]}>
      <Button title="Inscription" onPress={() => props.navigation.navigate('Connexion')} />
    </View>
  );
}