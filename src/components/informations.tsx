import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles as defaultStyles } from '../styles/default';
import { styles as connexionStyles } from '../styles/connexion';
import { styles as informationsStyles } from '../styles/informations';

interface Props {
    error: string,
    validation: string
}


export const Informations: FunctionComponent<Props> = ({ error, validation }) => {
    return (
        <View style={[connexionStyles.element]} >
            {
                error !== '' &&
                <View style={[informationsStyles.information, informationsStyles.error]}>
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