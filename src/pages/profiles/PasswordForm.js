import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PasswordForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useCurrentUser();

    const [userData, setUserData] = useState({
        new_password1: "",
        new_password2: "",
    });

    const { new_password1, new_password2 } = userData;

    const [errors, setErrors] = useState({});

    /**
    * Populate empty variable strings.
    */
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    /**
    * Reroute user if they are not the correct user.
    */
    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
            history.push("/");
        }
    }, [currentUser, history, id]);

    /**
    * Update API with new password data.
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.post("/dj-rest-auth/password/change/", userData);
            history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };
};

export default PasswordForm;