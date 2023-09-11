export interface post {
    content: string;
    createdAt: string;
    updatedAt: string;
    user_id: string[];
    _id: string
}

export interface user {
    _id: string;
    email: string;
    username: string;
    createAt: string;
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