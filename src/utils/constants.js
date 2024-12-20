export const getBaseUrl = (isSocket) => {
    if (location.hostname === 'localhost') {
        return 'http://localhost:3001'
    } else if (isSocket) {
        return 'wss://social-media-server-side-one.vercel.app'
    } else {
        return 'https://social-media-server-side-one.vercel.app'
    }
}

export const loginPost = "/api/login"
export const signupPost = "/api/signup"
export const addProfilePic = "/api/add-profilepic"
export const verifyEmail = "/api/verify-email"
export const forgotPassword = "/api/forgot-password"
export const resetPassword = "/api/reset-password"
export const addPost = "/api/add-post"
export const getPosts = "/api/followings-posts"
export const deletePost = "/api/delete-post"
export const updatePost = "/api/update-post"
export const reportPost = "/api/report-post"
export const editProfile = "/api/edit-profile"
export const suggessions = "/api/suggessions"
export const profileUser = "/api/get-user"
export const allUsers = "/api/all-users"
export const addFollow = "/api/add-friend"
export const removeFollow = "/api/un-follow"
export const getFrieds = "/api/getFriends"
export const unfollow = "/api/un-follow"
export const unFriend = "/api/remove-follower"
export const getMyPosts = "/api/get-mypost"
export const notification = "/api/all-notifications"
export const conversations = "/api/chats"
export const googleLogin = "/api/google-login"
