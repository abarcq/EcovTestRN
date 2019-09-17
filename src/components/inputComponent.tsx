import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';

interface Props {
    label: string,
}


export const InputComponent: FunctionComponent<Props> = ({ label, children }) => {
    return (
        <View style={[connexionStyles.element]}>
            <Text style={[defaultStyles.label, connexionStyles.label]} >{label}</Text>
            {children}
        </View>
    )
}