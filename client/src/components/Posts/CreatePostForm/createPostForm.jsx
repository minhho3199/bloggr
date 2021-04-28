import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Field, Formik } from "formik";
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
	StyledPicklist,
	StyledTextArea,
	Title
} from "./styles";
import { getLoginData } from '../../utils/utility';
import { createPostStart, resetCreatePostState } from './createPostSlice';
import { Option } from "react-rainbow-components";


const CreatePostForm = () => {
	const createPostState = useSelector(state => state.createPostState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetCreatePostState());
	}, [dispatch]);

	if (!("usertoken" in localStorage)) {
		return <Redirect to="/" />;
	}

	const initialValues = {
		title: "",
		message: "",
		postType: { name: 1, label: "Public" }
	}

	const validateSchema = Yup.object({
		title: Yup.string().required("Post title is required"),
		message: Yup.string().max(200, "Maximum of 200 characters").required("Message is required")
	});

	function onSubmit(values) {
		const payload = {
			title: values.title,
			message: values.message,
			author: getLoginData().id,
			postType: values.postType.name
		}
		dispatch(createPostStart(payload));
	}

	return (
		<div>
			<BackgroundContainer>
				<Container>
					<StyledCard>
						{createPostState.error && (
							<StyledNotification title={createPostState.error.message} hideCloseButton={true} icon="error" />
						)}
						{createPostState.isCreationSuccess && (
							<StyledNotification title="Post Created Successfully. Redirecting..." hideCloseButton={true} icon="success" />
						)}
						<Title>Create A Post</Title>
						<Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
							{({ values, setFieldValue, errors, touched }) => (
								<StyledForm>
									<StyledPicklist
										style={{ paddingBottom: "10px" }}
										label="Post Type"
										name="postType"
										value={values.postType}
										onChange={(e) => setFieldValue("postType", e)}
									>
										<Option name={1} label="Public" />
										<Option name={2} label="Private" />
									</StyledPicklist>
									<Field
										name="title"
										label="Post Title"
										as={StyledInput}
										error={errors.title && touched.title ? errors.title : null}
										placeholder="Enter Post Title"
									/>
									<Field
										name="message"
										label="Post Message"
										as={StyledTextArea}
										error={errors.message && touched.message ? errors.message : null}
										placeholder="Enter Post Message"
									/>

									<ButtonContainer>
										<StyledButton type="submit" label="Post" variant="brand" isLoading={createPostState.isLoading} />
										<StyledLink to="/home">
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

export default CreatePostForm;