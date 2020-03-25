import React from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      setFirebaseError(err.message);
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <Flex>
            <input
              onChange={handleChange}
              value={values.name}
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="off"
            />
          </Flex>
        )}
        <Flex>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            type="email"
            className={errors.email && "error-input"}
            placeholder="Your email"
            autoComplete="off"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </Flex>
        <Flex>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={errors.password && "error-input"}
            name="password"
            type="password"
            placeholder="Choose a secure password"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </Flex>
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
          <StyledSpan onClick={() => setLogin(prevLogin => !prevLogin)}>
            {login ? "need to create an account?" : "already have an account?"}
          </StyledSpan>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  );
}

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;

  input {
    padding: 5px;
    width: 300px;
    margin-right: 10px;
  }
`;

const StyledSpan = styled.span`
  cursor: pointer;
  padding-top: 5px;
  font-size: 12px;
`;

export default Login;
