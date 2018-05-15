/**
 * notifications
 * notes:
 * not = notification
 * addNotification func should look like: ...addPostsNotification('open', postId, 'pro') - add not for open post of a pro
 * and remove: ...removePostNotifications('active', postId, 'consumer') - remove all 'postId' not's from the 'active' posts of a consumer
 **/
//config
import {fetcher} from "../../generalFunc/fetcher";
import {notificationsRoute} from "../../config/apiRoutes";
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
    // to check if a post has any notifications he can search in (postsNotificationsObj[postId]?) if true there is
    @observable postsNotificationsObj = {}

    //userType: pro/consumer, postType: open/active, postId: postId for now later will be the notification itself
    @action addPostsNotification(postType, postId, userType = 'consumer') {
        if (userType === 'pro') {
            this.proNotifications[postType].push(postId)
        }
        else {
            this.consumerNotifications[postType].push(postId)
        }
    }

    //removes all notifications regarding a specific post
    @action removePostNotifications(postType = 'active', postId, userType = 'consumer', token) {
        let notificationsSent = {}
        //pro notifications or consumer notifications
        let notList = userType === 'consumer' ? 'consumerNotifications' : 'proNotifications';
        console.log('in removePostNotifications current not listLength:', this[notList][postType].length, notList);
        for (let i = 0; i < this[notList][postType].length; i++) {
            if (this[notList][postType][i] === postId) {
                if (!notificationsSent[this[notList][postType][i]]) {
                    notificationsSent[this[notList][postType][i]] = true;
                    let sendBody = {
                        post_id: postId,
                        notification_type: userType + '_' + postType
                    };
                    fetcher(notificationsRoute, "POST", this.successCB, this.errCB, sendBody, {token: token})
                }
                this[notList][postType].splice(i, 1);
            }
        }
    }

    successCB(res) {
        console.log('success CB at notificationsStore', res);
    }

    errCB(err) {
        console.log('error CB at notificationsStore', err);
    }

    @action removeOpenPostsNotifications(userType = "consumer", token = 'no?', postId = "no?") {
        // let notList = userType === 'consumer' ? 'consumerNotifications' : 'proNotifications';
        if (userType === 'consumer') {
            if (this.consumerNotifications.open.length > 0) {
                this.consumerNotifications.open = [];
                //and fetch
                let sendBody = {
                    post_id: postId,
                    notification_type: 'consumer_open'
                };
                console.log('sendBody',sendBody);
                fetcher(notificationsRoute, "POST", this.successCB, this.errCB, sendBody, {token: token})
            }
        }
        else {
            this.proNotifications.open = []
        }
    }


    // later:

    @action setNotificationsFromLogin(notifications: Object) {
        this.consumerNotifications.open = notifications.consumer_open;
        this.consumerNotifications.active = notifications.consumer_active;
        this.proNotifications.active = notifications.pro_active

    }
}
