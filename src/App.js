import { Col, Row } from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import NavBarMini from './components/NavBarMini';
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import CreatePostForm from "./pages/posts/CreatePostForm";
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import EditPostForm from './pages/posts/EditPostForm';
import PopularProfiles from './pages/profiles/PopularProfiles';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from './pages/profiles/UsernameForm';
import PasswordForm from './pages/profiles/PasswordForm';
import EditProfileForm from './pages/profiles/EditProfileForm';
import CreateArticleForm from './pages/articles/CreateArticleForm';
import EditArticleForm from './pages/articles/EditArticleForm';
import ArticlePage from './pages/articles/ArticlePage';
import ArticlesPage from './pages/articles/ArticlesPage';
import NotFound from './components/NotFound';
import CreateEventForm from './pages/events/CreateEventForm';
import EditEventForm from './pages/events/EditEventForm';
import EventPage from './pages/events/EventPage';

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>

      {/* HEADER */}
      <Row>
        {/* LARGE SCREENS */}
        <Col className={`${styles.HeaderLgScreen} ${styles.Header}`}>
          <NavLink to="/" className={styles.HeaderLink}>
            <h1>The Red Crayon</h1>
          </NavLink>
        </Col>

        {/* SMALL SCREENS */}
        <Col sm={12} className={`${styles.SmHeader} ${styles.NavSmScreen}`}>
          <NavBarMini />
        </Col>
      </Row>
      <br />

      <Row className={styles.MainContent}>

        {/* NAVBAR */}
        <Col lg={3} className={` ${styles.LeftPanel} ${styles.NavLgScreen}`}>
          <NavBar />
        </Col>

        {/* MAIN CONTENT */}
        <Col sm={12} md={8} lg={6} className={styles.MiddlePanel}>
          <Switch>
            <Route exact path="/" render={() => <ArticlesPage />} />
            <Route exact path="/articles/create" render={() => <CreateArticleForm />} />
            <Route exact path="/articles/:id/edit" render={() => <EditArticleForm />} />
            <Route exact path="/articles/:id" render={() => <ArticlePage />} />
            <Route exact path="/events/create" render={() => <CreateEventForm />} />
            <Route exact path="/events/:id/edit" render={() => <EditEventForm />} />
            <Route exact path="/events/:id" render={() => <EventPage />} />
            <Route exact path="/posts" render={() => <PostsPage message="No results."/>} />
            <Route
              exact
              path="/favourites"
              render={() => (
                <PostsPage
                  message="No results."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_on&`}
                />
              )}
            />
            <Route exact path="/login" render={() => <LogInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/posts/create" render={() => <CreatePostForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/posts/:id/edit" render={() => <EditPostForm />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
            <Route exact path="/profiles/:id/edit/password" render={() => <PasswordForm />} />
            <Route exact path="/profiles/:id/edit" render={() => <EditProfileForm />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Col>

        {/* POPULAR PROFILES */}
        <Col md={4} lg={3} className={styles.RightPanel}>
          <PopularProfiles />
        </Col>
      </Row>

    </div>
  );
}

export default App;
