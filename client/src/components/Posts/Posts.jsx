import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './getPostsSlice';
import Post from './Post/Post';
import { AllPostContainer } from "./styles"
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-rainbow-components";

const Posts = () => {
  const getPostsState = useSelector(state => state.getPostsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts({ count: getPostsState.count }));
  }, [])

  const loadMore = () => {
    dispatch(getPosts({ count: getPostsState.count }));
  }
  return (
    <AllPostContainer>
      <InfiniteScroll dataLength={getPostsState.posts.length}
        next={loadMore} hasMore={getPostsState.hasMore} loader={<Spinner size="small" />}>
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
      </InfiniteScroll>

    </AllPostContainer>
  );
}

export default Posts;
