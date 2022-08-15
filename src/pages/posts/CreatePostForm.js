import React, { useRef, useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

/**
* Render CreatePostForm.
* Supply user with input fields to create a post.
*/
function CreatePostForm() {

    const [errors, setErrors] = useState({})

    const [postData, setPostData] = useState({
        title: "",
        description: "",
        image: "",
        music_medium: "",
        song_name: "",
        artist_name: "",
        bevarage: "",
        art_medium: "",
    });

    const { title, description, image, music_medium, song_name, artist_name, beverage, art_medium } = postData;

    const imageInput = useRef(null);
    const history = useHistory();

    /**
    * Populate postData strings.
    */
    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    /**
    * Change uploaded image.
    * clear previously uploaded image.
    */
    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        };
    };

    /**
    * Pust data to API.
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("music_medium", music_medium);
        formData.append("song_name", song_name);
        formData.append("artist_name", artist_name);
        formData.append("beverage", beverage);
        formData.append("art_medium", art_medium);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            };
        };
    };

    return (
        <Container>
            <Form>
                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label></Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label></Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label></Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Form.Group controlId="">
                    <Form.Label></Form.Label>
                    <Form.Control type="" placeholder="" />
                    <Form.File />
                </Form.Group>
                
                <Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    
                    <Button variant="primary" type="submit">
                        Cancel
                    </Button>
                </Row>
            </Form>
        </Container>
    )
};

export default CreatePostForm;