import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import PostsPage from "../posts/PostsPage";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { EditProfileDropdown } from "../../components/DropdownMenu";
import styles from "../../styles/ProfilePage.module.css";

function ProfilePage() {

    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;
    // const profile_id = currentUser?.profile_id;
    

    /**
     * Retrieve profile data from API.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }] = await Promise.all([axiosReq.get(`/profiles/${id}/`)]);
                
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));

                setHasLoaded(true);
            } catch (err) {};
        };

        fetchData();
    }, [id, setProfileData]);

    const profileHeader = (
        <>
            <Container className={styles.ProfileHeader}>
                <Row>
                    <Col>
                        <Row>
                            {profile?.is_owner && <EditProfileDropdown id={profile?.id} />}
                            <p> <strong>{ profile?.first_name } { profile?.last_name }</strong></p>
                        </Row>
                        <Row>
                            <div>
                                <p>a.k.a. { profile?.username }</p>
                            </div>
                        </Row>
                        <Row>
                            <p>@{ profile?.owner }</p>
                        </Row>
                        <Row>
                            <p>{ profile?.description }</p>
                        </Row>
                        <Row>
                            <p><i className="fa-light fa-location-dot" /> { profile?.country }  <i class="fa-regular fa-calendar" /> Joined { profile?.modified_on }</p>
                        </Row>
                        <Row>
                            <p><strong>{ profile?.following_count }</strong> Following    <strong>{ profile?.followers_count }</strong> Followers</p>
                        </Row>
                    </Col>
                    <Col>
                        <Col>
                            <Row>
                                <p>{ profile?.owner }</p>
                            </Row>
                            <Row>
                                <p>{ profile?.posts_count } Posts</p>
                            </Row>
                        </Col>
                        <Row>
                            <Image
                                className={styles.ProfileImage}
                                roundedCircle
                                src={profile?.image}
                            />
                        </Row>
                        <Row>
                            { currentUser && !is_owner && (profile?.following_id ? (
                                <Button
                                    onClick={() => handleUnfollow(profile)}
                                >unfollow</Button>
                            ) : (
                                <Button
                                    onClick={() => handleFollow(profile)}
                                >follow</Button>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );


    const profilePosts = (
        <>
            <Card>
                <PostsPage
                    message="No results."
                    // filter={`owner__profile=${profile_id}&ordering=-created_on&`}
                />
            </Card>
        </>
    )

    return (
        <Container>
            {hasLoaded ? (
                <>
                    { profileHeader }
                    <br />
                    { profilePosts }
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default ProfilePage;