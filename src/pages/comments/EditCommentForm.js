import React, { useState } from "react";
import { Card, Container, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import styles from "../../styles/CreateCommentForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";

function EditCommentForm(props) {

    const { id, content, setShowEditForm, setComments } = props;
    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim()
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            modified_on: "now",
                        }
                        : comment;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Card className={styles.CommentBox}>
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
                        >cancel</button>

                        <button
                            className={btnStyles.Button}
                            disabled={!content.trim()}
                            type="submit"
                        >post</button>
                    </Form.Group>
                </Form>
            </Card>
        </Container>
    )
};

export default EditCommentForm;