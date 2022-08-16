import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import postStyles from "../../styles/PostPage.module.css";

/**
* Display single post details & post comments.
*/
function PostPage() {

    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    /**
    * Retrieve singular post data.
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }] = await Promise.all([
                axiosReq.get(`/posts/${id}`),
                ]);
                setPost({ results: [post] });
                console.log(post);
            } catch (err) {
                console.log(err);
            }
        };
    
        handleMount();
    }, [id]);

    return (
        <Container>
            <Col>
                <h1>post</h1>
            </Col>
            <Col>
                <h1>comments</h1>
            </Col>
        </Container>
    )
};

export default PostPage;