import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import CodeInput from 'react-native-confirmation-code-input';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';

interface Props {
  navigation: NavigationScreenProp<any, any>
}

interface State {
  number: String,
  code: String,
  error: String,
}

export default class ConnexionScreen extends React.Component<Props, State> {

  state = {
    number: '',
    code: '',
    error: '',
  }

  checkNumberLength = (number: string) => {
    this.setState({
      number
    }, () => {
      number = number.replace('+33', '0')
      if (number.length === 10) {
        if (parseInt(number, 10) !== NaN && parseInt(number[0], 10) === 0 &&
          (parseInt(number[1], 10) === 6 || parseInt(number[1], 10) === 7)) {
          this.sendSMS()
        } else {
          this.setState({
            error: 'Numéro de téléphone incorrrect'
          })
        }
      }
    })
  }

  sendSMS = () => {
    // TODO
  }

  render() {
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
        <View style={[connexionStyles.element]}></View>
        <View style={[{ alignItems: 'center', }]}>
          <TouchableOpacity style={connexionStyles.button}>
            <Text style={[defaultStyles.label]} >Renvoyer le SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}