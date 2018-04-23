/// app routes

export const mainRoute = 'http://bang-israel-dev.eu-central-1.elasticbeanstalk.com';
export const loginRoute = 'api/rest-auth/login/';
export const phoneVerifyRoute = 'api/sms/verify/check/';
export const getOpenPostsRoute = 'api/posts/pro/open/';
export const checkForOpenPost = 'api/posts/open/';

/** Need post id and returns the route string**/
export const applyForJobRoute = (postId) => {return (`api/posts/${postId}/apply/`)}