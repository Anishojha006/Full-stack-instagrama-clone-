import React, { use, useEffect } from "react";

import "../style/profile.scss";

import Followers from "../compoenets/Followers";
import Followings from "../compoenets/Followings";
import Userinfo from "../compoenets/Userinfo";
import Newrequest from "../compoenets/Newrequest";
import { useProfile } from "../hooks/useProfile.js";
import { useAuth } from "../../auth/hooks/useAuth.js";

const Profile = () => {
    const {
        handleNewRequest,
        loading,
        requests
    } = useProfile();

    const {   user,handlegetme } = useAuth();

    useEffect(() => {
        handleNewRequest();
    }, []);

    return (
        <>
            <Userinfo handlegetme={handlegetme} user={user} />

            <div className="follower-following-list">
                <Followers />
                <Followings />
            </div>
            <div className="request-parent">
                <h1>New follow request</h1>
                <div className="requests-conatiner">
                    <Newrequest
                    profileImagefromusername={profileImagefromusername}
                        
                        requests={requests}
                    />
                </div>

            </div>

            <div className="others"></div>
        </>
    );
};

export default Profile;