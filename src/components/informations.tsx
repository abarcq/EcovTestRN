import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';

interface Props {
    error: string,
    validation: string
}


export default class ErrorComponent extends React.Component<Props,null> {

    render() {
        const { error, validation } = this.props
        return (
            <View style={[connexionStyles.element]} >
                {
                    error !== '' &&
                    <View style={[connexionStyles.information,connexionStyles.error]}>
                        <Ionicons name="md-close-circle" size={30} color="white" style={connexionStyles.informationIcon} />
                        <Text style={[defaultStyles.label, connexionStyles.informationLibel]}>{error}</Text>
                    </View>
                }
                {
                    validation !== '' &&
                    <View style={[connexionStyles.information, connexionStyles.validation]}>
                        <Ionicons name="md-checkmark-circle" size={30} color="white" style={connexionStyles.informationIcon} />
                        <Text style={[defaultStyles.label, connexionStyles.informationLibel]}>{validation}</Text>
                    </View>
                }
            </View>
        )
    }

}