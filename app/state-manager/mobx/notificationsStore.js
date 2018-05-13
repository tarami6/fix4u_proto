/**
 * most important store!
 * notes:
 * "post" = "job"
 **/

import {action, observable} from 'mobx'


export default class NotificationsStore {

    //change:
    @observable proNotifications = {
        open: [],
        active: []
    };

    @observable consumerNotifications = {
        open: [],
        active: []
    };

    //userType: pro/consumer, postType: open/active, postId: postId for now later will be the notification itself
    @action addPostsNotification(userType='consumer', postType, postId){
        if(userType==='pro'){
            this.proNotifications[postType].push()
        }
    }
}
