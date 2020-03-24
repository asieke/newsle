import React, { useState } from "react";
import styled from "styled-components";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase/firebase";

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

  const [login, setLogin] = useState(false);

  async function authenticateUser() {
    const { name, email, password } = values;
    const response = login
      ? firebase.login(email, password)
      : firebase.register(name, email, password);
    console.log({ response });
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {!login && (
          <input
            type="text"
            placeholder="Your Name"
            autoComplete="off"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            name="name"
          />
        )}
        <input
          type="text"
          placeholder="Your Email"
          autoComplete="off"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className={errors.email && "error-input"}
          name="email"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          placeholder="Choose a secure password"
          autoComplete="off"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && "error-input"}
          name="password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
          >
            {login ? "login" : "create account"}
          </button>
          <StyledLink onClick={() => setLogin(prevLogin => !prevLogin)}>
            {login ? "need to create an account?" : "already have an account?"}
          </StyledLink>
        </div>
      </form>
    </div>
  );
}

const StyledLink = styled.p`
  border: 0px;
  padding: 0px;
  line-height: 14px;
  font-size: 12px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default Login;
