import React from 'react';
import { ButtonMenu, MenuItem, Modal, Button } from "react-rainbow-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { getLoginData } from '../../utils/utility';
import { StyledCard, PostAuthor, PostTitle, MessageContainer, StyledLink, StyledNotification } from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteModalOpen, startPostDelete } from './postDeleteSlice';
import { setPostInfo } from "..//UpdatePostForm/updatePostSlice";

const Post = (props) => {
  const { postId, title, message, author, postType } = props;
  const postInfo = { postId, title, message, author, postType };
  const postDeleteState = useSelector(state => state.postDeleteState);

  const dispatch = useDispatch();
  return (
    <div>
      <StyledCard
        title={
          <span>
            <PostTitle>{title}</PostTitle>
            <PostAuthor>by {author.name}</PostAuthor>
          </span>
        }
        actions={author._id === getLoginData().id ? (
          <ButtonMenu icon={<FontAwesomeIcon icon={faEllipsisV} />} buttonVariant="base" menuSize="x-small" menuAlignment="right">
            <StyledLink to="/update">
              <MenuItem label="Update Post" onClick={() => dispatch(setPostInfo(postInfo))} />
            </StyledLink>
            <MenuItem label="Delete Post"
              onClick={() => {
                dispatch(setDeleteModalOpen({ postId, isDeleteModalOpen: true }));
              }} />
          </ButtonMenu>) : null}>
        <MessageContainer>{message}</MessageContainer>
      </StyledCard>
      {postDeleteState.postId === postId ? (
        <Modal
          title="Confirm Delete"
          isOpen={postDeleteState.isDeleteModalOpen}
          hideCloseButton={true}
          onRequestClose={() => dispatch(setDeleteModalOpen({ postId: null, isDeleteModalOpen: false }))}
          footer={
            <div className="rainbow-flex rainbow-justify_end">
              <Button
                className="rainbow-m-right_large"
                label="Cancel"
                variant="neutral"
                onClick={() => dispatch(setDeleteModalOpen({ postId: null, isDeleteModalOpen: false }))}
                disabled={postDeleteState.isLoading}
              />
              <Button
                label="Delete"
                variant="brand"
                type="submit"
                onClick={() => {
                  dispatch(startPostDelete({ postId: postDeleteState.postId }));
                }}
                disabled={postDeleteState.isLoading}
              />
            </div>
          }
        >        
        {postDeleteState.error && (
          <StyledNotification
            title="An Error Occured"
            hideCloseButton={true}
            description={postDeleteState.error.message}
            icon="error"
          />
        )}
          {postDeleteState.isDeleteSuccess && (
            <StyledNotification
              title="Post Deleted Successfully"
              hideCloseButton={true}
              description="You will be redirected to the homepage shortly"
              icon="success"
            />
          )}
          <h1>
            Are you sure you want to delete this blog post?
        </h1>
        </Modal>
      ) : null}
    </div>
  );
}

export default Post;