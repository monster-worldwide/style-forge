import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserDataContext } from '../../UserDataContext';
import { FormControl } from '../../FormControl';
import { Button, ButtonGroup, ButtonStack } from '../../Button';
import { loadFileHeader } from '../../../utils/api/load-file-header';
import { loadRecentFileHeader } from '../../../utils/api/load-recent-file-header';
import { Error } from '../../Error';
import { Icon } from '../../Icon';

const PanelBodyWrapper = styled.div`
  overflow: auto;
  height: 100%;
  border-top: 1px solid #6e46ae23;
`;

const PanelEditView = styled.div`
  animation: var(--animation-drift-in--short);
`;

const Section = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #6e46ae23;
  display: grid;
  gap: 0.5rem;
  label,
  h2,
  textarea,
  p {
    font-size: 0.875rem;
  }
  button {
    text-align: left;
  }
`;

const PickList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
`;
const PickItem = styled(Button)`
  text-align: left;
`;

export const PanelBody = ({
  panelView,
  setPanelView,
}: {
  panelView: 'default' | 'file' | 'branch' | 'diffBranch';
  setPanelView: (view: 'default' | 'file' | 'branch' | 'diffBranch') => void;
}) => {
  const [userData, dataActions] = useContext(UserDataContext);
  const [parserType, setParserType] = useState<'theme' | 'icon' | 'api'>(
    userData?.parserOptions?.parserType || 'theme',
  );
  const [fileUrl, setFile] = useState('');
  const [error, setError] = useState('');
  const [isFileLoading, setIsFileLoading] = useState(false);

  const { fileSelected } = userData;
  const currentSelectedBranchName = fileSelected?.selectedBranch?.name;
  const currentDiffBranchName = fileSelected?.diffBranch?.name;

  const storeFileData = async () => {
    setIsFileLoading(true);
    loadFileHeader(userData.figmaApiToken, fileUrl).then((result) => {
      setIsFileLoading(false);
      if (result) {
        dataActions.selectFile(result);
        setPanelView('default');
      } else {
        setError('Whoops! Your URL might have a typo. Please try again.');
      }
    });
  };

  const loadRecentFile = async (fileKey: string) => {
    setIsFileLoading(true);
    loadRecentFileHeader(userData.figmaApiToken, fileKey).then((result) => {
      setIsFileLoading(false);
      if (result) {
        dataActions.selectFile(result);
        setPanelView('default');
      } else {
        setError(
          'There was an error loading your file. Please make sure the file is accessible with your personal access token.',
        );
      }
    });
  };

  const displayError = () => {
    return <Error message={error} />;
  };

  const defaultView = () => (
    <>
      <Section>
        <h2>Figma file</h2>
        <Button variant='secondary' onClick={() => setPanelView('file')}>
          {fileSelected?.name}
        </Button>
      </Section>
      <Section>
        <h2>Baseline branch</h2>
        <Button variant='secondary' onClick={() => setPanelView('branch')}>
          {currentSelectedBranchName}
        </Button>
      </Section>
      <Section>
        {currentDiffBranchName ? (
          <>
            <h2>Comparison branch</h2>
            <ButtonGroup>
              <Button
                variant='secondary'
                onClick={() => setPanelView('diffBranch')}
              >
                {currentDiffBranchName || 'Select Diff Branch'}
              </Button>
              <Button
                variant='secondary'
                onClick={() => dataActions.selectDiffBranch(undefined)}
                aria-label='Clear diff branch'
              >
                <Icon name='close' styles={{ margin: '0' }} />
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <Button
              variant='tertiary'
              onClick={() => setPanelView('diffBranch')}
            >
              {currentDiffBranchName || 'Select a branch to compare'}
            </Button>
          </>
        )}
      </Section>

      <Section>
        <h2>Data type</h2>
        <select
          id='typeSelect'
          onChange={(event) => setParserType(event.target.value as any)}
          style={{
            padding: '3px 8px',
            border: '1px solid #6e46ae45',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#6e46ae',
          }}
        >
          <option value='theme' selected={parserType === 'theme'}>
            Theme
          </option>
          <option value='icon' selected={parserType === 'icon'}>
            Icons
          </option>
          <option value='api' selected={parserType === 'api'}>
            Figma API
          </option>
        </select>
        {parserType === 'api' && (
          <ButtonStack>
            <Button
              variant='primary'
              onClick={() =>
                dataActions.setParserOptions({
                  parserType: 'api',
                  parserAction: 'data',
                })
              }
            >
              <Icon name='api' />
              Get API
            </Button>
          </ButtonStack>
        )}
        {parserType === 'icon' && (
          <ButtonStack>
            <Button
              variant='primary'
              onClick={() =>
                dataActions.setParserOptions({
                  parserType: 'icon',
                  parserAction: 'data',
                })
              }
            >
              <Icon name='icons' />
              Forge icons
            </Button>
            <Button
              variant='primary'
              onClick={() =>
                dataActions.setParserOptions({
                  parserType: 'icon',
                  parserAction: 'metadata',
                })
              }
            >
              <Icon name='api' />
              View icon metadata
            </Button>
          </ButtonStack>
        )}
        {parserType === 'theme' && (
          <ButtonStack>
            <Button
              variant='primary'
              onClick={() =>
                dataActions.setParserOptions({
                  parserType: 'theme',
                  parserAction: 'data',
                })
              }
            >
              <Icon name='theme' />
              Forge theme
            </Button>
            <Button
              variant='primary'
              onClick={() =>
                dataActions.setParserOptions({
                  parserType: 'theme',
                  parserAction: 'schema',
                })
              }
            >
              <Icon name='api' />
              Forge schema
            </Button>
            <Button
              variant='primary'
              onClick={() =>
                dataActions.setParserOptions({
                  parserType: 'theme',
                  parserAction: 'metadata',
                })
              }
            >
              <Icon name='api' />
              View metadata
            </Button>
          </ButtonStack>
        )}
      </Section>
    </>
  );

  const fileSelectorView = () => (
    <PanelEditView>
      <Section>
        <Button variant='secondary' onClick={() => setPanelView('default')}>
          Back
        </Button>
      </Section>
      <Section>
        <h2>Current file</h2>
        <div>{fileSelected?.name}</div>
      </Section>
      <Section>
        <h2>Add a new Figma file</h2>
        <FormControl
          controlType='textarea'
          id='file'
          label='Share Url'
          value={fileUrl}
          onChange={(event) => setFile(event.target.value)}
        />
        {error && displayError()}
        <Button
          as='a'
          target='_blank'
          rel='noopener noreferrer'
          href='https://help.figma.com/hc/en-us/articles/360040531773-Share-files-and-prototypes'
          variant='tertiary'
        >
          How do I find the share URL for my Figma file?
        </Button>
        <Button
          onClick={storeFileData}
          variant='primary'
          disabled={isFileLoading}
        >
          {isFileLoading ? 'Loading...' : 'Add new file'}
        </Button>
      </Section>
      <Section>
        <h2>Recently viewed Figma files</h2>
        {userData.recentFiles?.map((file) => (
          <Button
            key={file.fileKey}
            variant='secondary'
            onClick={() => loadRecentFile(file.fileKey)}
          >
            {file.name}
          </Button>
        ))}
      </Section>
    </PanelEditView>
  );

  const branchSelectorView = (branchType: 'selectedBranch' | 'diffBranch') => {
    const select = (branch: any) => {
      if (branchType === 'selectedBranch') {
        dataActions.selectBranch(branch);
      }
      if (branchType === 'diffBranch') {
        dataActions.selectDiffBranch(branch);
      }

      setPanelView('default');
    };

    return (
      <PanelEditView>
        <Section>
          <Button variant='secondary' onClick={() => setPanelView('default')}>
            Back
          </Button>
        </Section>
        {fileSelected?.[branchType]?.name && (
          <Section>
            <h2>
              Current {branchType === 'diffBranch' ? 'comparison' : 'baseline'}{' '}
              branch
            </h2>
            <p>{String(fileSelected?.[branchType]?.name)}</p>
          </Section>
        )}
        <Section>
          <h2>Select a branch</h2>
          <PickList>
            <PickItem
              variant='tertiary'
              disabled={
                currentSelectedBranchName === 'main' ||
                currentDiffBranchName === 'main'
              }
              onClick={() =>
                select({
                  key: fileSelected?.fileKey || '',
                  name: 'main',
                })
              }
            >
              Main
            </PickItem>
            {fileSelected?.branches.map((branch) => (
              <PickItem
                variant='tertiary'
                disabled={
                  currentSelectedBranchName === branch.name ||
                  currentDiffBranchName === branch.name
                }
                key={`pick-${branch.key}`}
                onClick={() => select(branch)}
              >
                {branch.name}
              </PickItem>
            ))}
          </PickList>
        </Section>
      </PanelEditView>
    );
  };

  return (
    <PanelBodyWrapper>
      {panelView === 'default' && defaultView()}
      {panelView === 'file' && fileSelectorView()}
      {panelView === 'branch' && branchSelectorView('selectedBranch')}
      {panelView === 'diffBranch' && branchSelectorView('diffBranch')}
    </PanelBodyWrapper>
  );
};
