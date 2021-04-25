import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
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
import { resetLoginState, loginStart } from './loginSlice';
import Navbar from '../Navbar/Navbar';


const LoginForm = () => {
	const loginState = useSelector(state => state.loginState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetLoginState());
	}, [dispatch]);

	if ("usertoken" in localStorage) {
		return <Redirect to="/home" />;
	}

	const initialValues = {
		email: "",
		password: "",
	}

	const validateSchema = Yup.object({
		email: Yup.string().email("Invalid email format").required("Email is required"),
		password: Yup.string().required("Password is required")
	});

	function onSubmit(values) {
		const payload = {
			email: values.email,
			password: values.password
		};
		dispatch(loginStart(payload));
	}

	return (
		<div>
			<Navbar />
			<BackgroundContainer>
				<Container>
					<StyledCard>
						{loginState.error && (
							<StyledNotification title={loginState.error.message} hideCloseButton={true} icon="error" />
						)}
						{loginState.isLoginSuccess && (
							<StyledNotification title="Login successful. Redirecting..." hideCloseButton={true} icon="success" />
						)}
						<Title>Sign In For Bloggr</Title>
						<Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
							{({ errors, touched }) => (
								<StyledForm>
									<Field
										name="email"
										label="Email"
										as={StyledInput}
										icon={<FontAwesomeIcon icon={faUser} />}
										error={errors.email && touched.email ? errors.email : null}
										placeholder="Enter email"
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
									<ButtonContainer>
										<StyledButton type="submit" label="Sign In" variant="brand" disabled={loginState.isLoading} />
										<StyledLink to="/register">
											<StyledButton type="submit" label="Register" variant="neutral" />
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

export default LoginForm;