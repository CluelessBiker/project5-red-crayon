import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import styles from '../../styles/CreateCommentForm.module.css';
import btnStyles from '../../styles/Buttons.module.css';

function EditCommentForm(props) {
  const {
    id, content, setShowEditForm, setComments,
  } = props;
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  /**
   * Update comment content data.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
              ...comment,
              content: formContent.trim(),
              modified_on: 'now',
            }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Container className={styles.CommentBox}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder="comment"
            as="textarea"
            value={formContent}
            onChange={handleChange}
            rows={2}
          />

          <br />
          <button
            className={btnStyles.Button}
            onClick={() => setShowEditForm(false)}
            type="button"
          >
            cancel
          </button>

          <button
            className={btnStyles.Button}
            disabled={!content.trim()}
            type="submit"
          >
            post
          </button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default EditCommentForm;
