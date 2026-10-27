import React, { useEffect, useState } from "react";

const Newrequest = ({
    loading,
    requests,
    profileImagefromusername,
    handlerequestRejection,
    handleRequestAcceptance
}) => {
    const [profileImages, setProfileImages] = useState({});
    const [activeRequest, setActiveRequest] = useState('');
    const [error, setError] = useState('');

    const respondToRequest = async (requestId, action) => {
        setActiveRequest(requestId);
        setError('');
        try {
            if (action === 'accept') {
                await handleRequestAcceptance(requestId);
            } else {
                await handlerequestRejection(requestId);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Could not update this follow request.');
        } finally {
            setActiveRequest('');
        }
    };

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

            } catch {
                setError('Could not load profile images for pending requests.');
            }

        };


        if (requests && requests.length > 0) {
            getProfileImages();
        }

    }, [requests, profileImagefromusername]);





    if (loading && requests.length === 0) {
        return <p className="list-empty">Loading follow requests...</p>;
    }

    if (!requests || requests.length === 0) {

        return (
            <p className="list-empty">You’re all caught up. New follow requests will appear here.</p>
        );

    }


    return (
        <>
            {error && <p className="notice error-notice" role="alert">{error}</p>}
            {requests.map((request) => (

                <div
                    className="request"
                    key={request._id}
                >

                    <div className="img-wrapper">
                        {profileImages[request.follower]
                            ? <img src={profileImages[request.follower]} alt={`${request.follower} profile`} />
                            : <span className="avatar-fallback">{request.follower?.charAt(0)?.toUpperCase() || '?'}</span>}
                    </div>


                    <h3>
                        {request.follower}
                    </h3>


                    <div className="accept-reject-buttons">

                        <button
                            className="button secondary-button"
                            disabled={activeRequest === request._id}
                            onClick={() => respondToRequest(request._id, 'reject')}
                        >
                            Reject
                        </button>

                        <button
                            className="button primary-button"
                            disabled={activeRequest === request._id}
                            onClick={() => respondToRequest(request._id, 'accept')}
                        >
                            {activeRequest === request._id ? 'Saving...' : 'Accept'}
                        </button>

                    </div>

                </div>

            ))}
        </>
    );
};

export default Newrequest;