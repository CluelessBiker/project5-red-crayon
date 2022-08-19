import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import useRedirect from "../../hooks/useRedirect";

/**
* Render CreateArticleForm.
* Supply user with input fields to create an Article.
*/
function CreateArticleForm() {

    useRedirect("loggedOut");

    const [errors, setErrors] = useState({});

    const [articleData, setArticleData] = useState({
        title: "",
        content: "",
        image: "",
    });

    const { title, content, image } = articleData;

    const imageInput = useRef(null);
    const history = useHistory();

    /**
    * Populate ArticleData strings.
    */
    const handleChange = (event) => {
        setArticleData({
            ...articleData,
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
            setArticleData({
                ...articleData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        };
    };

    /**
    * Pust data to API.
    * Direct user to article page.
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/articles/", formData);
            history.push(`/articles/${data.id}`);
            console.log(formData);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
              setErrors(err.response?.data);
            }
        }
    };

    return (
        
    )
};

export default CreateArticleForm;