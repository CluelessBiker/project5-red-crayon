import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("Navbar renders", () => {
    render (
        <Router>
            <NavBar />
        </Router>
    );

    const loginLink = screen.getByRole("link", {name: "Login"});
    expect(loginLink).toBeInTheDocument();
});

test("renders Sign in and Sign up buttons again on log out", async () => {
    render(
      <Router>
        <CurrentUserProvider>
          <NavBar />
        </CurrentUserProvider>
      </Router>
    );
  
    const logoutLink = await screen.findByRole("link", { name: "Logout" });
    fireEvent.click(logoutLink);
  
    const loginLink = await screen.findByRole("link", { name: "Login" });
    const signUpLink = await screen.findByRole("link", { name: "Sign up" });
  
    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });