import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
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
        <div className={`my-4 d-flex`}>
            <div>
                <Link to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>

            <div>
                <p><strong>{ owner }</strong></p>
            </div>

            <div className={`ml-auto`}>
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