/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import CreateCommentForm from '../comments/CreateCommentForm';
import Comment from '../comments/Comment';
import styles from '../../styles/PostPage.module.css';
import Post from './Post';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';

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
        // console.log(err);
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

      <div>
        {currentUser ? (
          <CreateCommentForm
            profile_id={currentUser.profile_id}
            profileImage={profile_image}
            post={id}
            setPost={setPost}
            setComments={setComments}
          />
        ) : comments.results.length ? (
          'Comments'
        ) : null}

        <div className={styles.CommentsBox}>
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </div>
      </div>
    </Container>
  );
}

export default PostPage;
