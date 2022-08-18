import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import PostsPage from "../posts/PostsPage";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
// import styles from "../../styles.ProfilePage.module.css";

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
            <Card>
                <Row>
                    <Col>
                        <Image
                            roundedCircle
                            src={profile?.image}
                        />
                        { currentUser && !is_owner && (profile?.following_id ? (
                            <Button
                                onClick={() => handleUnfollow(profile)}
                            >unfollow</Button>
                        ) : (
                            <Button
                                onClick={() => handleFollow(profile)}
                            >follow</Button>
                        ))}
                    </Col>

                    <Col>
                        <h2>{ profile?.owner }</h2>
                        <Row>
                            <Col>
                                <div>{ profile?.posts_count }</div>
                                <div>posts</div>
                            </Col>
                            <Col>
                                <div>{ profile?.followers_count }</div>
                                <div>followers</div>
                            </Col>
                            <Col>
                                <div>{ profile?.following_count }</div>
                                <div>following</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    );

    const profileBody = (
        <>
            <Card>
                <p>User since: { profile?.created_on }</p>
                <p>Last updated: { profile?.modified_on }</p>
                <p>Name: { profile?.first_name } { profile?.last_name }</p>
                <p>Nickname: { profile?.username }</p>
                <p>Country: { profile?.country }</p>
                <p>About: { profile?.description }</p>
            </Card>
        </>
    )

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
            <h1>Testing....</h1>
            {hasLoaded ? (
                <>
                    { profileHeader }
                    <br />
                    { profileBody }
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