import {StyleSheet} from 'react-native';
import {colors, SW, HH} from "../../../../config/styles";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    jobContainer: {
        height: HH,
        width: SW,
        // backgroundColor: 'green',
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: '#000'
    }
});