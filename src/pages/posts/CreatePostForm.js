import React, { useRef, useState } from "react";
import { Container, Form, Button, Col, Row, Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css"
import formStyles from "../../styles/CreatePostForm.module.css"
import Asset from "../../components/Asset";
import useRedirect from "../../hooks/useRedirect";

/**
* Render CreatePostForm.
* Supply user with input fields to create a post.
*/
function CreatePostForm() {

    useRedirect("loggedOut");

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        description: "",
        image: "",
        music_medium: "",
        song_name: "",
        artist_name: "",
        beverage: "",
        artistic_medium: "",
    });

    const { title, description, image, music_medium, song_name, artist_name, beverage, artistic_medium } = postData;

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
        formData.append("image", imageInput.current.files[0]);
        formData.append("music_medium", music_medium);
        formData.append("song_name", song_name);
        formData.append("artist_name", artist_name);
        formData.append("beverage", beverage);
        formData.append("artistic_medium", artistic_medium);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`);
            // console.log(formData);
        } catch (err) {
            // console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Container className={formStyles.FormLabels}>
            <br />
            <h2><strong>Share your inspiration</strong></h2>
            <br />
            <p>We all have that perfect combination of elements that motivate us... Why not share yours?</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        aria-label="title"
                    />
                </Form.Group>
                {errors?.title?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Form.Group>
                    <Form.Label>What are you working on?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="description"
                        value={description}
                        onChange={handleChange}
                        aria-label="description"
                    />
                </Form.Group>
                {errors?.description?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}

                <Row className={formStyles.Music}>
                    <Form.Group>
                        <Form.Label>Song name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="song_name"
                            value={song_name}
                            onChange={handleChange}
                            aria-label="song name"
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
                            aria-label="artist name"
                        />
                    </Form.Group>
                    {errors?.artist_name?.map((message, idx) => (
                        <Alert variant="danger" key={idx}>
                            {message}
                        </Alert>
                    ))}
                </Row>

                <Row className={formStyles.Choices}>
                    <Form.Group as={Col}>
                        <Form.Label>Music player:</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Choose..."
                            name="music_medium"
                            onChange={handleChange}
                            aria-label="music medium"
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
                            onChange={handleChange}
                            aria-label="beverage"
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
                        <Form.Label>Artistic medium:</Form.Label>
                        <Form.Control
                            as="select"
                            defaultValue="Choose..."
                            name="artistic_medium"
                            onChange={handleChange}
                            aria-label="artistic medium"
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
                    {errors?.artistic_medium?.map((message, idx) => (
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
                                    className={btnStyles.Button}
                                >Change image</Form.Label>
                            </div>
                        </>
                    ) : (
                        <Form.Label
                            className="d-flex justify-content-center"
                            htmlFor="image-upload"
                        >
                            <Col>
                                <span className={formStyles.UploadIcon}>
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                </span>
                                <Asset message="Upload image" />
                            </Col>
                        </Form.Label>
                    )}

                    <Form.File
                        id="image-upload"
                        accept="image/*"
                        onChange={handleChangeImage}
                        ref={imageInput}
                        className="d-none"
                    />
                </Form.Group>
                {errors?.image?.map((message, idx) => (
                    <Alert variant="danger" key={idx}>
                        {message}
                    </Alert>
                ))}
                
                <Row className={formStyles.FormButtons}>
                    <Button type="submit" className={`${formStyles.Button} ${btnStyles.Button}`}>
                        Submit
                    </Button>
                    
                    <Button onClick={() => history.goBack()} className={`${formStyles.Button} ${btnStyles.Button}`}>
                        Cancel
                    </Button>
                </Row>
            </Form>
            <br />
        </Container>
    )
};

export default CreatePostForm;