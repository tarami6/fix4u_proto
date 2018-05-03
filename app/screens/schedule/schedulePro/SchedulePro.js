import React, {Component} from "react";
import {View, Text, TouchableOpacity} from 'react-native';
//mobx
import {inject, observer} from "mobx-react/index";
//Header imports:
import LinierView from '../../../components/linierView';
import CustomHeaderAddJobStepsConsumer from '../../../components/headers/CustomHeaderAddJobStepsConsumer';
//styles
import {SW, SH, HH} from "../../../config/styles";
import styles from './styles'
import Header from '../../../components/headers/Header';
@inject("userDataStore")
@observer
export default class SchedulePro extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // console.warn(this.props.userDataStore.userData.user.user_posts)
    }

    chooseJob(job){
        this.props.userDataStore.focusJob(job);
        if(job.status==='open'){
            this.props.navigation.navigate('ProNavigator');
        }
        this.props.navigation.navigate('ActiveJob');
    }


    render() {
        return (
            <View>
                <LinierView style={{height: HH}}>
                    <Header head={'AddJob'} props={this.props}/>
                    {/*<CustomHeaderAddJobStepsConsumer props={this.props}/>*/}
                </LinierView>
                {/*Here is the list of jobs container and the jobList MAP */}
                <View>
                    {this.props.userDataStore.userData && this.props.userDataStore.userData.user.pro_posts.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={()=>this.chooseJob(item)}
                                key={item.id}>
                                <View style={styles.jobContainer}>
                                    <Text style={{textAlign: 'center', justifyContent: 'center'}}>
                                        {item.status} + id: {item.id}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}

                </View>
            </View>
        )
    }
}