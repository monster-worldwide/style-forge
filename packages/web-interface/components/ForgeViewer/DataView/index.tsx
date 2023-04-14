import { Button } from '../../Button';
import styled from 'styled-components';
import { UserDataContext } from '../../UserDataContext';
import { useContext, useEffect, useState } from 'react';
import { loadApiResponse } from '../../../utils/api/load-api-response';
import { loadThemeResult } from '../../../utils/api/load-theme-result';
import { loadIconResult } from '../../../utils/api/load-icon-result';
import { EnvironmentSettings } from '../../layout';
import { loadMetadata } from '../../../utils/api/load-metadata';
import { loadThemeSchema } from '../../../utils/api/load-theme-schema';
import { Icon } from '../../Icon';

type DataViewProps = {
  fileType: 'branch' | 'diff';
  environmentSettings: EnvironmentSettings;
};

const DataViewWindow = styled.div`
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.2);
  background-color: rgb(45, 45, 45);
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  animation: var(--animation-drift-in--long);
`;

const BranchHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem 1rem 1rem;
  min-height: 80px;
  position: sticky;
  top: 0;
  background: rgba(45, 45, 45, 0.8);
  color: white;
  z-index: 1;
  box-shadow: 0 -10px 10px 10px rgba(0, 0, 0, 0.51);
  backdrop-filter: blur(2px);
`;

const DataAction = styled.div`
  flex: 0 0 auto;
`;

const BranchInfo = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BranchType = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  font-size: 1rem;
  opacity: 0.7;
`;
const BranchName = styled.div`
  font-weight: 400;
  font-size: 1.125rem;
`;

const ProcessedOutput = styled.div`
  padding: 2rem;
  height: calc(100% - 5rem);

  animation: var(--animation-drift-in--long);

  overflow: auto;
  /* Custom Scrollbar */
  --scroll-track-color: rgb(45, 45, 45);
  --scroll-thumb-color: rgba(255, 255, 255, 0.1);
  &:hover {
    --scroll-thumb-color: rgba(255, 255, 255, 0.5);
  }
  box-sizing: border-box;
  overflow-x: auto;
  scrollbar-color: var(--scroll-thumb-color) var(--scroll-track-color);
  &::-webkit-scrollbar {
    height: 16px;
    /* height: auto; */
  }
  &::-webkit-scrollbar-track {
    background-color: var(--scroll-track-color);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--scroll-thumb-color);
    border: 5px solid var(--scroll-track-color);
    border-radius: 100px;
  }
`;

const NoDataView = styled.div`
  height: calc(100% - 7rem);
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.02);
  margin: 1rem;
  border: 2px dashed rgba(255, 255, 255, 0.051);
  border-radius: 4px;
  animation: var(--animation-drift-in--long);
  p {
    color: white;
    font-family: monospace;
  }
`;

export const DataView = ({ fileType, environmentSettings }: DataViewProps) => {
  const [userData, dataActions] = useContext(UserDataContext);
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<string | null>(null);

  const resultHandler = (result: any) => {
    if (result) {
      setData(result);
    } else {
      setError('Error loading data. Please try again.');
    }
    dataActions.setParserFinished();
  };

  useEffect(() => {
    if (!userData.figmaApiToken || !userData.fileSelected) {
      return;
    }
    if (userData.runParser && !userData.isParserRunning) {
      dataActions.setParserRunning(true);
      setData(undefined);
      setError(null);
      const key =
        fileType === 'branch'
          ? userData?.fileSelected?.selectedBranch?.key
          : userData?.fileSelected?.diffBranch?.key;
      if (userData.parserOptions.parserType === 'api') {
        if (userData.parserOptions.parserAction === 'data') {
          loadApiResponse(userData.figmaApiToken, String(key)).then(
            resultHandler,
          );
        }
      }
      if (userData.parserOptions.parserType === 'theme') {
        if (userData.parserOptions.parserAction === 'data') {
          loadThemeResult(userData.figmaApiToken, String(key)).then(
            resultHandler,
          );
        }
        if (userData.parserOptions.parserAction === 'metadata') {
          loadMetadata(userData.figmaApiToken, String(key)).then(resultHandler);
        }
        if (userData.parserOptions.parserAction === 'schema') {
          loadThemeSchema(userData.figmaApiToken, String(key)).then(
            resultHandler,
          );
        }
      }
      if (userData.parserOptions.parserType === 'icon') {
        if (userData.parserOptions.parserAction === 'data') {
          loadIconResult(userData.figmaApiToken, String(key)).then(
            resultHandler,
          );
        }
        if (userData.parserOptions.parserAction === 'metadata') {
          loadMetadata(userData.figmaApiToken, String(key)).then(resultHandler);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, fileType]);

  const getDownloadPath = () => {
    const key =
      fileType === 'branch'
        ? userData?.fileSelected?.selectedBranch?.key
        : userData?.fileSelected?.diffBranch?.key;
    if (userData.parserOptions.parserType === 'theme') {
      return `/api/download-theme-result?token=${userData.figmaApiToken}&key=${key}`;
    }
    if (userData.parserOptions.parserType === 'icon') {
      return `/api/download-icon-result?token=${userData.figmaApiToken}&key=${key}`;
    }
    return undefined;
  };

  const displayContent = () => {
    if (error) {
      return <p>{error}</p>;
    }
    if (data) {
      const name = `${userData.parserOptions.parserType}-${userData.parserOptions.parserAction}`;
      const ReactJson = require('react-json-view').default;
      return (
        <ProcessedOutput className='processed-output'>
          <ReactJson
            src={data}
            collapsed={2}
            name={name}
            theme='eighties'
            displayDataTypes={false}
            displayObjectSize={false}
          />
        </ProcessedOutput>
      );
    }
    return (
      <NoDataView>
        {userData.isParserRunning ? <p>Loading...</p> : <p>Ready to forge!</p>}
      </NoDataView>
    );
  };
  const fileName =
    fileType === 'branch'
      ? userData?.fileSelected?.selectedBranch?.name
      : userData?.fileSelected?.diffBranch?.name;
  return (
    <DataViewWindow>
      <BranchHeader>
        <BranchInfo>
          <Icon name='branch' />
          <h2>
            <BranchType>
              {fileType === 'branch' ? 'Baseline' : 'Comparison'} branch{' '}
            </BranchType>
            <BranchName>{fileName}</BranchName>
          </h2>
        </BranchInfo>

        {environmentSettings.showDownload && getDownloadPath() && data && (
          <DataAction>
            <Button variant='primary' as='a' href={getDownloadPath()}>
              <Icon name='download' />
              Download Package
            </Button>
          </DataAction>
        )}
      </BranchHeader>
      {displayContent()}
    </DataViewWindow>
  );
};
