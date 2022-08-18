import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";

/**
* Obtain Profiles from API
* Return most popular by follower count. 
* Code provided in Moments walkthrough.
*/
const PopularProfiles = () => {

    // const [profileData, setProfileData] = useState({
    //     pageProfile: { results: [] },
    //     popularProfiles: { results: [] },
    // });

    // const { popularProfiles } = profileData;
    // const currentUser = useSetCurrentUser();
    const { popularProfiles } = useProfileData();

    /**
    * Retrieve profiles from API.
    * Order profiles in descending order by most followed.
    */
    // useEffect(() => {
    //     const handleMount = async () => {
    //         try {
    //             const { data } = await axiosReq.get("profiles/?ordering=-followers_count");
    //             setProfileData((prevState) => ({
    //                 ...prevState,
    //                 popularProfiles: data,
    //             }));
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     handleMount();
    // }, [currentUser]);


    return (
        <Container>
            {popularProfiles.results.length ? (
                <>
                    <p>huh?</p>
                    {popularProfiles.results.map((profile) => (
                        // <p key={profile.id}>{profile.owner}</p>
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