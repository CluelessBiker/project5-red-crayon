import { Col, Row } from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';
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

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>

      <div className={styles.NavBar}>
          <NavLink to="/" className={styles.HeaderLink}>
              <h1>The Red Crayon</h1>
          </NavLink>
      </div>
      <br />

      <Row className={styles.MainContent}>
        <Col md={3}>
          <NavBar />
        </Col>

        <Col md={6}>
          <Switch>
            <Route exact path="/" render={() => <h1>News</h1>} />
            <Route exact path="/articles/create" render={() => <CreateArticleForm />} />
            <Route exact path="/articles/:id/edit" render={() => <EditArticleForm />} />
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
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Col>

        <Col md={3}>
          <PopularProfiles />
        </Col>
      </Row>

    </div>
  );
}

export default App;
