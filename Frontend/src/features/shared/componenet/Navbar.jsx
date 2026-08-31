import React from "react";
import "../nav.scss";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";


const Navbar = () => {

    const navigate = useNavigate();

    const {
        user,
        loading
    } = useAuth();


    if (loading) {

        return (
            <nav className="navbar">
                <p>Loading...</p>
            </nav>
        );

    }


    if (!user) {
        return null;
    }


    return (

        <nav className="navbar">

            <div className="profile">

                <p>Insta</p>


                <div className="profile-details-features">

                    <div className="profile-img-wrapper">

                        <img
                            src={user.profileImage}
                            alt="profile"
                        />

                    </div>


                    <h3>
                        {user.username}
                    </h3>


                    <button
                        className="button primary-button"
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        Open Profile
                    </button>

                </div>

            </div>


            <button
                onClick={() => {
                    navigate("/create-post");
                }}
                className="button primary-button"
            >
                New Post
            </button>

        </nav>

    );

};


export default Navbar;