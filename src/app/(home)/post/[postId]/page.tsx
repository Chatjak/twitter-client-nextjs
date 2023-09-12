import Comment from '@/components/Comment'
import CreateComment from '@/components/CreateComment'
import { getComments, getCurrentUser, getValue } from '@/util/getFunction'
import React from 'react'
import { commentModel } from '../../../../type';

export default async function page({ params }: { params: { postId: string } }) {
    const User = await getCurrentUser()
    const token = await getValue()
    const comments = await getComments(params.postId)
    return <>
        {token && <CreateComment User={User} token={token} params={params} />}
        {comments.map((comment: commentModel) => <Comment key={comment._id} id={comment._id} comment={comment} />)}
    </>
}
