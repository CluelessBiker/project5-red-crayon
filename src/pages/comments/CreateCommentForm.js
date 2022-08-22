import React, { useState } from "react";
import { Card, Container, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import styles from "../../styles/CreateCommentForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";

function CreateCommentForm(props) {

    const { post, setPost, setComments, profileImage, profile_id } = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/comments/", {
                content,
                post,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setPost((prevPost) => ({
                results: [
                {
                    ...prevPost.results[0],
                    comments_count: prevPost.results[0].comments_count + 1,
                },
                ],
            }));
            setContent("");
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Container className={styles.CommentBox}>
            {/* <Card className={styles.CommentBox}> */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <InputGroup>
                            <Link to={`/profiles/${profile_id}`}>
                                <Avatar src={profileImage} />
                            </Link>
                        </InputGroup>
                        
                        <br />
                        <Form.Control
                            placeholder="comment"
                            as="textarea"
                            value={content}
                            onChange={handleChange}
                            rows={2}
                        />

                        <br />
                        <button
                            className={btnStyles.Button}
                            disabled={!content.trim()}
                            type="submit"
                        >Post</button>
                    </Form.Group>
                </Form>
            {/* </Card> */}
        </Container>
    )
};

export default CreateCommentForm;