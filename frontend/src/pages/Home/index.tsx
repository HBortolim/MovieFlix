import { ReactComponent as HomeImage } from "assets/img/home-img.svg";
import { AuthContext } from "AuthContext";
import DefaultButton from "components/DefaultButton";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { getTokenData } from "util/auth";
import { requestBackendLogin } from "util/requests";
import { saveAuthData } from "util/storage";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Home = () => {
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: "/movies" } };

  const [hasError, setHasError] = useState(false);

  const { setAuthContextData } = useContext(AuthContext);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((e) => {
        setHasError(true);
      });
  };

  return (
    <div className="home-container">
      <div className="hero-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        
          <HomeImage />
        
      </div>
      <div className="base-card login-card-container">
        <h2>Login</h2>
        {hasError && <div className="alert alert-danger">Erro de login!</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <input
              {...register("username", {
                required: "Campo Obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "username inválido",
                },
              })}
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="form-control base-input"
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
            <input
              {...register("password", {
                required: "Campo Obrigatório",
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              className="form-control base-input"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
            <DefaultButton text="Fazer Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
