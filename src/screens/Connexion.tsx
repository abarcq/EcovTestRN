import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import CodeInput from 'react-native-confirmation-code-input';
import { Ionicons } from '@expo/vector-icons';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';

import {PHONE_REGEX} from '../constantes';

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface Error {
  type: String,
  text: String,
}

interface State {
  number: String,
  code: String,
  error: Error,
}

export default class ConnexionScreen extends React.Component<Props, State> {

  state = {
    number: '',
    code: '',
    error: {
      type: '',
      text: ''
    },
  }

  checkNumberLength = (number: string) => {
    this.setState({
      number
    }, () => {
      number = number.replace('+33', '0')
      if (number.length >= 10) {
        if (number.match(PHONE_REGEX) !== null && (parseInt(number[1], 10) === 6 || parseInt(number[1], 10) === 7)) {
          this.sendSMS()
          this.setState({
            error: {
              type: '',
              text: ''
            }
          })
        } else {
          this.setState({
            error: {
              type: 'number',
              text: 'Numéro de téléphone incorrrect'
            }
          })
        }
      } else {
        this.setState({
          error: {
            type: '',
            text: ''
          }
        })
      }
    })
  }

  sendSMS = () => {
    // TODO
  }

  render() {
    const { error } = this.state;
    return (
      <View style={[defaultStyles.background]}>
        <View style={[connexionStyles.element]}>
          <Text style={[defaultStyles.label, connexionStyles.label]} >
            Numéro de téléphone
          </Text>
          <TextInput
            placeholder="+33XXXXXXXXX"
            autoFocus
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
            maxLength={12}
            textContentType="telephoneNumber"
            value={this.state.number}
            onChangeText={(number) => this.checkNumberLength(number)}
            style={[defaultStyles.label, connexionStyles.phone]}
          />
        </View>
        <View style={[connexionStyles.element]}>
          <Text style={[defaultStyles.label, connexionStyles.label]} >
            Code de confirmation reçu par SMS
          </Text>
          <CodeInput
            ref="codeInputRef1"
            keyboardType="numeric"
            inputPosition="left"
            codeLength={4}
            autoFocus={false}
            space={7}
            size={40}
            containerStyle={connexionStyles.code}
            codeInputStyle={connexionStyles.codeInput}
            onFulfill={(code) => console.log(code)}
          />
        </View>
        <View style={[connexionStyles.element]} >
          {error.type !== '' &&
            <View style={connexionStyles.error}>
              <Ionicons name="md-close-circle" size={30} color="white" style={connexionStyles.errorIcon} />
              <Text style={[defaultStyles.label]}>{error.text}</Text>
            </View>
          }
        </View>
        <View style={[{ alignItems: 'center', }]}>
          <TouchableOpacity style={connexionStyles.button}>
            <Text style={[defaultStyles.label]} >Renvoyer le SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}