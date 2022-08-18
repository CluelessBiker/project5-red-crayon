import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
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
                            <Button>unfollow</Button>
                        ) : (
                            <Button>follow</Button>
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

    return (
        <Container>
            <h1>Testing....</h1>
            {hasLoaded ? (
                <>
                    { profileHeader }
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default ProfilePage;