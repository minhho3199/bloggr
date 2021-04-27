import { Form } from "formik";
import { Button, Card, Input, Notification, Textarea, Picklist } from "react-rainbow-components";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const BackgroundContainer = styled.div`
  background-color: #1987ea;
  height: 100%;
  display: flex;
  width: 100%; 
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  /* margin: auto; */
  width: 100%;
`;
export const StyledNotification = styled(Notification)`
  width: 70%;
  margin-top: 20px;
  border: 0;
  box-shadow: 0 0 0 0;
  h1 {
    font-size: 20px;
    line-height: 1.5;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  transition: 0.1s;
  :hover {
    text-decoration: none;
    filter: brightness(90%);
  }

`;
export const NotificationContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: auto;
`;
export const Title = styled.h1`
  font-family: "Lato";
  font-size: 30px;
  text-align: center;
  font-weight: 500;
  padding-bottom: 10px;
  padding-top: 15px;
`;
export const Register = styled.p`
  font-family: "Lato";
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 300;
`;

export const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
  min-width: 700px;
`;
export const StyledInput = styled(Input)`
  margin-bottom: 15px;

  label {
    font-size: 20px;
  }
`;

export const StyledTextArea = styled(Textarea)`
  margin-bottom: 15px;

  label {
    font-size: 20px;
  }
  input,
  input:focus {
    padding: 25px 1rem 25px 2.35rem;
  }
`
export const StyledForm = styled(Form)`
  padding: 20px;
  width: 70%;
  font-size: 1.25em;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5% 0 10px 0;
`;
export const StyledButton = styled(Button)`
  margin: 10 0 10 0;
  padding: 10px;
  font-size: 20px;
  width: 100%;
`;
export const StyledPicklist = styled(Picklist)`
  label {
    font-size: 20px;
  }
`;