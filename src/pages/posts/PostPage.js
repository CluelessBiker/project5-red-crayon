import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CreateCommentForm from "../comments/CreateCommentForm";
import Comment from "../comments/Comment";
// import postStyles from "../../styles/PostPage.module.css";
import Post from "./Post";

/**
* Display single post details & post comments.
* Function code provided in Moments walkthrough.
*/
function PostPage() {

    const { id } = useParams();
    const [post, setPost] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    /**
    * Retrieve singular post data.
    * Retrieve comments associated to post.
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: post }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                    axiosReq.get(`/comments/?post=${id}`),
                ]);
                setPost({ results: [post] });
                setComments(comments);
            } catch (err) {
                console.log(err);
            }
        };
    
        handleMount();
    }, [id]);

    return (
        <Container>
            <Col>
                <Post {...post.results[0]} setPosts={setPost} postPage />
            </Col>

            <br />
            <Container>
                {currentUser ? (
                    <CreateCommentForm
                        profile_id={currentUser.profile_id}
                        profileImage={profile_image}
                        post={id}
                        setPost={setPost}
                        setComments={setComments}
                    />
                ) : comments.results.length ? (
                    "Comments"
                ) : null}
                {comments.results.length ? (
                    comments.results.map((comment) => (
                        <Comment key={comment.id} {...comment} />
                    ))
                ) : currentUser ? (
                    <span>No comments yet, be the first to comment!</span>
                ) : (
                    <span>No comments... yet</span>
                )}
            </Container>
        </Container>
    )
};

export default PostPage;