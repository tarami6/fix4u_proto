/// app routes

// main route
export const mainRoute = 'http://bang-israel-dev.eu-central-1.elasticbeanstalk.com';

//generalAuth
export const loginRoute = 'api/rest-auth/login/';
export const phoneVerifyRoute = 'api/sms/verify/check/';

//routes to get open consumer posts for the pro
export const getOpenPostsRoute = 'api/posts/open/pro/';
//route for consumer to get his open posts(tho he gets in in auth)
export const checkForOpenPost = 'api/posts/open/';

export const editUserRoute = 'api/rest-auth/user/';
// get all my sent applies:
export const getAppliesRoute = 'api/posts/open/pro/applied/';
/** Need post id and returns the route string**/
export const applyForJobRoute = (postId) => {return (`api/posts/${postId}/apply/`)};
export const chooseApplyRoute = (postId) => {return(`api/posts/${postId}/`)};
//pro start job
export const startJobRoute = (postId) => {return(`api/posts/pro/${postId}/`)};
//consumer send review:
export const sendReviewRoute =  (postId) => {return(`api/posts/${postId}/review/`)};

//logout delete token from server
export const logOutRoute = editUserRoute;

//payments:

export const braintreeGetTokenRoute = 'api/payment/token/';
//send amount , nonce
export const braintreeSendTokenRoute = (postId) => {return( `api/posts/${postId}/payment/`)}