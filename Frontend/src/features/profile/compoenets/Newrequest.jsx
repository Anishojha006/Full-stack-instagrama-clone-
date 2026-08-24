import React from "react";

const Newrequest = ({ loading, requests }) => {
    console.log("Printing requests", requests);

    if (loading) {
        return (
            <main>
                <h1>Loading ...</h1>
            </main>
        );
    }

    return (
        <>
            {requests.map((request) => (
                <div className="request" key={request._id}>
                    <div className="img-wrapper">
                        <img
                            src={request.profileImage}
                          
                        />
                    </div>

                    <h1>{request.follower}</h1>

                    <div className="accept-reject-buttons">
                        <button className="button primary-button">
                            Reject
                        </button>

                        <button className="button secondary-button">
                            Accept
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Newrequest;