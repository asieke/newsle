import React from "react";
import FirebaseContext from "../../firebase/context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";

const stripePromise = loadStripe("pk_test_rVI6Dv0EP74QOuLhMqn0uo37");

const Account = () => {
  const { user, firebase } = React.useContext(FirebaseContext);

  const [amount, setAmount] = React.useState(null);

  if (!user) {
    return <a href="/login">Please Log In</a>;
  }

  async function handleAmountClick(x) {
    setAmount(x);

    const response = await fetch(
      "https://us-central1-paper-direct.cloudfunctions.net/createPaymentIntent"
    );

    console.log(response);
  }

  return (
    <div>
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <hr />
      <Flex>
        <b>Add credits to your wallet</b>
        <Amounts>
          <StyledButton
            selected={amount === 5}
            onClick={() => handleAmountClick(5)}
          >
            $5
          </StyledButton>
          <StyledButton
            selected={amount === 10}
            onClick={() => handleAmountClick(10)}
          >
            $10
          </StyledButton>
          <StyledButton
            selected={amount === 20}
            onClick={() => handleAmountClick(20)}
          >
            $20
          </StyledButton>
          <StyledButton
            selected={amount === 50}
            onClick={() => handleAmountClick(50)}
          >
            $50
          </StyledButton>
        </Amounts>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Flex>
    </div>
  );
};

const StyledButton = styled.button`
  margin-right: 10px;
  padding: 5px;
  background-color: ${props => (props.selected ? "#ffcc33" : "#f3f3f3")};
  cursor: pointer;
`;

const Amounts = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;

const Flex = styled.div`
  width: 400px;
  margin-top: 20px;
`;

export default Account;
