import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import Event from "./Event";

/**
* Display all events
*/
function EventsPage({ message, filter="" }) {

    const [events, setEvents] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    /**
    * Retrieve Events from API.
    * Display loading spinner until retrieved.
    * Prevent API requests with each keystroke in searchbar. 
    */
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosReq.get(`/events/?${filter}search=${query}`);
                setEvents(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);

        const timer = setTimeout(() => {
            fetchEvents();
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [filter, query, pathname]);

    return (
        <Container>
            <br />
            <h2>Browse upcoming events!</h2>

        </Container>
    );
};

export default EventsPage;