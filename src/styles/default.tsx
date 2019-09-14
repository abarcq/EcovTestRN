import { StyleSheet, Dimensions } from 'react-native';

export const colors = {
    font: '#3383B2',
    label: '#FFFFFF'
}

export const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.font,
    },
    header: {
        elevation: 0,
        backgroundColor: colors.font,
    },
    label: { color: colors.label }
})