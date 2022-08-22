import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import styles from "../../styles/PostsPage.module.css";
import Post from "./Post";

/**
* Display all posts. 
*/
function PostsPage({ message, filter="" }) {

    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    const currentUser = useCurrentUser();

    /**
    * Fetch posts from API.
    * Return search results.
    */
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };

    }, [filter, query, pathname, currentUser]);

    return (
            <Container>
                <div className={styles.SearchForm}>
                    <Form
                        className={styles.SearchField}
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <Form.Control
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            type="text"
                            placeholder="search posts"
                        />
                    </Form>
                </div>

                {hasLoaded ? (
                <>
                    {posts.results.length ? (
                        <InfiniteScroll
                            children={posts.results.map((post) => (
                                <Post key={post.id} {...post} setPosts={setPosts} />
                            ))}
                            dataLength={posts.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!posts.next}
                            next={() => fetchMoreData(posts, setPosts)}
                        />
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