import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Col } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import Article from './Article';

/**
 * Display single article details.
 */
function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState({ results: [] });

  /**
   * Retrieve article data from API.
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: article }] = await Promise.all([
          axiosReq.get(`/articles/${id}`),
        ]);
        setArticle({ results: [article] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Col>
        <Article {...article.results[0]} setArticle={setArticle} articlePage />
      </Col>
    </Container>
  );
}

export default ArticlePage;
