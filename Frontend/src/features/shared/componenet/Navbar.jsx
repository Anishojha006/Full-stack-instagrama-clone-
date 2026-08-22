import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className='navbar'>
      <div className="profile">
        <p>Insta</p>
        <div className="profile-details-features">
          <div className='profile-img-wrapper'>

          <img  src="https://ik.imagekit.io/workingwithimages/insta-clone/profile%20image.avif?updatedAt=1786933902071" />
          </div>
          <h3>{user.username}</h3>
          <button className='button primary-button'
          onClick={()=>{
            navigate("/profile");
          }}
          >Open Profile</button>
        </div>
      </div>
      <button
        onClick={
          () => {
            navigate('/create-post')
          }
        }
        className='button primary-button'>new post</button>
    </nav>
  )
}

export default Navbar