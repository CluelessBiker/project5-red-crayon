import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

/**
* Display all articles.
*/
function ArticlesPage({ message, filter="" }) {

    const [articles, setArticles] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    /**
    * Retrieve articles from API
    * Display spinner until content has loaded.
    * Delay search filter from making API requests with each keystroke.
    */
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
                setArticles(data);
                setHasLoaded(true);
            } catch (err) {}
        };

        setHasLoaded(false);

        const timer = setTimeout(() => {
            fetchArticles();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

    return (
        <h1>News</h1>
    )
};

export default ArticlesPage;