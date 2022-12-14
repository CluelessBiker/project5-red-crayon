/* eslint-disable */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Col, Container, Media } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { DropdownMenu } from '../../components/DropdownMenu';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Article.module.css';

/**
 * Render the data of a single article.
 */
function Article(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    created_on,
    modified_on,
    title,
    content,
    image,
    image_credit,
    category,
    articlePage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /**
   * Route user to Article Edit page.
   */
  const handleEdit = () => {
    history.push(`/articles/${id}/edit`);
  };

  /**
   * Delete article data from API.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/articles/${id}/`);
      history.goBack();
    } catch (err) {
    //   console.log(err);
    }
  };

  return (
    <Container className={styles.Container}>
      <br />
      <Media className={styles.TopRow}>
        <Link to={`profiles/${profile_id}`} className={styles.Username}>
          <Avatar src={profile_image} height={30} />
          <h2 className={styles.OnHover}>By: {owner}</h2>
          <p className={styles.OnHover}>{created_on}</p>
        </Link>
        {is_owner && articlePage && (
          <DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </Media>

      <Col className={styles.Content}>
        <Link to={`/articles/${id}`}>
          <img src={image} alt={title} />
        </Link>
        <br />
        <p>Image credit: {image_credit}</p>
        <br />
        <h2>
          <strong>{title}</strong>
        </h2>
        <p>In: {category}</p>
        <p>{content}</p>
        <p>Last updated: {modified_on}</p>
      </Col>
      <br />
    </Container>
  );
}

export default Article;
