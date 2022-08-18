import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { followHelper } from "../utils/utils";
import { useCurrentUser } from "./CurrentUserContext";

/**
* Code provided in Moments walkthrough.
*/
const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });

    const currentUser = useCurrentUser();

    /**
    * Map user follow count in API
    * Update follow count when button clicked. 
    */
    const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post("/followers/", {followed: clickedProfile.id});

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                    followHelper(profile, clickedProfile, data.id)
                    ),
                },
            }));
        } catch (err) {}
    };

    /**
    * Retrieve profile data from API
    * Order profiles by highest follower count. 
    */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data,
                }));
            } catch (err) {}
        };

        handleMount();
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={{ setProfileData, handleFollow }}>
                { children }
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};

export default ProfileDataProvider;