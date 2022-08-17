import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import DropdownMenu from "../../components/DropdownMenu";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// import styles from "../../styles/Comment.module.css";

/**
* Comment display.
* Functions provided by Moments walkthrough.
*/
const Comment = (props) => {

    const { profile_id, profile_image, owner, modified_on, content, id, setPost, setComments } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    /**
    * Delete comment from API.
    */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments.${id}`);
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count - 1,
                    },
                ],
            }));

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch (err) {}
    };

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

                {is_owner && (
                    <DropdownMenu
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </div>
    );
};

export default Comment;