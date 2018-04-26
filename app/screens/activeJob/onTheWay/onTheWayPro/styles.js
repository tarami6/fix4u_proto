import {StyleSheet} from 'react-native';
import {colors, SW, HH, SH} from "../../../../config/styles";

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
    },
    modal: {
        width: '84%',
        height: '88%',
        marginLeft: '8%',
        marginTop: '10%'
    },
    TopView: {
        backgroundColor: 'white',
        flex: 0.2,
        justifyContent: 'flex-start'

    },
    middleView: {
        backgroundColor: 'white',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'

    },
    bottomView: {
        backgroundColor: 'white',
        flex: 0.25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center'

    },
    xicon: {
        margin: '5%'
    },
    bt: {
        width: '70%',
        height: 50,
        backgroundColor: 'orange',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },
    middleText: {
        flex: 0.6,
        fontSize: 18,
        fontWeight: 'bold'

    },

});