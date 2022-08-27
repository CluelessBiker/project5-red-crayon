/* eslint-disable */
import React from 'react';
import {
  Card,
  Container,
  Media,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { DropdownMenu } from '../../components/DropdownMenu';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Post.module.css';

/**
 * Display single post content.
 * Function code provided by Moments walkthrough.
 */
function Post(props) {
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
      // console.log(err);
    }
  };

  /**
   * Return like count from API.
   * Increment count by 1.
   */
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
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
      // console.log(err);
    }
  };

  return (
    <Container className={styles.Container}>
      <br />
      <Media className={styles.TopRow}>
        <Link to={`/profiles/${profile_id}`} className={styles.Username}>
          <Avatar src={profile_image} height={50} />
          <h2>{owner}</h2>
          <p>{created_on} </p>
        </Link>

        {is_owner && postPage && (
          <DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </Media>

      <div>
        <p>
          I&apos;m currently drinking {beverage}, working with {artistic_medium}, and
          listening to &quot;{song_name}&quot; by &quot;{artist_name}&quot; on {music_medium}.
        </p>
        <p>{description}</p>
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <br />
        <br />
        <h2>{title}</h2>
        <p>Last modified: {modified_on}</p>
      </div>

      {/* Code provided in Moments walkthrough. */}
      <div className={styles.PostBar}>
        <Row>
          <p>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Narcissist</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
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
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            )}
            {' '}
            {likes_count}
          </p>

          <Link to={`/posts/${id}`}>
            <p>
              <i className={`fa-solid fa-comment ${styles.CommentBubble}`} />
              {' '}
              {comments_count}
            </p>
          </Link>
        </Row>
      </div>
    </Container>
  );
}

export default Post;
