import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { sendSms, confirmationCode } from '../services/inscription';

import { Informations } from '../components/informations';
import { PhoneInput } from '../components/phoneInput';
import { CodeComponent } from '../components/codeInput';
import { InputComponent } from '../components/inputComponent';

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
  phone: String,
  error: Error,
  validation: String,
}

export default class ConnexionScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Créez votre compte',
  };

  state = {
    phone: '',
    error: {
      type: '',
      text: ''
    },
    validation: ''
  }

  setValues = (values, action) => {
    this.setState({
      ...values
    }, () => {
      if (action !== undefined) {
        action()
      }
    })
  }

  initState = () => {
    this.setState({
      error: {
        type: '',
        text: ''
      },
      validation: ''
    })
  }

  sendSMSAPI = async () => {
    const { phone, error } = this.state
    if (phone.length >= 10 && error.type !== 'phone') {
      try {
        await sendSms(phone)
        this.setValues({
          validation: 'Le SMS vous a bien été envoyé'
        }, () => {
          setTimeout(
            () => {
              this.initState()
            }, 5000)
        })
      }
      catch (error) {
        this.setState({
          error: {
            type: 'API',
            text: 'Problème d\'envoie du SMS. Touchez "renvoyer le code" pour réessayer'
          }
        })
      }
    }
  }

  confirmationCode = async (code) => {
    const { phone } = this.state
    this.initState()
    confirmationCode(phone, code)
      .then(() => {
        this.setValues({
          validation: 'Le code affiché est identique à celui qui vous a été envoyé'
        }, () => {
          setTimeout(
            () => {
              this.initState()
            }, 5000)
        })
      })
      .catch(error => {
        if (error === 'phone') {
          this.setState({
            error: {
              type: 'phone',
              text: 'saisissez votre numéro de téléphone avant votre code'
            }
          })
        } else {
          this.setState({
            error: {
              type: 'API',
              text: 'Code incorrect. Touchez "renvoyer le code" si vous n\'avez rien reçu'
            }
          })
        }
      })
  }

  render() {
    const { error, phone, validation } = this.state;
    return (
      <View style={[defaultStyles.background]}>
        <InputComponent label="Numéro de téléphone">
          <PhoneInput
            phone={phone}
            setValues={this.setValues}
            sendSMS={this.sendSMSAPI}
            initError={this.initState}
            error={error.type}
          />
        </InputComponent>
        <InputComponent label="Code de confirmation reçu par SMS">
          <CodeComponent sendCode={this.confirmationCode} error={error.type} />
        </InputComponent>
        <Informations error={error.text} validation={validation} />
        <View style={[{ alignItems: 'center', }]}>
          <TouchableOpacity style={connexionStyles.button} onPress={() => this.sendSMSAPI()}>
            <Text style={[defaultStyles.label]} >Renvoyer le SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}