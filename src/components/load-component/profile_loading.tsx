import React from 'react'

export default function ProfileLoading() {
    return  <div>
    <div className="h-[10rem] relative border w-full p-4 bg-slate-100 mb-24">
        <div className="absolute w-[180px] h-[180px] left-4 -bottom-[50%] bg-white  border-white border-8 rounded-full overflow-hidden bg-white'">
        </div>
        <label htmlFor="uploadUserProfile" className='absolute font-bold p-2 border-2 rounded-full -bottom-[36%] right-4 animate-pulse'>Edit Profile</label>
        <input type="file" name="uploadUserProfile" id="uploadUserProfile" hidden />
    </div>
    <div className="p-4">
        <h1 className='text-2xl font-bold animate-pulse w-8'></h1>
        <p className=' text-gray-400 font-light animate-pulse w-4'></p>
        <p className='mt-4 flex items-center font-light animate-pulse w-4'></p>
    </div>
    <div className="flex justify-between items-center animate-pulse">
        <a href={`/`} className='flex items-center justify-center w-1/2 hover:bg-gray-100 h-12 relative after:absolute after:border-b-4  after:border-sky-400 after:w-1/2 after:bottom-0 font-bold' >
            Posts
        </a>
        <a href={`/with_replies`} className='flex items-center justify-center w-1/2 hover:bg-gray-100 h-12'>Replies</a>
    </div>
</div>
}
