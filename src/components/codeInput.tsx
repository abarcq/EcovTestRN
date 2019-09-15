import React from 'react';
import CodeInput from 'react-native-confirmation-code-input';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';

interface Props {
    sendCode: Function,
    error: string,
}


export default class CodeComponent extends React.Component<Props> {



  render() {
    const { error } = this.props
    let styles = []
    if(error === 'API'){
        styles.push(defaultStyles.error)
    }
    styles.push(connexionStyles.codeInput)
    return (
          <CodeInput
            ref="codeInputRef1"
            keyboardType="numeric"
            inputPosition="left"
            codeLength={4}
            autoFocus={false}
            space={7}
            size={40}
            containerStyle={connexionStyles.code}
            codeInputStyle={styles}
            onFulfill={(code) => this.props.sendCode(code)}
          />
    );
  }
}