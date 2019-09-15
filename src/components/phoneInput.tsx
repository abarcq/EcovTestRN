import React from 'react';
import { TextInput } from 'react-native';

import { PHONE_REGEX } from '../constantes';

import { styles as defaultStyles } from '../styles/default';
import { styles as phoneStyles } from '../styles/phoneInput';


interface Props {
    phone: string,
    setValues: Function,
    sendSMS: Function,
    initError: Function,
    error: string,
}


export default class PhoneInput extends React.Component<Props> {

    checkPhoneLength = (phone: string) => {
        this.props.setValues({
          phone
        }, () => {
          phone = phone.replace('+33', '0')
          if (phone.length >= 10) {
            if (phone.match(PHONE_REGEX) !== null && (parseInt(phone[1], 10) === 6 || parseInt(phone[1], 10) === 7)) {
              this.props.sendSMS()
              this.props.initError()
            } else {
                this.props.setValues({
                error: {
                  type: 'phone',
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
        const { phone, error } = this.props
        let styles = [defaultStyles.label, phoneStyles.phone]
            if(error === 'phone'){
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
                value={phone}
                onChangeText={(phone) => this.checkPhoneLength(phone)}
                style={styles}
            />
        )
    }

}