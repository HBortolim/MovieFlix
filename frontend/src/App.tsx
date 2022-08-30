import { AuthContext, AuthContextData } from "AuthContext";
import { useState } from "react";
import Routes from "Routes";
import "./App.css";
import "./assets/styles/custom.scss";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });
  return (
    <div className="App">
      <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
