import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import useRedirect from "../../hooks/useRedirect";

/**
* Render Create Events form.
*/
function CreateEventForm(){

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
            const { data } = await axiosReq.post("/events/", formData);
            history.push(`/events/${data.id}`);
            // console.log(formData);
        } catch (err) {
            // console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <h1>Events!</h1>
    );
};

export default CreateEventForm;