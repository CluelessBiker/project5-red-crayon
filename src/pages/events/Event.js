import React from "react";
import { Col, Container, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { DropdownMenu } from "../../components/DropdownMenu";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Event = (props) => {

    const {
        id,
        owner,
        profile_id,
        profile_image,
        created_on,
        modified_on,
        title,
        content,
        date,
        time,
        city,
        country,
        price,
        event_link,
        eventPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    /**
    * Route user to Edit page for Event 
    */
    const handleEdit = () => {
        history.push(`/events/${id}/edit`);
    };

    /**
    * Delete Event from API. 
    */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/events/${id}/`);
            history.goBack();
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Container>
            <br />
            <Media>
                <Link
                    to={`events/${profile_id}`}
                >
                    <Avatar src={profile_image} height={30} />
                    <p>By: { owner }</p>
                    <p>Last updated: {modified_on }</p>
                </Link>
                {is_owner && eventPage && (
                    <DropdownMenu
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>

            <Col>
                <Link to={`/events/${id}`}>
                    <h2>{ title }</h2>
                </Link>
                <br />
                <p>{ content }</p>
                <p>Date: <i className="fa-solid fa-calendar-lines" /> { date } | Time: <i className="fa-solid fa-watch" />{ time } | Admission: <i className="fa-solid fa-tag" /> €{ price }</p>
                <p>Location: { city }, { country }</p>
                <p>For more information, visit the event page: <i className="fa-solid fa-link" /> { event_link }</p>
                <p>Submitted: { created_on }</p>
            </Col>
        </Container>
    );
};

export default Event;