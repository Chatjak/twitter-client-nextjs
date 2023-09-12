export interface post {
    content: string;
    createdAt: string;
    updatedAt: string;
    user_id: user
    _id: string
}

export interface user {
    _id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}
export interface userBlob {
    type: string;
    data: Buffer
}
export interface currentUser {
    userData: user;
    userProfile: userBlob;
}

export interface commentModel {
    _id: string,
    post_id: string,
    user_id: user
    content: string
    createdAt: string;
    updatedAt: string;
}
