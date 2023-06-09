import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InputContainer,
  MainContainer,
  PageTitle,
} from '../components/InitialScreen/styled';
import client from '../services/api/api.client';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const templateSignUp = {
    email,
    password,
    name,
    photo,
  };

  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (token) {
      navigate('/timeline');
    }
  });

  function createAccount(event) {
    event.preventDefault();
    setIsSubmitting(true);
    client
      .post('/sign-up', templateSignUp)
      .then(() => {
        setIsSubmitting(false);
        navigate('/');
      })
      .catch((error) => {
        setIsSubmitting(false);
        alert(error.response.data);
      });
  }

  return (
    <MainContainer>
      <PageTitle>
        <h1> linkr </h1>
        <h2> save, share and discover the best links on the web </h2>
      </PageTitle>
      <InputContainer>
        <form>
          <input
            required
            placeholder="e-mail"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            data-test="email"
          />
          <input
            required
            placeholder="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            data-test="password"
          />
          <input
            required
            placeholder="username"
            type="text"
            onChange={(event) => setName(event.target.value)}
            data-test="username"
          />
          <input
            required
            placeholder="picture url"
            type="url"
            onChange={(event) => setPhoto(event.target.value)}
            data-test="picture-url"
          />
          <button data-test="sign-up-btn" type="submit" onClick={createAccount}>
            Sign Up
          </button>
        </form>
        <button
          disabled={isSubmitting}
          type="button"
          onClick={() => navigate('/')}
          data-test="login-link"
        >
          Switch back to log in
        </button>
      </InputContainer>
    </MainContainer>
  );
}
