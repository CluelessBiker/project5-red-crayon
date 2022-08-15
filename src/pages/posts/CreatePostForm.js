import React, { useRef, useState } from "react";
import { Container, Form, Button, Col, Row, Alert, Image } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

/**
* Render CreatePostForm.
* Supply user with input fields to create a post.
*/
function CreatePostForm() {

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        description: "",
        image: "",
        music_medium: "",
        song_name: "",
        artist_name: "",
        beverage: "",
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

    const handleMusic = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleBeverage = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleArt = (event) => {
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
        formData.append("image", imageInput.current.files[0]);
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
            }
        }
    };

    return (
        <Container>
            <h2>Inspired?</h2>
            <p>We want to know what has those creative juices flowing!</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
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

                <Form.Group>
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
                    <Form.Group>
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

                    <Form.Group>
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
                    <Form.Group as={Col}>
                        <Form.Label>What are you listening to it on?</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Choose..."
                            name="music_medium"
                            
                            onChange={handleMusic}
                        >
                            <option value="none">None</option>
                            <option value="cassette">Cassette</option>
                            <option value="CD">CD</option>
                            <option value="minidisc">Minidisc</option>
                            <option value="vinyl">Vinyl</option>
                            <option value="mp3">mp3</option>
                            <option value="radio">Radio</option>
                        </Form.Control>
                    </Form.Group>
                    {errors?.music_medium?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col}>
                        <Form.Label>Pick your poison:</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Choose..."
                            name="beverage"
                            
                            onChange={handleBeverage}
                        >
                            <option value="none">None</option>
                            <option value="water">Water</option>
                            <option value="soda">Soda</option>
                            <option value="juice">Juice</option>
                            <option value="coffee">Coffee</option>
                            <option value="tea">Tea</option>
                            <option value="wine">Wine</option>
                            <option value="beer">Beer</option>
                            <option value="cocktail">Cocktail</option>
                            <option value="spirits">Spirits</option>
                        </Form.Control>
                    </Form.Group>
                    {errors?.beverage?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group as={Col}>
                        <Form.Label>What are you working with?</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Choose..."
                            name="art_medium"
                            
                            onChange={handleArt}
                        >
                            <option value="none">None</option>
                            <option value="acrylic_paint">Acrylic paint</option>
                            <option value="oil_paint">Oil paint</option>
                            <option value="water_colours">Water colours</option>
                            <option value="spray_paint">Spray paint</option>
                            <option value="coloured_pencils">Coloured pencils</option>
                            <option value="markers">Markers</option>
                            <option value="photography">Photography</option>
                            <option value="videography">Videography</option>
                            <option value="digital">Digital</option>
                            <option value="coding">Coding</option>
                            <option value="wood">Wood</option>
                            <option value="clay">Clay</option>
                            <option value="metal">Metal</option>
                            <option value="glass">Glass</option>
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