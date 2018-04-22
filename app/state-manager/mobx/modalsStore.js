import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class ModalsStore {

    // all modals :
    //AUTH:
    @observable showAuthModal = false;

    @observable proPhoneVerifyModal = false;

    @observable chooseJobModal = false;


    //display/hide modals
    @action showModal(str: string){
        this[str] = true;
    }

    @action hideModal(str: string){
        this[str] = false;
    }

    @action closeModal = this.hideModal;

    @action toggleModal(str: string){
        this[str] = !this[str];
    }

    @action setModalVisibility(str: string, bol: boolean){
        this[str] = bol;
    }

//    help funcs:
    @action getStoreRef(store){
        this.store = store
    }


}
