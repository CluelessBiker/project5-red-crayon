import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropdownMenu";
import { axiosRes } from "../../api/axiosDefaults";
import { Col, Container, Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Article.module.css"

/**
* Render the data of a single article.
*/
const Article = (props) => {

    const {
        id,
        owner,
        profile_id,
        profile_image,
        created_on,
        modified_on,
        title,
        content,
        image,
        category,
        articlePage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    /**
    * Route user to Article Edit page. 
    */
    const handleEdit = () => {
        history.push(`/articles/${id}/edit`);
    };

    /**
    * Delete article data from API. 
    */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/articles/${id}/`);
            history.goBack();
        } catch (err) {}
    };

    return (
        <Container className={styles.Container}>
            <br />
            <Media className={styles.TopRow}>
                <Link
                    to={`profiles/${profile_id}`}
                    className={styles.Username}
                >
                    <Avatar src={profile_image} height={30} />
                    <h2>by: { owner }</h2>
                    <p>{ created_on }</p>
                </Link>
                {is_owner && articlePage && (
                    <DropdownMenu
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>

            <Col className={styles.Content}>
                <Link to={`/articles/${id}`}>
                    <img src={image} alt={title} />
                </Link>
                <br />
                <br />
                <h2><strong>{ title }</strong></h2>
                <p>{ category }</p>
                <p>{ content }</p>
                <p>Last updated: { modified_on }</p>
            </Col>
            <br />
        </Container>
    );
};

export default Article;