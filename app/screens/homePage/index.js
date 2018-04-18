import {inject, observer} from "mobx-react/index";
import {Component} from "react";


@inject("userDataStore")
@inject("authStore")
@inject("proAuthStore")
@observer
export default class ChooseUserType extends Component {
    static navigationOptions = {
        header: null
    }
}