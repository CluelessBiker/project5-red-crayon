import React, { useRef, useState } from "react";
import { Container, Form, Button, Col, Row, Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

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
        formData.append("image", imageInput.currentfiles[0]);
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
            <h2>Inspired?</h2>
            <p>We want to know what has those creative juices flowing!</p>
            <Form>
                <Form.Group controlId="title">
                    <Form.Label>Title:</Form.Label>
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

                <Form.Group controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.description?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Row>
                    <Form.Group controlId="song_name">
                        <Form.Label>Song name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="song_name"
                            value={song_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.song_name?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group controlId="artist_name">
                        <Form.Label>Artist:</Form.Label>
                        <Form.Control
                            type="text"
                            name="artist_name"
                            value={artist_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {errors?.artist_name?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="music_medium">
                        <Form.Label>What are you listening to it on?</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Choose..."
                            name="music_medium"
                            value={music_medium}
                            onChange={handleChange}
                        >
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                    {errors?.music_medium?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col} controlId="beverage">
                        <Form.Label>Pick your poison:</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Choose..."
                            name="beverage"
                            value={beverage}
                            onChange={handleChange}
                        >
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                    {errors?.beverage?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col} controlId="art_medium">
                        <Form.Label>What are you working with?</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Choose..."
                            name="art_medium"
                            value={art_medium}
                            onChange={handleChange}
                        >
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                    {errors?.art_medium?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}

                </Row>
                
                <Form.Group className="text-center">
                    {image ? (
                        <>
                            <figure>
                                <Image className={appStyles.Image} src={image} rounded />
                            </figure>
                            <div>
                                <Form.Label
                                htmlFor="image-upload"
                                >
                                Change the image
                                </Form.Label>
                            </div>
                        </>
                    ) : (
                        <Form.Label
                        className="d-flex justify-content-center"
                        htmlFor="image-upload"
                        >
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            <Asset
                                // src={Upload}
                                message="Click or tap to upload an image"
                            />
                        </Form.Label>
                    )}

                    <Form.File
                        id="image-upload"
                        accept="image/*"
                        onChange={handleChangeImage}
                        ref={imageInput}
                    />
                </Form.Group>
                {errors?.image?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}
                
                <Row>
                    <Button type="submit">
                        Submit
                    </Button>
                    
                    <Button onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                </Row>
            </Form>
        </Container>
    )
};

export default CreatePostForm;