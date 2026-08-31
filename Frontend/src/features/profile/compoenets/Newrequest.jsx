import React, { useEffect, useState } from "react";

const Newrequest = ({
    loading,
    requests,
    profileImagefromusername
}) => {

    const [profileImages, setProfileImages] = useState({});


    useEffect(() => {

        const getProfileImages = async () => {

            try {

                const imageData = await Promise.all(
                    requests.map(async (request) => {

                        const imageUrl =
                            await profileImagefromusername(
                                request.follower
                            );

                        return {
                            username: request.follower,
                            imageUrl: imageUrl
                        };
                    })
                );


                const images = {};

                imageData.forEach((item) => {

                    images[item.username] = item.imageUrl;

                });


                setProfileImages(images);

            } catch (err) {

                console.log(err.message);

            }

        };


        if (requests && requests.length > 0) {
            getProfileImages();
        }

    }, [requests, profileImagefromusername]);


   


    if (!requests || requests.length === 0) {

        return (
            <main>
                <h1>No new requests</h1>
            </main>
        );

    }


    return (
        <>
            {requests.map((request) => (

                <div
                    className="request"
                    key={request._id}
                >

                    <div className="img-wrapper">

                        <img
                            src={profileImages[request.follower]}
                            alt={`${request.follower} profile`}
                        />

                    </div>


                    <h1>
                        {request.follower}
                    </h1>


                    <div className="accept-reject-buttons">

                        <button
                            className="button primary-button"
                        >
                            Reject
                        </button>

                        <button
                            className="button secondary-button"
                        >
                            Accept
                        </button>

                    </div>

                </div>

            ))}
        </>
    );
};

export default Newrequest;