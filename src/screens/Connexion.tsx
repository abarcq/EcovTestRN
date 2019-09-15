import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import CodeInput from 'react-native-confirmation-code-input';

import ErrorComponent from '../components/error';
import NumberInput from '../components/numberInput';
import { sendSms } from '../services/inscription';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';

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

  setValues = (values, action) => {
    this.setState({
      ...values
    },()=>{
      if(action !== undefined){
        action()
      }
    })
  }

  initError = () => {
    this.setState({
      error: {
        type: '',
        text: ''
      }
    })
  }

  sendSMS = async () => {
    const { number, error } = this.state
    if(number.length >=10 && error.type !=='number'){
      sendSms(number)
        .then(() => {
          console.log('SMS send')
        })
        .catch(error => {
          this.setState({
            error: {
              type: 'API',
              text: 'Problème d\'envoie du SMS. Touchez "renvoyer le code" pour réessayer'
            }
          })
        })
    }
  }

  render() {
    const { error, number } = this.state;
    return (
      <View style={[defaultStyles.background]}>
        <View style={[connexionStyles.element]}>
          <Text style={[defaultStyles.label, connexionStyles.label]} >
            Numéro de téléphone
          </Text>
          <NumberInput
            number={number}
            setValues={this.setValues}
            sendSMS={this.sendSMS}
            initError={this.initError}
            error={error.type}
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
        <ErrorComponent error={error.text} />
        <View style={[{ alignItems: 'center', }]}>
          <TouchableOpacity style={connexionStyles.button} onPress={()=>this.sendSMS()}>
            <Text style={[defaultStyles.label]} >Renvoyer le SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}