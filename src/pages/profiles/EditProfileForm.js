import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Buttons.module.css"

const EditProfileForm = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        description: "",
        image: "",
        first_name: "",
        last_name: "",
        country: "",
    });

    const { description, image, first_name, last_name, country } = profileData;

    const [errors, setErrors] = useState({});

    /**
    * If user is authenticated, retrieve existing data.
    * Route user to home page if not.
    */
    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { description, image, first_name, last_name, country } = data;
                    setProfileData({ description, image, first_name, last_name, country });
                } catch (err) {
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    /**
    * Update empty key/value pairs in variable.
    */
    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    /**
    * Updata API with new profile data. 
    */
    const handleSubmit = async (event) => {

        event.preventDefault();
        const formData = new FormData();

        formData.append("description", description);
        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("country", country);

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label>First name:</Form.Label>
                <Form.Control
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.first_name?.map((message, idx) => (
                <Alert variant="danger" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Last name:</Form.Label>
                <Form.Control
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.last_name?.map((message, idx) => (
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

            <Form.Group>
                <Form.Label>About:</Form.Label>
                <Form.Control
                    as="textarea"
                    value={description}
                    onChange={handleChange}
                    name="description"
                    rows={5}
                />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button
                className={btnStyles.Button}
                onClick={() => history.goBack()}
            >cancel</Button>

            <Button
                className={btnStyles.Button}
                type="submit"
            >save</Button>
        </>
    );

    /**
    * Render form to browser. 
    */
    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                    <Container>
                        <Form.Group>
                            {image && (
                                <figure>
                                    <Image src={image} fluid />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                {message}
                                </Alert>
                            ))}

                            <div>
                                <Form.Label
                                    htmlFor="image-upload"
                                    className={btnStyles.Button}
                                >Change image</Form.Label>
                            </div>
                            
                            <Form.File
                                id="image-upload"
                                ref={imageFile}
                                accept="image/*"
                                className="d-none"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }}
                            />
                        </Form.Group>

                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>

                <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
                    <Container>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
};

export default EditProfileForm;