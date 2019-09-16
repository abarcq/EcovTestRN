import React, { FunctionComponent } from 'react';
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

function hasPhone(phone) {
  return (phone.length === 10 && phone[0] !== '+') || phone.length === 12
}

function validePhone(phone) {
  if (parseInt(phone[0], 10) === 0) {
    return phone.match(PHONE_REGEX) !== null && (parseInt(phone[1], 10) === 6 || parseInt(phone[1], 10) === 7)
  } else {
    return phone.match(PHONE_REGEX) !== null && (parseInt(phone[3], 10) === 6 || parseInt(phone[3], 10) === 7)
  }
}

function checkPhoneLength(phone: string, props: Props) {
  props.setValues({
    phone
  }, () => {
    if (hasPhone(phone)) {
      if (validePhone(phone)) {
        props.sendSMS()
        props.initError()
      } else {
        props.setValues({
          error: {
            type: 'phone',
            text: 'Numéro de téléphone incorrrect'
          }
        })
      }
    } else {
      props.initError()
    }
  })
}


export const PhoneInput: FunctionComponent<Props> = (props) => {
  const { phone, error } = props
  let styles = [defaultStyles.label, phoneStyles.phone]
  if (error === 'phone') {
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
      onChangeText={(phone) => checkPhoneLength(phone, props)}
      style={styles}
    />
  )
}