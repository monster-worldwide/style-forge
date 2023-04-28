import React, { useContext, useState } from 'react';
import { FormControl } from '../../FormControl';
import { Button } from '../../Button';
import { UserDataContext } from '../../UserDataContext';
import { PageWrapper } from '../data.collection.style';
import { Form } from '../../Form';
import { Error } from '../../Error';
import { loadFileHeader } from '../../../utils/api/load-file-header';
import { Icon } from '../../Icon';
import { Loader } from '../../Loader';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  margin-top: 10vh;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SelectFileStep = () => {
  const [userData, dataActions] = useContext(UserDataContext);
  const [fileUrl, setFile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const storeFileData = async () => {
    if (!fileUrl) {
      setError('Please enter URL.');
      return;
    }
    setIsLoading(true);
    loadFileHeader(userData.figmaApiToken, fileUrl).then((result) => {
      if (result) {
        dataActions.selectFile(result);
      } else {
        setError(
          'Whoops! Your URL might have a typo, or your Personal Access Token may be invalid. Please try again.',
        );
      }
    });
  };

  const forgeSampleFile = () => {
    setIsLoading(true);

    loadFileHeader(
      userData.figmaApiToken,
      'https://www.figma.com/file/6bJzXzTDnsF49mwbNNSKpI/Style-Forge-Demo-File?node-id=0%3A1&t=0TideCUaNmRe4uNV-1',
    ).then((result) => result && dataActions.selectFile(result));
  };

  return (
    <PageWrapper>
      {!error && isLoading ? (
        <LoaderWrapper>
          <Loader
            firstMessage='Authenticating with Figma'
            secondMessage='Fetching your file data'
            thirdMessage='Almost done'
          />
        </LoaderWrapper>
      ) : (
        <>
          <Button onClick={() => dataActions.clear()} variant='tertiary'>
            <Icon name='back' />
            Go Back
          </Button>
          <h2>One more thing!</h2>
          <p>
            Please enter the share URL of the Figma file that you want to run
            through the forge.
          </p>

          <Form onSubmit={storeFileData}>
            <Button
              as='a'
              target='_blank'
              rel='noopener noreferrer'
              href='https://help.figma.com/hc/en-us/articles/360040531773-Share-files-and-prototypes'
              variant='tertiary'
            >
              How do I find the share URL for my Figma file?
            </Button>
            <FormControl
              controlType='textarea'
              id='file'
              label='Figma File Share Url'
              value={fileUrl}
              disabled={isLoading}
              onChange={(event) => {
                setError('');
                setFile(event.target.value);
              }}
            />

            {error && <Error message={error} />}
            <ButtonGroup>
              <Button
                type='submit'
                variant='primary'
                disabled={isLoading}
                isLoading={isLoading}
              >
                {isLoading ? 'Loading...' : "I'm ready to Forge"}
              </Button>
              <Button
                type='button'
                variant='tertiary'
                onClick={forgeSampleFile}
              >
                Forge a Sample File
              </Button>
            </ButtonGroup>
          </Form>
        </>
      )}
    </PageWrapper>
  );
};
