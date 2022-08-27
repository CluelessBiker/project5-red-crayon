/* eslint-disable */
import React, { useRef, useState } from 'react';
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Alert,
  Image,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/CreateArticleForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Buttons.module.css';
import Asset from '../../components/Asset';
import { useRedirect } from '../../hooks/useRedirect';

/**
 * Render CreateArticleForm.
 * Supply user with input fields to create an Article.
 */
function CreateArticleForm() {
  useRedirect('loggedOut');

  const [errors, setErrors] = useState({});

  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
    image: '',
    image_credit: '',
    category: '',
  });

  const {
    title, content, image, image_credit, category,
  } = articleData;

  const imageInput = useRef(null);
  const history = useHistory();

  /**
   * Populate ArticleData strings.
   */
  const handleChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Change uploaded image.
   * clear previously uploaded image.
   */
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setArticleData({
        ...articleData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /**
   * Pust data to API.
   * Direct user to article page.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', imageInput.current.files[0]);
    formData.append('image_credit', image_credit);
    formData.append('category', category);

    try {
      const { data } = await axiosReq.post('/articles/', formData);
      history.push(`/articles/${data.id}`);
      // console.log(formData);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container className={styles.FormAlignment}>
      <br />
      <h2><strong>Submit an article!</strong></h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            aria-label="title"
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="content"
            value={content}
            onChange={handleChange}
            aria-label="content"
          />
        </Form.Group>
        {errors?.content?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose..."
            name="category"
            onChange={handleChange}
            aria-label="category"
          >
            <option value="entertainment">Entertainment</option>
            <option value="events">Events</option>
            <option value="in_depth">In-depth</option>
            <option value="opinion">Opinion</option>
            <option value="news">News</option>
          </Form.Control>
        </Form.Group>
        {errors?.category?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group className="text-center">
          {image ? (
            <>
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label htmlFor="image-upload" className={btnStyles.Button}>
                  Change image
                </Form.Label>
              </div>
            </>
          ) : (
            <Form.Label
              className="d-flex justify-content-center"
              htmlFor="image-upload"
            >
              <Col>
                <span>
                  <i className="fa-solid fa-cloud-arrow-up" />
                </span>
                <Asset message="Upload image" />
              </Col>
            </Form.Label>
          )}

          <Form.File
            id="image-upload"
            accept="image/*"
            onChange={handleChangeImage}
            ref={imageInput}
            className="d-none"
          />
        </Form.Group>
        {errors?.image?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Image credit:</Form.Label>
          <Form.Control
            type="text"
            name="image_credit"
            value={image_credit}
            onChange={handleChange}
            aria-label="image credit"
          />
        </Form.Group>
        {errors?.image_credit?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}
        <br />
        <Row className={styles.RowSpacing}>
          <Button type="submit" className={btnStyles.Button}>
            Submit
          </Button>

          <Button onClick={() => history.goBack()} className={btnStyles.Button}>
            Cancel
          </Button>
        </Row>
        <br />
      </Form>
    </Container>
  );
}

export default CreateArticleForm;
