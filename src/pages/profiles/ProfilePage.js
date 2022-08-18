import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
// import styles from "../../styles.ProfilePage.module.css";

function ProfilePage() {

    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const setProfileData = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    /**
     * Retrieve profile data from API.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }] = await Promise.all([axiosReq.get(`/profiles/${id}/`)]),
                
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));

                setHadLoaded(true);
            } catch (err) {};
        };

        fetchData();
    }, [id, setProfileData]);

    return (
        <h1>Testing....</h1>
    );
};

export default ProfilePage;