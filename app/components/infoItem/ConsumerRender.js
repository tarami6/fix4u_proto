import React from 'react';
import {Image, Text, View} from 'react-native';


import {hebrewServices, ServicesArrToHebString} from "../../generalFunc/generalObjects";


import {inject, observer} from "mobx-react/native";

@inject('userDataStore')
@observer
export default class ConsumerRender extends React.Component {

    render(){
        let user = this.props.user;
        console.log('uset object:', user);



        return (
             <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#ffffff',

        }}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                <Text style={{color: '#000', textAlign: 'right'}}> היום {user.appointment_time_start? user.appointment_time_start.slice(0,5): null} </Text>
                <Text style={{color: '#000', textAlign: 'right'}}>  {user.service_fee} ש"ח </Text>


            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{user.user && user.user.name}</Text>
                <Text style={{ textAlign: 'right'}}>{user.address}</Text>

            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                { user.user &&
                    <Image
                        style={{width: 60, height: 60, borderRadius: 100,}}
                        source={{uri: user.user.profile_pic_thumb}}/>
                }
            </View>
        </View>
        )
    }
}