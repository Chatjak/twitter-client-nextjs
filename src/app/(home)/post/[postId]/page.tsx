import Comment from '@/components/Comments'
import { getCurrentUser, getValue } from '@/util/getFunction'
import React from 'react'

export default async function page() {
    const User = await getCurrentUser()
    const token = await getValue()
    return <>
        <Comment User={User} token={token} />
    </>
}
