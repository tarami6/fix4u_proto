/**
 * most important store!
 * notes:
 * "post" = "job"
 **/

import {action, observable} from 'mobx'


export default class UserDataStore {
    //This object is the response from the database stragiht after authentication
    @observable userData = {};
    @observable userType = ''; //this is the the general user type, if he have a pro account he will always stay pro here
    @observable currentUserType = '';
    @observable sentApplies = [];
    // focused Job, the job the user is currently viewing
    @observable focusedJob = {};
    @observable focusedConsumerJob = {}
    // Choose pro process:
    @observable shownPro = {};
//    location handler:
    @observable userLocation = {
        currentAddress: '',
        lat: 0,
        lon: 0
    };
    // Loading - in case we want to display loading screen to the user
    @observable loading = false;
    //change:
    @observable newNotification = false;


    /// consumer open Job handling:

    //user and userData editing:
    @action setUserType(type: string) {
        this.userType = type;
        this.currentUserType = type
    }

    @action setCurrentUserType(type: string) {
        this.currentUserType = type
    }

    @action setUserData(data: Object) {
        if (!this.userData.user && data.user.pro_applies) {
            this.setSentApplies(data.user.pro_applies);
        }
        this.userData = data;
    }

    @action logout() {
        this.userType = '';
        this.userData.token = '';
    }

    // notification and upadating user handling:

    @action focusJob(job: Object) {
        this.focusedJob = job;
    }

    @action focusConsumerJob(job: Object) {
        this.focusedConsumerJob = job;
    }

    // Use only when you know the user have an open Job!
    @action findAndFocusConsumerJob() {
        let userPosts = this.userData.user.user_open_posts;
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].status === 'open') {
                this.focusConsumerJob(userPosts[i]);
            }
        }
    }

    //applies handling:
    @action setSentApplies(sendApplies: Array) {
        this.sentApplies = sendApplies;
    }

    @action addApply(apply: Object) {
        this.sentApplies.push(apply);
    }

    //user update
    @action updateUser(data: Object) {
        this.userData.user = data;
    }

    //when a consumer added a job:
    @action addJob(job) {
        this.userData.user.user_open_posts.push(job);
    }

    @action updateOpenPost(post: Object) {
        let openPosts = this.userData.user.user_open_posts;
        for (let i = 0; i < openPosts.length; i++) {
            if (post.id === openPosts[i].id) {
                this.userData.user.user_open_posts[i] = post;
            }
        }
        this.focusConsumerJob(post);
    }

    @action updateActivePost(post: Object) {
        let activePosts = this.userData.user.user_active_posts;
        for (let i = 0; i < activePosts.length; i++) {
            if (post.id === activePosts[i].id) {
                this.userData.user.user_active_posts[i] = post;
            }
        }
    }

    //when a consumer chooses a pro
    @action openToActivePost(post: Object) {
        this.removeOpenPost(post.id);
        this.userData.user.user_active_posts.push(post);
    }

    @action removeOpenPost(postId) {
        // this.userData.user.user_open_posts = [];
        this.userData.user.user_open_posts = this.userData.user.user_open_posts.filter(post => post.id !== postId);
        // let openPosts = this.userData.user.user_open_posts;
        // console.warn(postId);
        // for (let i = 0; i < openPosts.length; i++) {
        //     if (openPosts[i].id === postId) {
        //         this.userData.user.user_open_posts[i].splice(i, 1)
        //     }
        // }
    }

    //this is update for the user consumer post
    @action updatePost(post: Object) {
        let userPosts = this.userData.user.user_active_posts;
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].id === post.id) {
                this.userData.user.user_active_posts[i] = post;
            }
            //not sure about that yet, after recheck
            if (post.status === 'open') {
                this.focusConsumerJob(post);
                this.focusJob(post)
            }
        }
    }

    @action updatePostStatus(postId: string, status: string) {
        let userPosts = this.userData.user.user_active_posts;
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].id === postId) {
                this.userData.user.user_active_posts[i].status = status;
                this.focusJob(this.userData.user.user_active_posts[i]);
            }
        }
    }

    @action updateProPost(post: Object) {
        let userPosts = this.userData.user.pro_posts;
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].id === post.id) {
                this.userData.user.pro_posts[i] = post;
                //if the pro is currently focusing this job then:
                // if (this.focusedJob.id === post.id) {
                //     this.focusJob(post);
                // }
            }
        }
    }

    @action addProPost(post: Object) {
        this.userData.user.pro_posts.push(post)
    }

    @action showPro(pro: Object) {
        this.shownPro = pro;
    }

    @action saveUserLocation(location: Object) {
        this.userLocation = location
    }

    @action setLoading(bol: boolean) {
        this.loading = bol
    }

    @action setNewNotification(bol: boolean) {
        this.newNotification = bol;
    }

}
