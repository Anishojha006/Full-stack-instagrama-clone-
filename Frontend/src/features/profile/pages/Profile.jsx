import React, { useEffect } from "react";

import "../style/profile.scss";

import Followers from "../compoenets/Followers";
import Followings from "../compoenets/Followings";
import Userinfo from "../compoenets/Userinfo";
import Newrequest from "../compoenets/Newrequest";

import { useProfile } from "../hooks/useProfile.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import Navbar from "../../shared/componenet/Navbar.jsx";


const Profile = () => {

    const {
        profileImagefromusername,
        handleLoadProfile,
        loading,
        error,
        requests,
        followers,
        followings,
        handlerequestRejection,
        handleRequestAcceptance,
        handleFollow,
        handleUnfollow
    } = useProfile();


    const {
        user,
        loading: authLoading
    } = useAuth();


    useEffect(() => {
        handleLoadProfile();
    }, [handleLoadProfile]);


    if (authLoading) {

        return (
            <main className="page-loading">
                <span className="loading-spinner" aria-hidden="true" />
                <p>Loading your profile...</p>
            </main>
        );

    }


    if (!user) {

        return (
            <main className="page-loading">
                <h1>Please sign in to view your profile.</h1>
            </main>
        );

    }


    return (

        <main className="profile-page">
            <Navbar />
            {error && <p className="notice error-notice" role="alert">{error}</p>}
            <Userinfo user={user} followers={followers} followings={followings} />
            <div className="profile-lists">
                <Followers followers={followers} followings={followings} onFollow={handleFollow} />
                <Followings followings={followings} onUnfollow={handleUnfollow} />
            </div>
            <section className="request-parent">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">Your community</span>
                        <h2>Follow requests</h2>
                    </div>
                    <span className="feed-count">{requests.length} pending</span>
                </div>
                <div className="requests-container">
                    <Newrequest
                        handlerequestRejection={handlerequestRejection}
                        handleRequestAcceptance={handleRequestAcceptance}
                        profileImagefromusername={profileImagefromusername}
                        requests={requests}
                        loading={loading}
                    />
                </div>
            </section>
        </main>

    );

};


export default Profile;