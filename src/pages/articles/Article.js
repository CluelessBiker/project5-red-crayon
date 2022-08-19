import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropdownMenu";
import { axiosRes } from "../../api/axiosDefaults";
import { Card, Col, Container, Media } from "react-bootstrap";
import Avatar from "../../components/Avatar";

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
        articlePage,
        // setArticle,
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
        <Container>
            <Card>
                <Media>
                    <Link to={`profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={40} />
                        { owner }
                    </Link>

                    <Col>
                        <div>
                            {is_owner && articlePage && (
                                <DropdownMenu
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                            )}
                        </div>
                        <div>
                            { created_on }
                        </div>
                    </Col>
                </Media>

                <Col>
                    <h2>{ title }</h2>
                    <Link to={`/articles/${id}`}>
                        <Card.Img src={image} alt={title} />
                    </Link>
                    <p>{ content }</p>
                    <p>Last updated: { modified_on }</p>
                </Col>
            </Card>
        </Container>
    )
};

export default Article;