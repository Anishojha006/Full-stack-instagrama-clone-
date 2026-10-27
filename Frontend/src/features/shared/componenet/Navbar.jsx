import React, { useState } from "react";
import "../nav.scss";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";


const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [logoutError, setLogoutError] = useState('');

    const {
        user,
        loading,
        handlelogout
    } = useAuth();

    const handleSignOut = async () => {
        setLogoutError('');
        try {
            await handlelogout();
            navigate('/login', { replace: true });
        } catch (error) {
            setLogoutError(error.response?.data?.message || 'Could not sign out. Please try again.');
        }
    };

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
            <Link className="brand-mark" to="/" aria-label="InstaGram home">
                moment<span>.</span>
            </Link>

            <div className="nav-links">
                <Link className={location.pathname === '/' ? 'active' : ''} to="/">Discover</Link>
                <Link className={location.pathname === '/profile' ? 'active' : ''} to="/profile">My profile</Link>
            </div>

            <div className="nav-actions">
                {logoutError && <span className="nav-error" role="alert">{logoutError}</span>}
                <button className="button primary-button new-post-button" onClick={() => navigate('/create-post')}>
                    <span aria-hidden="true">＋</span> Create post
                </button>
                <button className="nav-user" onClick={() => navigate('/profile')} aria-label={`Open ${user.username}'s profile`}>
                    <span className="nav-avatar">
                        {user.profileImage
                            ? <img src={user.profileImage} alt="" />
                            : <span className="avatar-fallback">{user.username?.charAt(0)?.toUpperCase() || '?'}</span>}
                    </span>
                    <span>{user.username}</span>
                </button>
                <button className="nav-signout" onClick={handleSignOut}>Sign out</button>
            </div>
        </nav>

    );

};


export default Navbar;