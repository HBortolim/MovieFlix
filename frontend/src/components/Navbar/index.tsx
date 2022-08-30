import { AuthContext } from "AuthContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "util/history";
import { getTokenData, isAuthenticated } from "util/auth";
import { removeAuthData } from "util/storage";
import "./styles.css";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace("/");
  };

  return (
    <nav className="navbar bg-primary main-nav">
      <div className="container">
        <Link to="/" className="logo">
          MovieFlix
        </Link>
        {authContextData.authenticated ? (
          <Link to="/" className="logout-button" onClick={handleLogoutClick}>
             Sair
          </Link>
        ) : undefined}
      </div>
    </nav>
  );
};

export default Navbar;
