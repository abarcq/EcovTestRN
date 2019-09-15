import { StyleSheet } from 'react-native';

import { colors, dimensions } from './default';

export const styles = StyleSheet.create({
    element: {
        height: 100,
        marginHorizontal: 25,
    },
    label: {
        marginVertical: 10,
    },
    code: {
        marginTop: 0
    },
    codeInput: {
        backgroundColor: colors.label,
        color: colors.font,
        borderRadius: 3
    },
    phone: {
        borderColor: '#45a5c6',
        borderWidth: 1,
        width: (dimensions.width - 50),
        padding: 10,
        borderRadius: 3
    },
    button: {
        width: 180,
        padding: 10,
        borderColor: '#45a5c6',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
    },
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