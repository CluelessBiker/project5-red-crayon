/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';
import Article from './Article';
import styles from '../../styles/ArticlesPage.module.css';

/**
 * Display all articles.
 */
function ArticlesPage({ message, filter = '' }) {
  const [articles, setArticles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState('');

  /**
   * Retrieve articles from API
   * Display spinner until content has loaded.
   * Delay search filter from making API requests with each keystroke.
   */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axiosReq.get(
          `/articles/?${filter}search=${query}`,
        );
        setArticles(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);

    const timer = setTimeout(() => {
      fetchArticles();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

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
            placeholder="search articles"
            aria-label="search articles"
          />
        </Form>
      </div>

      {hasLoaded ? (
        <>
          {articles.results.length ? (
            <InfiniteScroll
              children={articles.results.map((article) => (
                <Article
                  key={article.id}
                  {...article}
                  setArticles={setArticles}
                />
              ))}
              dataLength={articles.results.length}
              loader={<Asset spinner />}
              hasMore={!!articles.next}
              next={() => fetchMoreData(articles, setArticles)}
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
  );
}

export default ArticlesPage;
