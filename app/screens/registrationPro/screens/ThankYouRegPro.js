import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Image, StyleSheet} from 'react-native';
import {SH, SW} from "../../assets/style/MainStayle";

export default class ThankYouRegPro extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View>
                <View style={styles.modalContainer}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>

                        <View style={styles.modalView}>
                            {/*Exit Icon*/}
                            <View style={styles.eXicon}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Image
                                        source={require('../../../../assets/registration/icons/Exit.png')}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.body}>
                                <Image
                                    style={{marginTop: SW / 15}}
                                    source={require('../../../../assets/registration/icons/ThankYouMan.png')}
                                />
                                <Text style={styles.thanksText}>תודה
                                    על ההרשמה</Text>
                                <View style={styles
                                    .borderHorizontal}/>
                                <Text style={styles.infoText}>בקרוב תקבל הודעת
                                    אימות</Text>
                                <Text style={styles.infoText2}>ותוכל להתחיל לעבוד</Text>
                            </View>
                            <View style={{flex: 0.5}}/>

                        </View>
                    </Modal>
                </View>


                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        alignSelf: 'center',
        marginTop: SW / 20,
        backgroundColor: '#f6f6f6',
        height: SH - (SH / 10),
        width: SW - (SW / 10)
    },
    eXicon: {
        flex: 0.3,
        marginTop: SW / 15,
        marginLeft: SW / 15
    },
    body: {
        flex: 1,
        alignItems: 'center'
    },
    thanksText: {
        marginTop: SH / 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    borderHorizontal: {
        marginTop: SH / 40,
        width: SW / 12,
        height: 1,
        borderTopWidth: 1,
        borderColor: '#000'
    },
    infoText:{
        marginTop: SH / 15,
        fontSize: 14,
        color: '#000'
    },
    infoText2:{
        fontSize: 12,
        color: '#000'
    }
})