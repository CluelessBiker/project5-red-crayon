import React from "react";
import { Card, Col, Container, Media, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
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
                    <Media className={styles.TopRow}>
                        <Link to={`/profiles/${profile_id}`}>
                            <Avatar src={profile_image} height={40} />
                            {owner}
                        </Link>
                        <Col>
                            <div>
                                {is_owner && postPage && "edit"}
                            </div>
                            <div>
                                {created_on}
                            </div>
                        </Col>
                    </Media>

                    <div>
                        <p>Drinking: {beverage}</p>
                        <p>Working with: {artistic_medium}</p>
                        <p>Listening to {song_name} by {artist_name} on {music_medium}</p>
                        <Card.Img src={image} alt={title} />
                        <p>{description}</p>
                        <p>Last modified: {modified_on}</p>
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
                            ><i className="far fa-heart" /></OverlayTrigger>
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
                            ><i className="far fa-heart" /></OverlayTrigger>
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