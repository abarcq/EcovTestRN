import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';

interface Props {
    error: string
}


export default class ErrorComponent extends React.Component<Props,null> {

    render() {
        const { error } = this.props
        return (
            <View style={[connexionStyles.element]} >
                {
                    error !== '' &&
                    <View style={connexionStyles.error}>
                        <Ionicons name="md-close-circle" size={30} color="white" style={connexionStyles.errorIcon} />
                        <Text style={[defaultStyles.label, connexionStyles.errorLibel]}>{error}</Text>
                    </View>
                }
            </View>
        )
    }

}