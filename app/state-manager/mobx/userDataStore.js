import {observable, action} from 'mobx'


export default class UserDataStore {
    //This object is the response from the database stragiht after authentication
    @observable userData = {};
    @observable userType = '';


    @action setUserType(type: string) {
        this.userType = type;
    }

    @action setUserData(data: Object) {
        this.userData = data;
    }

    @action logout() {
        this.userType = '';
        this.userData = {};
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


    // notification handling:
    @action updatePost(post) {
        let userPosts = this.userData.user.user_posts;
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].id === post.id){
                this.userData.user.user_posts[i] = post;
            }
            if(post.status === 'open'){
                this.focusConsumerJob(userPosts[i]);
            }
        }
    }
}
//AUTH: