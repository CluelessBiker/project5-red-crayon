import React from "react";
import { Card, Container, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Post.module.css";

/**
* Display single post content.
*/
const Post = (props) => {

    const {
        id,
        owner,
        profile_id,
        profile_image,
        created_on,
        modified_on,
        title,
        description,
        image,
        music_medium,
        song_name,
        artist_name,
        beverage,
        artistic_medium,
        like_id,
        likes_count,
        comments_count,
        postPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Media>
                        <Link to={`/profiles/${profile_id}`}>
                            <Avatar src={profile_image} height={40} />
                            {owner}
                        </Link>
                    </Media>
                    <div>
                        {is_owner && postPage && "edit"}
                        <p>Posted on: {created_on}</p>
                        <p>Last modified on: {modified_on}</p>
                        <p>{description}</p>
                        <p>{music_medium}</p>
                        <p>{owner} was listening to {song_name} by {artist_name}</p>
                        <p>{beverage}</p>
                        <p>{artistic_medium}</p>
                        <Card.Img src={image} alt={title} />
                    </div>
                </Card.Body>

                {/* Code provided in Moments walkthrough. */}
                <Card.Body>
                    {/* {title && <Card.Title className="text-center">{title}</Card.Title>}
                    {description && <Card.Text>{description}</Card.Text>} */}
                    <div className={styles.PostBar}>
                        {is_owner ? (
                            <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Narcissist</Tooltip>}
                            >
                            <i className="far fa-heart" />
                            </OverlayTrigger>
                        ) : like_id ? (
                            <span onClick={() => {}}>
                                <i className={`fas fa-heart ${styles.Heart}`} />
                            </span>
                        ) : currentUser ? (
                            <span onClick={() => {}}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                            </span>
                        ) : (
                            <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Login to like!</Tooltip>}
                            >
                                <i className="far fa-heart" />
                            </OverlayTrigger>
                        )}
                        {likes_count}
                        <Link to={`/posts/${id}`}>
                            <i className="far fa-comments" />
                        </Link>
                        {comments_count}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
};

export default Post;