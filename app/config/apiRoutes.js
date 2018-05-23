/// app routes

// main route
// '-clone'
export const mainRoute = 'http://bang-israel-dev.eu-central-1.elasticbeanstalk.com';

//////////////////// generalAuth /////////////////

//loginroute:
export const loginRoute = 'api/rest-auth/login/';
/**send phone input route:**/
export const phoneInputRoute = 'api/sms/verify/';
//phone verify route:
export const phoneVerifyRoute = 'api/sms/verify/check/';
//consumer first registration step:
export const consumerRegistrationRoute = 'api/rest-auth/registration/'

//logout delete token from server
export const logOutRoute = 'api/rest-auth/user/';
//Pro registration route: 'POST':
export const proRegistrationRoute = 'api/rest-auth/registration/pro/';


export const editUserRoute = 'api/rest-auth/user/';

////// consumer Posts handling:

export const getProReviewsRoute = (proId) => {return (`api/pros_reviews/${proId}/`)};

//route for consumer to get his open posts(tho he gets in in auth)
export const checkForOpenPost = 'api/posts/open/';

/**
 * Edit post consumer:
 * need postId
 */
export const editPostConsumerRoute =  (postId) => {return(`api/posts/${postId}/`)};

export const chooseApplyRoute = (postId) => {return(`api/posts/${postId}/`)};
//for consumer sending reviews
export const sendReviewRoute =  (postId) => {return(`api/posts/${postId}/review/`)};
// Add Job route: 'POST'
export const addJobRoute = 'api/posts/';
//get pros list:
export const prosListRoute = (postId) => {return(`api/related_pros?post_id=${postId}`)};

//end consumer posts handling

/////// Pro Posts Handling

//routes to get open consumer posts for the pro
export const getOpenPostsRoute = 'api/posts/open/pro/';


// get all my sent applies:
export const getAppliesRoute = 'api/posts/open/pro/applied/';

/** Need post id and returns the route string**/
export const applyForJobRoute = (postId) => {return (`api/posts/${postId}/apply/`)};
//pro start job
export const startJobRoute = (postId) => {return(`api/posts/pro/${postId}/`)};

//end pro posts handling

//payments:
export const braintreeGetTokenRoute = 'api/payment/token/';

//send amount , nonce
export const braintreeSendTokenRoute = (postId) => {return( `api/posts/${postId}/payment/`)}



//Notifications Route:
export const notificationsRoute = 'api/notifications/';