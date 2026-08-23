import React from 'react'
import '../style/profile.scss'
import Followers from '../compoenets/Followers'
import Followings from '../compoenets/Followings'
const Profile = () => {
    return (
        <div className="follower-following-list">

            <Followers />
            <Followings/>
            <div className="others"></div>
        </div>
    )
}

export default Profile