import React from "react";
import { Card, Col, Container, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DropdownMenu } from "../../components/DropdownMenu";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Post.module.css";

/**
* Display single post content.
* Function code provided by Moments walkthrough.
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
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    /** 
    * Route user to Edit page.
    */
    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    /** 
    * Delete selected post from API
    */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    /** 
    * Return like count from API.
    * Increment count by 1.
    */
    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                    ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                    : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    /** 
    * Return like count from API.
    * Decrement count by 1.
    */
    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                    ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                    : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

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
                                {is_owner && postPage && (
                                    <DropdownMenu
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                    />
                                )}
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
                        <Link to={`/posts/${id}`}>
                            <Card.Img src={image} alt={title} />
                        </Link>
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
                            <span onClick={handleUnlike}>
                                <i className={`fas fa-heart ${styles.Heart}`} />
                            </span>
                        ) : currentUser ? (
                            <span onClick={handleLike}>
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
                            <i className="fa-solid fa-comment" />
                        </Link>
                        {comments_count}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
};

export default Post;