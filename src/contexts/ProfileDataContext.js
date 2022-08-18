import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
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
            <SetProfileDataContext.Provider value={setProfileData}>
                { children }
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};

export default ProfileDataProvider;