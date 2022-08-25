import React from "react";
import { Col, Container, Media, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import DropdownMenu from "../../components/DropdownMenu";
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
    const history = useHistory;

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

    );
};

export default Event;