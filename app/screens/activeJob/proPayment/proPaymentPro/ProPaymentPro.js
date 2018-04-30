import React, {Component} from "react";
import {Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
//config
import {fetcher} from "../../../../generalFunc/fetcher";
import {startJobRoute} from "../../../../config/apiRoutes";
//mobx
import {inject, observer} from "mobx-react/index";
import {SW} from "../../../../config/styles";
import {submitButton} from "../../../../components/modalSubmitButton";
import Header from '../../../../components/headers/Header'

@inject("userDataStore")
@observer
export default class ProPaymentPro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            name: '',
        };
    }

    componentWillMount(){
        let name = this.props.userDataStore.focusedJob.user.name;
        this.setState({
            name: name
        })
    }


    // setModalVisible(visible) {
    //     this.setState({modalVisible: visible});
    // }

    //fetch func and handling
    getPaid() {
        if (this.state.fee) {
            let fee = this.state.fee;
            let route = startJobRoute(this.props.userDataStore.focusedJob.id);
            let sendObj = {
                status: 'consumer_payment',
                work_fee: fee,
                total_fee: fee + 100
            };
            let headers = {
                'Accept': `application/json`,
                'content-type': 'application/json',
                'Authorization': 'JWT ' + this.props.userDataStore.userData.token
            };
            fetcher(route, 'PATCH', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj, headers)
        }
        else {
            Alert.alert('אנא הכנס מחיר שירות');
        }
    }

    successCallback(res) {
        this.props.userDataStore.updatePost(res);
        this.props.userDataStore.focusJob(res)
        // this.props.navigation.navigate('ActiveJob');
        console.warn('get paid fetch success', res);
        // console.log('start job fetch success', res);
    }

    errorCallback(err) {
        console.warn('error', err);
        console.log('error:', err)
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {/*<Modal*/}
                    {/*animationType="fade"*/}
                    {/*transparent={true}*/}
                    {/*visible={this.state.modalVisible}*/}
                    {/*onRequestClose={() => {*/}
                        {/*alert('Modal has been closed.');*/}
                    {/*}}>*/}
                    {/*<View style={{backgroundColor: 'rgba(0,0,0,0.3)', flex: 1}}>*/}
                        {/*<View style={styles.modal}>*/}


                            {/*<TouchableHighlight onPress={() => {*/}
                                {/*this.setModalVisible(!this.state.modalVisible);*/}
                                {/*this.props.navigation.navigate('Home')*/}
                            {/*}} id='top' style={styles.TopView}>*/}
                                {/*<Image style={styles.xicon}*/}
                                       {/*source={require('../../../../../assets/icons/Exit.png')}/>*/}
                            {/*</TouchableHighlight>*/}



                            {/*<View id='middle' style={styles.middleView}>*/}

                                {/*<View style={{*/}
                                    {/*flex: 0.8,*/}
                                    {/*width: '100%',*/}
                                    {/*justifyContent: 'flex-end',*/}
                                    {/*alignItems: 'center',*/}
                                    {/*paddingBottom: '5%'*/}
                                {/*}}>*/}

                                    {/*<Image style={{width: 80, height: 80}}*/}
                                           {/*source={require('../../../../../assets/icons/charge.png')}/>*/}
                                {/*</View>*/}


                                {/*<View style={{flex: 0.5, width: '100%', alignItems: 'center'}}>*/}
                                    {/*<Text style={styles.middleText}> הלקוח חויב ב*/}
                                    {/*</Text>*/}
                                    {/*<Text style={styles.middleText}> ב390 ש"ח </Text>*/}
                                {/*</View>*/}

                            {/*</View>*/}


                            {/*<View id="bottom" style={styles.bottomView}>*/}

                            {/*</View>*/}
                        {/*</View>*/}

                    {/*</View>*/}
                {/*</Modal>*/}
                {/*Header*/}
                <Header head={'Grey'} previousPage={'Home'} props={this.props} />
                {/*Body*/}
                <View style={{flex: 1, width: SW - 60}}>
                    <View style={{flex: 1.5, borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 10}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <Text style={{fontSize: 18, color: '#000'}}>חשבונית מס</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <View style={{flex: 1, backgroundColor: '#fff'}}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    value={this.state.name}
                                    onChangeText={(text)=>{this.setState({name: name})}}
                                    placeholder={"אלכסנדר קנדל"}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={{flex: 0.4, justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>עבור</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <View
                                style={{flex: 1, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center'}}>
                                <TextInput
                                    onChangeText={(fee)=>this.setState({fee: fee})}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        width: SW / 8,
                                        backgroundColor: '#FCFCFC',
                                        borderRadius: 7,
                                        textAlign: 'right',
                                        borderBottomWidth: 0.5,
                                        borderTopWidth: 2,
                                        borderRightWidth: 1,
                                        borderLeftWidth: 1,
                                        borderColor: '#E7E7E7'
                                    }}
                                />
                                <Text style={{fontSize: 16, color: '#000', marginLeft: 10}}>ש"ח</Text>
                            </View>
                            <View style={{flex: 0.4, justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>מחיר שירות</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, borderBottomWidth: 1, borderColor: 'grey',}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 14}}>2:15:37</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>זמן</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text style={{fontSize: 14}}>130 ש"ח</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text>מחיר הגעה</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, borderBottomWidth: 1, borderColor: 'grey',}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 14}}>330 ש"ח</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>זמן</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text style={{fontSize: 14}}>17%</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text> מע"מ</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 0.5,}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>390 ש"ח</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>סה"כ</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        {submitButton('שלח', () => {
                            this.getPaid();
                        })}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#FCFCFC',
        borderRadius: 7,
        textAlign: 'right',
        borderBottomWidth: 0.5,
        borderTopWidth: 2,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#E7E7E7'
    },
    // Modal
    modal: {
        width: '84%',
        height: '95%',
        marginLeft: '8%',
        marginTop: '10%'
    },
    TopView: {
        backgroundColor: 'white',
        flex: 0.3,
        justifyContent: 'flex-start'

    },
    middleView: {
        backgroundColor: 'white',
        flex: 0.65,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '10%'


    },
    bottomView: {
        backgroundColor: 'white',
        flex: 0.6,
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