import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import {styles as homeStyles} from '../styles/home';
import {styles as defaultStyles} from '../styles/default';

interface Props {
    navigation: NavigationScreenProp<any, any>
  }

export default class HomeScreen extends React.Component<Props> {

    render() {
      return (
        <View style={[homeStyles.title, defaultStyles.background]}>
          <Text>Home Screen</Text>
          <Button
          title="Go to Connexion"
          onPress={() => this.props.navigation.navigate('Connexion')}
        />
        </View>
      );
    }
  }