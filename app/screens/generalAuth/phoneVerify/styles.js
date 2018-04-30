import {StyleSheet} from 'react-native';
import {SH, SW, colors} from "../../../config/styles";


export default StyleSheet.create({
    container: {
        backgroundColor: "#f6f6f6",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        // height: SH*0.8
    },
    headerText: {
        fontSize: 20,

        // borderBottomWidth: 1,
        // borderColor: '#000',
    },
    //text input:
    inputContainer: {},
    textInputStyle: {
        width: SW * 0.6,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 0.1,
        borderTopWidth: 4,
        borderLeftWidth:2,
        borderRightWidth:2,
        borderColor: 'rgba(218, 218, 218, 0.35)',

    },

    button: {
        backgroundColor: "#fff",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    }
})