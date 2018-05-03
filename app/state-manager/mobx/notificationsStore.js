/**
 * most important store!
 * notes:
 * "post" = "job"
 **/

import {action, observable} from 'mobx'


export default class NotificationsStore {

    //change:
    @observable newNotification = false;

    @action setNewNotification(bol: boolean){
        this.newNotification = bol;
    }

}
