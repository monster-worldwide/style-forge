import React, { useContext, useState } from 'react';
import { Button } from '../../Button';
import { UserDataContext } from '../../UserDataContext';

import { FormControl } from '../../FormControl';
import { Form } from '../../Form';
import { PageWrapper } from '../data.collection.style';
import { Error } from '../../Error';

export const GetStartedStep = () => {
  const [_, dataActions] = useContext(UserDataContext);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const storeToken = () => {
    dataActions.storeToken(token);
    !token && setError('Please enter a token.');
  };

  return (
    <PageWrapper>
      <h2>Get started</h2>
      <p>
        To enter the Style Forge, we need your Figma Personal Access Token for
        authentication.
      </p>
      <Button
        target='_blank'
        rel='noopener noreferrer'
        as='a'
        href='https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens'
        variant='tertiary'
      >
        How do I generate a personal access token?
      </Button>

      <Form onSubmit={storeToken}>
        <FormControl
          id='token'
          label='Personal Access Token'
          helpText='We send your token to Figma and store it locally in your browser.'
          value={token}
          onChange={(event) => setToken(event.target.value)}
          autoComplete='off'
        />
        {error && <Error message={error} />}

        <Button type='submit' variant='primary'>
          Submit Token
        </Button>
      </Form>
    </PageWrapper>
  );
};
