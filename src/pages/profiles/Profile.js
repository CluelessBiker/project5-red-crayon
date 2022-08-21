import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
// import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Buttons.module.css";

/** 
* Display profile avatar & un/follow button.
*/
const Profile = (props) => {

    const { profile, imageSize = 35 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div className={`my-3 d-flex align-items-center`}>
            <div>
                <Link className={`align-self-center`} to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>

            <div className={`mx-2`}>
                <strong>{ owner }</strong>
            </div>

            <div className={`text-right ml-auto`}>
                {currentUser && !is_owner && (following_id ? (
                    <Button
                        className={btnStyles.Button}
                        onClick={() => handleUnfollow(profile)}
                    >unfollow</Button>
                ) : (
                    <Button
                        className={btnStyles.Button}
                        onClick={() => handleFollow(profile)}
                    >follow</Button>
                ))}
            </div>
            
        </div>
    )
};

export default Profile;