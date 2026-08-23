import React from 'react'

const Userinfo = () => {
  return (
   <div className='user-info'>
    <div className="img-name">
        <div className="img">
            <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww" alt="" />
        </div>
        <h1>Anish Ojha</h1>
    </div>
    <div className="details">
        <h3>Email : <span>Dummy@dummygmail.com</span>an </h3>
        <div className="follower-following-number">
            <h3>Followers : <span>15</span></h3>
              <h3>Followings : <span>15</span></h3>
        </div>
    </div>
   </div>
  )
}

export default Userinfo