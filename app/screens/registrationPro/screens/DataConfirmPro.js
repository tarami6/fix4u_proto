import React from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import {SH, SW, HH} from "../../../config/styles";
import {submitButton} from "../../../components/modalSubmitButton";
import CustomHeaderGrey from '../components/CustomHeaderGrey'
//config
import {proRegistrationRoute} from "../../../config/apiRoutes";
import {ServicesArrToHebString} from "../../../generalFunc/generalObjects";
import {inject, observer} from "mobx-react/native";
import {fetcher} from "../../../generalFunc/fetcher";
import {handlePushyToken} from "../../../generalFunc/pushyTokenHandler";
import Header from "../../../components/headers/Header";

@inject('modalsStore')
@inject('authStore')
@inject('userDataStore')
@inject("proAuthStore")
@observer
export default class ChooseTime extends React.Component {
    static navigationOptions = {
        header: null


    };

    constructor(props) {
        super(props);
        this.state = {text: ''};
    }


    //fetching and handling:

    handleSubmit() {
        let sendObj = this.props.proAuthStore.getSendObj();
        let finalSendObj = {} // this variable is to switch between form data body type send an json body send
        let headers = {}
        if (sendObj.name === this.props.proAuthStore.proUser.name) {
            headers = {
                'Accept': `application/json`,
                'Content-Type': 'application/json'
            }
            finalSendObj = sendObj
        }
        else {
            headers = {
                'Accept': `application/json`,
                'content-type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            };
            finalSendObj = {
                type: 'formData',
                payload: sendObj
            };
        }
        this.props.modalsStore.showModal('loaderModal');
        fetcher(proRegistrationRoute, 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), finalSendObj, headers)
    }

    ///// success registration handles:
    successCallback(res) {
        this.props.modalsStore.hideModal('loaderModal');
        if(res.token){
            handlePushyToken(res.token)
            this.props.proAuthStore.updatePro(res);
            this.props.proAuthStore.saveToAsync();
            this.props.userDataStore.setUserData(res)
            this.props.userDataStore.setCurrentUserType('pro');
            this.props.userDataStore.setUserType('pro');
            this.props.navigation.navigate('ProNavigator');
        }
    }

    errorCallback(err) {
        this.props.modalsStore.hideModal('loaderModal');
        console.warn('error in registration got:', err);
        console.log('error in registration got:', err)

    }

    //renders the services from arr to view with
    showProServices(serviceArr){

    }


    render() {
        let proUser = this.props.proAuthStore.proUser;
        return (
            <View style={styles.container}>
                <View style={styles.whiteHead}>
                    <Header head={'Grey'} previousPage={'ExplainThePro'} props={this.props} />
                    {/*Image & service & full name*/}
                    <View style={styles.imageAndNameRow}>
                        <View style={styles.nameView}>
                            {/* name */}
                            <Text style={{color: '#000', textAlign: 'right'}}>{proUser.name}</Text>
                            {/* services */}
                            <Text>{ServicesArrToHebString(proUser.services)}</Text>
                        </View>
                        <View
                            style={styles.imageView}>
                            <Image style={styles.proImage}
                                   source={this.props.proAuthStore.localImage}
                            />
                        </View>
                    </View>
                    {/*about*/}
                    <View style={{flex: 0.8, marginRight: SW / 20, marginLeft: SW / 20, justifyContent: 'center'}}>
                        <Text>{proUser.company_description}</Text>
                    </View>
                    {/*reviews*/}
                    <View style={styles.reviewsRow}>
                        {/*Stars*/}
                        <View style={styles.starsView}>
                            <StarIcon name="star" size={15} color="#9b9b9b" style={styles.starIcon}/>
                            <StarIcon name="star" size={15} color="#9b9b9b" style={styles.starIcon}/>
                            <StarIcon name="star" size={15} color="#9b9b9b" style={styles.starIcon}/>
                            <StarIcon name="star" size={15} color="#9b9b9b" style={styles.starIcon}/>
                            <StarIcon name="star" size={15} color="#9b9b9b" style={styles.starIcon}/>
                        </View>
                        <View style={styles.reviewText}>
                            <Text>0 חוות דעת</Text>
                        </View>
                    </View>
                </View>

                {/*middle*/}
                <View style={styles.middleView}>
                    <View style={styles.businessInfo}>
                        {/*businessName*/}
                        <View style={styles.businessRow}>
                            <View style={styles.left}>
                                <Text>{proUser.company_name}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text>שם העסק</Text>
                            </View>
                        </View>
                        {/*businessId*/}
                        <View style={styles.businessRow}>
                            <View style={styles.left}>
                                <Text>{proUser.company_id}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text>מספר העסק</Text>
                            </View>
                        </View>
                        {/*businessAddress*/}
                        <View style={{flex: 1, flexDirection: 'row', marginTop: SW /10}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Text>{proUser.company_address}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text>כתובת העסק</Text>
                            </View>
                        </View>
                        {/*phoneNumber*/}
                        <View style={styles.businessRow}>
                            <View style={styles.left}>
                                <Text>{this.props.authStore.user.phone_number}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text>פלאפון</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={{alignItems: 'center'}}>
                        {submitButton('אימות','consumer', () => {
                            this.handleSubmit();
                        })}
                    </View>
                </View>

            </View>


        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiteHead: {
        backgroundColor: '#fff',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#9b9b9b'
    },

    // Middle
    middleView: {
        flex: 1.5,

        alignItems: 'center'
    },
    imageAndNameRow: {
        flex: 1.2,
        flexDirection: 'row'
    },
    nameView: {
        flex: 1,
        justifyContent: 'center'
    },
    imageView: {
        flex: 0.3,
        backgroundColor: 'white',
        alignItems: 'flex-end',
        marginRight: SW / 20
    },
    proImage: {
        width: SW /7,
        height: SW /7,
        borderRadius: 100
    },
    reviewsRow: {
        flex: 0.7, alignSelf: 'center',
        width: SW - ((SW / 20) * 2),
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#9b9b9b'
    },
    starsView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    starIcon: {
        paddingRight: 5
    },
    reviewText: {
        flex: 1,
        justifyContent: 'center'
    },
    businessInfo: {

        flex: 0.4,
        width: SW - ((SW / 20) * 2),
    },
    businessRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: SW /10
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    right: {
        flex: 1,
        justifyContent: 'center'
    },
    // Footer
    footer: {
        flex: 0.5,
        justifyContent: 'center'
    }
})