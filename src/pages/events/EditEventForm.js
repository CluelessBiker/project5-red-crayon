import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import useRedirect from "../../hooks/useRedirect";
import styles from "../../styles/CreateEventForm.module.css"
import btnStyles from "../../styles/Buttons.module.css"

/**
* Render Edit Events form.
*/
function EditEventForm(){

    useRedirect("loggedout");
    const [errors, setErrors] = useState({});

    const [eventData, setEventData] = useState({
        title: "",
        content: "",
        date: "",
        time: "",
        city: "",
        country: "",
        price: "",
        event_link: "",
    });

    const { title, content, date, time, city, country, price, event_link } = eventData;

    const history = useHistory();
    const { id } = useParams();

    /**
    * Populate EditForm fields with previously inserted data. 
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/events/${id}/`);
                const { title, content, date, time, city, country, price, event_link, is_owner } = data;

                is_owner ? setEventData({ title, content, date, time, city, country, price, event_link }) : history.push("/");
            } catch (err) {
                // console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

    /**
    * Push submitted data into empty strings.
    */
    const handleChange = (event) => {
        setEventData({
            ...eventData,
            [event.target.name]: event.target.value,
        });
    };

    /**
    * Push inputted data to API.
    * Redirect user to event page upon successful submission. 
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("price", price);
        formData.append("event_link", event_link);

        try {
            await axiosReq.put(`/events/${id}/`, formData);
            history.push(`/events/${id}`);
            // console.log(formData);
        } catch (err) {
            // console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container className={styles.FormAlignment}>
            <br />
            <h2><strong>Submit an event!</strong></h2>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Event Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.title?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group>
                    <Form.Label>Content:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="content"
                        value={content}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.content?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Row className={styles.RowSpacing}>
                    <Form.Group>
                        <Form.Label>City:</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={city}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.city?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    
                    <Form.Group>
                        <Form.Label>Country:</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={country}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.country?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>

                <Row className={styles.RowSpacing}>
                    <Form.Group>
                        <Form.Label>Date:</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.date?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    
                    <Form.Group>
                        <Form.Label>Time:</Form.Label>
                        <Form.Control
                            type="time"
                            name="time"
                            value={time}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.time?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    
                    <Form.Group>
                        <Form.Label>Price in €:</Form.Label>
                        <Form.Control
                            type="text"
                            name="price"
                            value={price}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.price?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    
                </Row>

                <Form.Group>
                    <Form.Label>Event URL:</Form.Label>
                    <Form.Control
                        type="url"
                        name="event_link"
                        value={event_link}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.event_link?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

                <br />
                <Row className={styles.RowSpacing}>
                    <Button
                        type="submit"
                        className={btnStyles.Button}
                    >Submit</Button>
                    
                    <Button
                        onClick={() => history.goBack()}
                        className={btnStyles.Button}
                    >Cancel</Button>
                </Row>
                <br />
            </Form>
        </Container>
    );
};

export default EditEventForm;