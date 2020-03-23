import React, { useState } from "react";
import styled from "styled-components";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(
    INITIAL_STATE
  );
  const [login, setLogin] = useState(false);

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
            value={values.name}
            name="name"
          />
        )}
        <input
          type="text"
          placeholder="Your Email"
          autoComplete="off"
          onChange={handleChange}
          value={values.email}
          name="email"
        />
        <input
          type="password"
          placeholder="Choose a secure password"
          autoComplete="off"
          onChange={handleChange}
          value={values.password}
          name="password"
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
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
