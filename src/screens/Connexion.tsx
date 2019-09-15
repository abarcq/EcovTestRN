import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import Informations from '../components/informations';
import NumberInput from '../components/phoneInput';
import { sendSms, confirmationCode } from '../services/inscription';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';
import CodeComponent from '../components/codeInput';

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

  sendSMS = async () => {
    const { phone, error } = this.state
    if (phone.length >= 10 && error.type !== 'phone') {
      sendSms(phone)
        .then(() => {
          this.setValues({
            validation: 'Le SMS vous a bien été envoyé'
          }, () => {
            setTimeout(
              () => {
                this.initState()
              }, 5000)
          })
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
        if(error==='phone'){
          this.setState({
            error: {
              type: 'phone',
              text: 'saisissez votre numéro de téléphone avant votre code'
            }
          })
        }else{
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
        <View style={[connexionStyles.element]}>
          <Text style={[defaultStyles.label, connexionStyles.label]} >
            Numéro de téléphone
          </Text>
          <NumberInput
            phone={phone}
            setValues={this.setValues}
            sendSMS={this.sendSMS}
            initError={this.initState}
            error={error.type}
          />
        </View>
        <View style={[connexionStyles.element]}>
          <Text style={[defaultStyles.label, connexionStyles.label]} >
            Code de confirmation reçu par SMS
          </Text>
          <CodeComponent sendCode={this.confirmationCode} error={error.type} />
        </View>
        <Informations error={error.text} validation={validation} />
        <View style={[{ alignItems: 'center', }]}>
          <TouchableOpacity style={connexionStyles.button} onPress={() => this.sendSMS()}>
            <Text style={[defaultStyles.label]} >Renvoyer le SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}