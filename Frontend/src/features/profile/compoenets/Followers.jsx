import React from 'react'

const Followers = () => {
  return (
    <div className='parent'>
  <h1>Follower List</h1>
    <div className="follwers">
             
            <div className="follower">
                <div className="img">
                    <img src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                </div>
                <h1>Jaswal 29602</h1>
                <button className='button primary-button' > Remove</button>
            </div>
             </div>
    </div>
  )
}

export default Followers