import React, { useEffect } from 'react'
const Userinfo =  ({handlegetme,user}) => {
   
    const handlegetmefunction = async ()=>{
        const data = await handlegetme();
        console.log("user is"+data)
        return data;
    }

  return (
   <div className='user-info'>
    <div className="img-name">
        <div className="img">
            <img src={user.profileImage} />
        </div>
        <h1>{user.username}</h1>
    </div>
    <div className="details">
        <h3>Email : <span>{user.email}</span>an </h3>
        <div className="follower-following-number">
            <h3>Followers : <span>15</span></h3>
              <h3>Followings : <span>15</span></h3>
        </div>
    </div>
   </div>
  )
}

export default Userinfo