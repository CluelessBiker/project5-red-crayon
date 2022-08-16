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

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>

      <div fixed="top" className={styles.NavBar}>
          <NavLink to="/">
              <h1>The Red Crayon</h1>
          </NavLink>
      </div>
      <br />
      <Row>
        <Col md={3}>
          <NavBar />
        </Col>

        <Col md={6}>
          <Switch>
            <Route exact path="/" render={() => <h1>News</h1>} />
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
            <Route exact path="/logout" render={() => <h1>Logout</h1>} />
            <Route exact path="/posts/create" render={() => <CreatePostForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Col>

        <Col md={3}>
          <h2>popular profiles</h2>
        </Col>
      </Row>

    </div>
  );
}

export default App;
