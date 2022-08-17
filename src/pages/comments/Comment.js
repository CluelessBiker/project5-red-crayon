import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
// import styles from "../../styles/Comment.module.css";

/**
* Comment display.
*/
const Comment = (props) => {

    const { profile_id, profile_image, owner, modified_on, content } = props;

    return (
        <div>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>

                <Media.Body>
                    <span>{ owner }</span>
                    <span>{ modified_on }</span>
                    <p>{ content }</p>
                </Media.Body>
            </Media>
        </div>
    );
};

export default Comment;