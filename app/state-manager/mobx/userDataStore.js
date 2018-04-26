/**
 * most important store!
 * notes:
 * "post" = "job"
 **/

import {observable, action} from 'mobx'


export default class UserDataStore {
    //This object is the response from the database stragiht after authentication
    @observable userData = {};
    @observable userType = ''; //this is the the general user type, if he have a pro account he will always stay pro here
    @observable currentUserType = '';
    @observable sentApplies = [];


    //user and userData editing:
    @action setUserType(type: string) {
        this.userType = type;
        this.currentUserType = type
    }

    @action setCurrentUserType(type: string) {
        this.currentUserType = type
    }

    @action setUserData(data: Object) {
        this.userData = data;
    }

    @action logout() {
        this.userType = '';
        this.userData = {};
    }


    // focused Job
    @observable focusedJob = {};

    @action focusJob(job: Object) {
        this.focusedJob = job;
    }


    /// consumer open Job handling:

    @observable focusedConsumerJob = {}

    @action focusConsumerJob(job: Object) {
        this.focusedConsumerJob = job;
    }

    // Use only when you know the user have an open Job!
    @action findAndFocusConsumerJob() {
        let userPosts = this.userData.user.user_posts;
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].status === 'open') {
                this.focusConsumerJob(userPosts[i]);
            }
        }
    }


    // notification and upadating user handling:
    @action setSentApplies(sendApplies: Array){
        this.sentApplies =  sendApplies;
    }

    @action addApply(apply: Object){
        this.sentApplies.push(apply);
    }

    @action updateUser(data: Object) {
        this.userData.user = data;
    }

    @action addJob(job){
        this.userData.user.user_posts.push(job)
    }

    @action updatePost(post: Object) {
        let userPosts = this.userData.user.user_posts;
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].id === post.id) {
                this.userData.user.user_posts[i] = post;
            }
            if (post.status === 'open') {
                this.focusConsumerJob(post);
                this.focusJob(post)
            }
        }
    }
    @action addProPost(post: Object){
        this.userData.user.pro_posts.push(post)
    }

    // Choose pro process:
    @observable shownPro = {}

    @action showPro(pro: Object){
        this.shownPro = pro;
    }

}
