import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
// import styles from "../../styles/PostsPage.module.css";
import Post from "./Post";

/**
* Display all posts. 
*/
function PostsPage({ message, filter="" }) {

    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        fetchPosts();
    }, [filter, pathname]);

    return (
            <Container>
                {hasLoaded ? (
                <>
                    {posts.results.length ? (
                        posts.results.map((post) => (
                            <Post key={post.id} {...post} setPosts={setPosts} />
                        ))
                    ) : (
                    <Container>
                        <Asset message={message} />
                    </Container>
                    )}
                </>
                ) : (
                    <Container>
                        <Asset spinner />
                    </Container>
                )}
            </Container>
    )
};

export default PostsPage;