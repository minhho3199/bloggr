import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { faLock, faMailBulk, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BackgroundContainer,
  ButtonContainer,
  Container,
  StyledButton,
  StyledCard,
  StyledForm,
  StyledInput,
  StyledLink,
  StyledNotification,
  Title
} from "./styles";
import { resetRegisterState, registerStart } from './registerSlice';
import { Redirect } from 'react-router';

const RegisterForm = () => {
  const registerState = useSelector(state => state.registerState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetRegisterState());
  }, [dispatch])

  if ("usertoken" in localStorage) {
    return <Redirect to="/home" />
  }
  
  const initialValues = {
    email: "",
    name: "",
    password: "",
    passwordConfirmation: ""
  }

  const validateSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().min(8, "Password must have at least 8 characters").required("Password is required"),
    passwordConfirmation: Yup.string()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      })
  })

  function onSubmit(values) {
    const payload = {
      email: values.email,
      name: values.name,
      password: values.password
    };
    dispatch(registerStart(payload));
  }

  return (
    <div>
      <BackgroundContainer>
        <Container>
          <StyledCard>
            {registerState.error && (
              <StyledNotification title={registerState.error.message} hideCloseButton={true} icon="error" />
            )}
            {registerState.isRegisterSuccess && (
              <StyledNotification title="Register successful. Redirecting..." hideCloseButton={true} icon="success" />
            )}
            <Title>Register For Bloggr</Title>
            <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
              {({ errors, touched }) => (
                <StyledForm>
                  <Field
                    name="email"
                    label="Email"
                    as={StyledInput}
                    icon={<FontAwesomeIcon icon={faMailBulk} />}
                    error={errors.email && touched.email ? errors.email : null}
                    placeholder="Enter email"
                  />
                  <Field
                    name="name"
                    label="Name"
                    as={StyledInput}
                    icon={<FontAwesomeIcon icon={faUser} />}
                    error={errors.name && touched.name ? errors.name : null}
                    placeholder="Enter Name"
                  />
                  <Field
                    name="password"
                    label="Password"
                    as={StyledInput}
                    icon={<FontAwesomeIcon icon={faLock} />}
                    type="password"
                    error={errors.password && touched.password ? errors.password : null}
                    placeholder="Enter password"
                  />
                  <Field
                    name="passwordConfirmation"
                    label="Confirm Password"
                    as={StyledInput}
                    icon={<FontAwesomeIcon icon={faLock} />}
                    type="password"
                    error={errors.passwordConfirmation && touched.passwordConfirmation ? errors.passwordConfirmation : null}
                    placeholder="Confirm Password"
                  />
                  <ButtonContainer>
                    <StyledButton type="submit" label="Register" variant="brand" disabled={registerState.isLoading} />
                    <StyledLink to="/">
                      <StyledButton type="submit" label="Cancel" variant="neutral" />
                    </StyledLink>
                  </ButtonContainer>
                </StyledForm>
              )}
            </Formik>
          </StyledCard>
        </Container>
      </BackgroundContainer>
    </div>
  );
}

export default RegisterForm;