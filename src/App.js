import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />

      {/* NAVIGATION LINKS */}
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>News</h1>} />
          <Route exact path="/explore" render={() => <h1>Explore</h1>} />
          <Route exact path="/favourites" render={() => <h1>Favourites</h1>} />
          <Route exact path="/login" render={() => <h1>Login</h1>} />
          <Route exact path="/signup" render={() => <h1>Sign up</h1>} />
          <Route exact path="/logout" render={() => <h1>Logout</h1>} />
          <Route exact path="/submit" render={() => <h1>Submit</h1>} />
        </Switch>

      </Container>
    </div>
  );
}

export default App;
