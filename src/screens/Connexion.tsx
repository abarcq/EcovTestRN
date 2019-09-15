import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import Informations from '../components/informations';
import NumberInput from '../components/numberInput';
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
  number: String,
  error: Error,
  validation: String,
}

export default class ConnexionScreen extends React.Component<Props, State> {

  state = {
    number: '',
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
    const { number, error } = this.state
    if (number.length >= 10 && error.type !== 'number') {
      sendSms(number)
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

  sendCode = async (code) => {
    const { number } = this.state
    this.initState()
    confirmationCode(number, code)
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
    const { error, number, validation } = this.state;
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
            initError={this.initState}
            error={error.type}
          />
        </View>
        <View style={[connexionStyles.element]}>
          <Text style={[defaultStyles.label, connexionStyles.label]} >
            Code de confirmation reçu par SMS
          </Text>
          <CodeComponent sendCode={this.sendCode} error={error.type} />
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