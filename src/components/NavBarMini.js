import axios from 'axios';
import React from 'react';
import { Nav, DropdownButton } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/NavBarMini.module.css';
import navStyles from '../styles/NavBar.module.css';
import { removeTokenTimestamp } from '../utils/utils';
import Avatar from "./Avatar";

/**
* Navigation bar. 
*/
const NavBarMini = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    /**
    * Log user out from API.
    */
    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (err) {
            // console.log(err);
        }
    };
    
    const loggedInIcons = (
        <>
            <NavLink
                to="/favourites"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
            ><i className="fa-regular fa-bookmark"></i> Favourites</NavLink>

            <NavLink
                to="/posts/create"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
            ><i className="fa-solid fa-circle-plus"></i> Submit</NavLink>

            <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
                className={`${navStyles.NavLink} ${navStyles.ProfileAvatar}`}
            ><Avatar src={currentUser?.profile_image} text="Profile" height={35} /></NavLink>

            <NavLink
                to="/"
                className={navStyles.NavLink}
                onClick={handleSignOut}
            ><i className="fa-solid fa-right-from-bracket"></i> Logout</NavLink>
        </>
    );

    const loggedOutIcons = (
        <>
            <NavLink
                to="/login"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
            ><i className="fa-solid fa-right-to-bracket"></i> Login</NavLink>

            <NavLink
                to="/signup"
                className={navStyles.NavLink}
                activeClassName={navStyles.Active}
            ><i className="fa-solid fa-user-pen"></i> Sign up</NavLink>
        </>
    );

  return (
    <div>
        <div className="mb-2">
            {['down'].map((direction) => (
            <DropdownButton
                className={styles.Button}
                key={direction}
                id={`dropdown-button-drop-${direction}`}
                drop={direction}
                variant="secondary"
                title={<i className="fa-solid fa-bars" />}
            >
                <Nav className="mr-auto flex-column text-left">
                    <NavLink
                        exact
                        to="/"
                        className={navStyles.NavLink}
                        activeClassName={navStyles.Active}
                    ><i className="fa-solid fa-file-lines"></i> News</NavLink>

                    <NavLink
                        to="/posts"
                        className={navStyles.NavLink}
                        activeClassName={navStyles.Active}
                        ><i className="fa-solid fa-hashtag"></i> Explore</NavLink>

                    { currentUser ? loggedInIcons : loggedOutIcons }
                </Nav>

            </DropdownButton>
            ))}
        </div>
    </div>
  )
}

export default NavBarMini;