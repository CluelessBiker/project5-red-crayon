import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser} from "../../contexts/CurrentUserContext";

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
        username: "",
        country: "",
    });

    const { description, image, first_name, last_name, username, country } = profileData;

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
                    const { description, image, first_name, last_name, username, country } = data;
                    setProfileData({ description, image, first_name, last_name, username, country });
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
    * Updata empty key/value pairs in variable.
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
        formData.append("username", username);
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

    /**
    * Render form to browser. 
    */
    return (
        <h2>sorry to disappoint</h2>
    );
};

export default EditProfileForm;