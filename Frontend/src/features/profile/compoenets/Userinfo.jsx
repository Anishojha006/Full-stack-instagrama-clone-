import React from "react";


const Userinfo = ({ user }) => {


    if (!user) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }


    return (

        <div className="user-info">

            <div className="img-name">

                <div className="img">

                    <img
                        src={user.profileImage}
                        alt={`${user.username} profile`}
                    />

                </div>


                <h1>
                    {user.username}
                </h1>

            </div>


            <div className="details">

                <h3>
                    Email :
                    <span>{user.email}</span>
                </h3>


                <div className="follower-following-number">

                    <h3>
                        Followers :
                        <span>15</span>
                    </h3>


                    <h3>
                        Followings :
                        <span>15</span>
                    </h3>

                </div>

            </div>

        </div>

    );

};


export default Userinfo;