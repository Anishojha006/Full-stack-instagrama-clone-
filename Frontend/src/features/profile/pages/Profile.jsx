import React from 'react'
import '../style/profile.scss'
import Followers from '../compoenets/Followers'
import Followings from '../compoenets/Followings'
import Userinfo from '../compoenets/Userinfo'
const Profile = () => {
    return (
        <>
           <Userinfo/>
        <div className="follower-following-list">
            <Followers />
            <Followings/>
            <div className="others"></div>
        </div>
        </>
    )
}

export default Profile