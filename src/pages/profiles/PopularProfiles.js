import React from "react";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import styles from "../../styles/PopularProfiles.module.css"

/**
* Obtain Profiles from API
* Return most popular by follower count. 
* Code provided in Moments walkthrough.
*/
const PopularProfiles = () => {

    const { popularProfiles } = useProfileData();

    return (
        <Container className={styles.Header}>
            {popularProfiles.results.length ? (
                <>
                    <br />
                    <h2><strong>The cool kids:</strong></h2>
                    {popularProfiles.results.map((profile) => (
                        <Profile key={profile.id} profile={profile} />
                    ))}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles;