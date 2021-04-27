import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './getPostsSlice';
import Post from './Post/Post';
import { AllPostContainer } from "./styles"

const Posts = () => {
  const getPostsState = useSelector(state => state.getPostsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [])
  return (
    <AllPostContainer>
      {getPostsState.posts.map((post) => (
        <div key={post._id}>
          <Post
            postId={post._id}
            title={post.title}
            message={post.message}
            author={post.author}
            postType={post.postType} />
        </div>

      ))}
    </AllPostContainer>
  );
}

export default Posts;
