/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TitleH2Styled } from '../../styled';
import { MainStyled, PageContainerStyled } from './styled';
import Header from '../../components/Header';
import PostsList from '../../components/PostsList';

export default function UserPage() {
  const { id } = useParams();

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState(null);
  const [errorPosts, setErrorPosts] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/search/user/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/search/posts/${id}`)
      .then((res) => {
        setPosts(res.data);
        setLoadingPosts(null);
      })
      .catch((error) => {
        setLoadingPosts(null);
        setErrorPosts(error);
      });
  }, [id]);

  return (
    <>
      <Header />
      <PageContainerStyled>
        <MainStyled>
          <TitleH2Styled>
            {user ? user?.name : 'User'}
            &apos;s posts
          </TitleH2Styled>
          <PostsList posts={posts} error={errorPosts} loading={loadingPosts} />
        </MainStyled>
      </PageContainerStyled>
    </>
  );
}