import { StyleSheet } from 'react-native';

import { dimensions, colors } from './default';

export const styles = StyleSheet.create({
    information: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    informationIcon: {
        margin: 12.15,
    },
    informationLibel: {
        width: (dimensions.width - 100),
    },
    validation: {
        backgroundColor: colors.validation,
    },
    error: {
        backgroundColor: colors.error,
    },
})