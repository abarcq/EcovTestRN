import { StyleSheet } from 'react-native';

import { dimensions } from './default';

export const styles = StyleSheet.create({
    phone: {
        borderColor: '#45a5c6',
        borderWidth: 1,
        width: (dimensions.width - 50),
        padding: 10,
        borderRadius: 3
    },
})