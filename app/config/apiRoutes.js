/// app routes

export const mainRoute = 'http://bang-israel-dev.eu-central-1.elasticbeanstalk.com';
export const loginRoute = 'api/rest-auth/login/';
export const phoneVerifyRoute = 'api/sms/verify/check/';
export const getOpenPostsRoute = 'api/posts/pro/open/';
export const checkForOpenPost = 'api/posts/open/';

export const editUserRoute = 'api/rest-auth/user/';
// get all my sent applies:
export const getAppliesRoute = 'api/posts/pro/open/applied/';
/** Need post id and returns the route string**/
export const applyForJobRoute = (postId) => {return (`api/posts/${postId}/apply/`)};
export const chooseApplyRoute = (postId) => {return(`api/posts/${postId}/`)};
//pro start job
export const startJobRoute = (postId) => {return(`api/posts/pro/${postId}/`)};


//logout delete token from server
export const logOutRoute = editUserRoute;