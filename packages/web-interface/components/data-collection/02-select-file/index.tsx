import React, { useContext, useState } from 'react';
import { FormControl } from '../../FormControl';
import { Button } from '../../Button';
import { UserDataContext } from '../../UserDataContext';
import { PageWrapper } from '../data.collection.style';
import { Form } from '../../Form';
import { Error } from '../../Error';
import { loadFileHeader } from '../../../utils/api/load-file-header';
import { Icon } from '../../Icon';

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

  return (
    <PageWrapper>
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
        <Button
          type='submit'
          variant='primary'
          disabled={isLoading}
          isLoading={isLoading}
        >
          {isLoading ? 'Loading...' : "I'm ready to Forge"}
        </Button>
        <Button
          as='a'
          target='_blank'
          rel='noopener noreferrer'
          href='https://help.figma.com/hc/en-us/articles/360040531773-Share-files-and-prototypes'
          variant='tertiary'
        >
          How do I find the share URL for my Figma file?
        </Button>
      </Form>
    </PageWrapper>
  );
};
