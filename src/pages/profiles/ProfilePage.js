/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Image, Row,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import PostsPage from '../posts/PostsPage';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import {
  useProfileData,
  useSetProfileData,
} from '../../contexts/ProfileDataContext';
import { EditProfileDropdown } from '../../components/DropdownMenu';
import styles from '../../styles/ProfilePage.module.css';
import btnStyles from '../../styles/Buttons.module.css';

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  /**
   * Retrieve profile data from API.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
        ]);

        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));

        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
  }, [id, setProfileData]);

  const profileHeader = (
    <>
      <Container className={styles.ProfileHeader}>
        <Row>
          <Col sm={6}>
            <p>
              <strong>
                {profile?.first_name} {profile?.last_name}
              </strong>
            </p>
            <p>@{profile?.owner}</p>
            <p>{profile?.description}</p>
            <p>
              <i className="fa-solid fa-location-dot" /> {profile?.country}{' '}
              <i className="fa-regular fa-calendar" /> Joined{' '}
              {profile?.modified_on}
            </p>
            <p>
              <strong>{profile?.following_count}</strong> Following{' '}
              <strong>{profile?.followers_count}</strong> Followers
            </p>
          </Col>

          <Col sm={6} className={`text-lg-right ${styles.RightColumn}`}>
            <Col className={styles.ProfileName}>
              <Row className={styles.NameAndEdit}>
                <h2>
                  <strong>{profile?.owner} </strong>
                </h2>
                {profile?.is_owner && <EditProfileDropdown id={profile?.id} />}
              </Row>
              <p>{profile?.posts_count} Posts</p>
            </Col>
            <Image
              className={styles.ProfileImage}
              roundedCircle
              src={profile?.image}
            />
            <Col>
              {currentUser && !is_owner && (profile?.following_id ? (
                <Button
                  className={`${btnStyles.Button} ${styles.Button}`}
                  onClick={() => handleUnfollow(profile)}
                >
                  unfollow
                </Button>
              ) : (
                <Button
                  className={`${btnStyles.Button} ${styles.Button}`}
                  onClick={() => handleFollow(profile)}
                >
                  follow
                </Button>
              ))}
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );

  const profilePosts = (
    <>
      <div>
        <PostsPage
          message="No results."
          filter={`owner__profile=${id}&ordering=-created_on&`}
        />
      </div>
    </>
  );

  return (
    <Container>
      {hasLoaded ? (
        <>
          {profileHeader}
          <br />
          {profilePosts}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
}

export default ProfilePage;
