import React, { useState } from 'react';
import { Container, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { DropdownMenu } from '../../components/DropdownMenu';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import EditCommentForm from './EditCommentForm';
import styles from '../../styles/Comment.module.css';

/**
 * Comment display.
 * Functions provided by Moments walkthrough.
 */
const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    modified_on,
    content,
    id,
    setPost,
    setComments,
  } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  /**
   * Delete comment from API.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
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
    } catch (err) {
    //   console.log(err);
    }
  };

  return (
    <>
      <Container className={styles.CommentBox}>
        <hr />
        <br />
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>

          <Media.Body>
            <p>
              <strong>{owner}</strong>
              <br />
              {modified_on}
            </p>
            {showEditForm ? (
              <EditCommentForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p>{content}</p>
            )}
          </Media.Body>

          {is_owner && (
            <DropdownMenu
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </Media>
      </Container>
    </>
  );
};

export default Comment;
