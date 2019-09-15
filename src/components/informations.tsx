import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';
import { styles as informationsStyles } from '../styles/informations';

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
                    <View style={[informationsStyles.information,informationsStyles.error]}>
                        <Ionicons name="md-close-circle" size={30} color="white" style={informationsStyles.informationIcon} />
                        <Text style={[defaultStyles.label, informationsStyles.informationLibel]}>{error}</Text>
                    </View>
                }
                {
                    validation !== '' &&
                    <View style={[informationsStyles.information, informationsStyles.validation]}>
                        <Ionicons name="md-checkmark-circle" size={30} color="white" style={informationsStyles.informationIcon} />
                        <Text style={[defaultStyles.label, informationsStyles.informationLibel]}>{validation}</Text>
                    </View>
                }
            </View>
        )
    }

}