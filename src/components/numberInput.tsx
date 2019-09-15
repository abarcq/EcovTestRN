import React from 'react';
import { TextInput } from 'react-native';

import { PHONE_REGEX } from '../constantes';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';


interface Props {
    number: string,
    setValues: Function,
    sendSMS: Function,
    initError: Function,
    error: string,
}


export default class NumberInput extends React.Component<Props> {

    checkNumberLength = (number: string) => {
        this.props.setValues({
          number
        }, () => {
          number = number.replace('+33', '0')
          if (number.length >= 10) {
            if (number.match(PHONE_REGEX) !== null && (parseInt(number[1], 10) === 6 || parseInt(number[1], 10) === 7)) {
              this.props.sendSMS()
              this.props.initError()
            } else {
                this.props.setValues({
                error: {
                  type: 'number',
                  text: 'Numéro de téléphone incorrrect'
                }
              })
            }
          } else {
            this.props.initError()
          }
        })
      }

    render() {
        const { number, error } = this.props
        let styles = [defaultStyles.label, connexionStyles.phone]
            if(error === 'number'){
                styles.push(defaultStyles.error)
            }
        return (
            <TextInput
                placeholder="+33XXXXXXXXX"
                autoFocus
                dataDetectorTypes="phoneNumber"
                keyboardType="phone-pad"
                maxLength={12}
                textContentType="telephoneNumber"
                value={number}
                onChangeText={(number) => this.checkNumberLength(number)}
                style={styles}
            />
        )
    }

}