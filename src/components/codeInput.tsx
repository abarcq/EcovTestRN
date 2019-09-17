import React, { FunctionComponent } from 'react';
import CodeInput from 'react-native-confirmation-code-input';

import { styles as defaultStyles } from '../styles/default';
import { styles as codeInputStyles } from '../styles/codeInput';

interface Props {
  sendCode: Function,
  error: string,
}

export const CodeComponent: FunctionComponent<Props> = ({ error, sendCode }) => {
  let styles = []
  if (error === 'API') {
    styles.push(defaultStyles.error)
  }
  styles.push(codeInputStyles.codeInput)
  return (
    <CodeInput
      keyboardType="numeric"
      inputPosition="left"
      codeLength={4}
      autoFocus={false}
      space={7}
      size={40}
      containerStyle={codeInputStyles.code}
      codeInputStyle={styles}
      onFulfill={(code) => sendCode(code)}
    />
  );
}