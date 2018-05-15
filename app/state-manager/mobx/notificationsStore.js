/**
 * notifications
 * notes:
 * not = notification
 * addNotification func should look like: ...addPostsNotification('open', postId, 'pro') - add not for open post of a pro
 * and remove: ...removePostNotifications('active', postId, 'consumer') - remove all 'postId' not's from the 'active' posts of a consumer
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



    //each time a notification regarding a post is coming is this is the function that handles it:
    //userType: pro/consumer, postType: open/active, postId: postId for now later will be the notification itself
    @action addPostsNotification(postType, postId, userType='consumer'){
        if(userType==='pro'){
            this.proNotifications[postType].push(postId)
        }
        else {
            this.consumerNotifications[postType].push(postId)
        }
    }

    //removes all notifications regarding a specific post
    @action removePostNotifications(postType='active', postId, userType='consumer'){
        //pro notifications or consumer notifications
        let notList = userType==='consumer'? 'consumerNotifications': 'proNotifications';
        console.log('in removePostNotifications current not listLength:', this[notList][postType].length, notList);
        for(let i =0;i<this[notList][postType].length;i++){
            if(this[notList][postType][i]===postId){
                this[notList][postType].splice(i,1);
            }
        }
    }

    @action removeOpenPostsNotifications(userType="consumer"){
        let notList = userType==='consumer'? 'consumerNotifications': 'proNotifications';
        this[notList].open = [];

    }



    // later:
    // to check if a post has any notifications he can search in (postsNotificationsObj[postId]?) if true there is
    @observable postsNotificationsObj = {}
}
