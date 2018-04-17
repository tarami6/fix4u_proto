import {StyleSheet} from 'react-native';
import {colors} from '../../config/styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    inputButtonStyle: {
        height: 50,
        width: 200,
    },
    avatarContainer: {
        borderColor: '#F5A623',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    avatar: {
        borderRadius: 100,
        width: 100,
        height: 100,
        // marginBottom: SCREENWIDTH
    },
    iconText: {
        alignItems: 'center',
    }
});