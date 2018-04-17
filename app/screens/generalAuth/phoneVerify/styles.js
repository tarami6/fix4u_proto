import {StyleSheet} from 'react-native';
import {SH, SW, colors} from "../../../config/styles";


export default StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        // height: SH*0.8
    },
    headerText: {
        fontSize: 20,
        marginTop: 30,
        // borderBottomWidth: 1,
        // borderColor: '#000',
    },
    //text input:
    inputContainer: {},
    textInputStyle: {
        width: SW * 0.6,
        marginVertical: SH / 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 0.1,
        elevation: 4,
        borderColor: '#000'
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