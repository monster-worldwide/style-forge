import React, { useContext } from 'react';
import { UserDataContext } from '../UserDataContext';
import styled from 'styled-components';

import { DataView } from './DataView';
import { EnvironmentSettings } from '../layout';

const ViewerPanel = styled.div<{ isDiffed: boolean }>`
  overflow: hidden;
  line-height: 1.3;
  height: 100%;
  overflow: hidden;
  gap: 1rem;
  padding: 1rem 1rem 1rem 0;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: ${({ isDiffed }) => (isDiffed ? '1fr 1fr' : '1fr')};
`;

export const ForgeViewer = ({
  environmentSettings,
}: {
  environmentSettings: EnvironmentSettings;
}) => {
  const [userData] = useContext(UserDataContext);

  if (userData.figmaApiToken && userData.fileSelected) {
    return (
      <ViewerPanel isDiffed={Boolean(userData.fileSelected?.diffBranch)}>
        <DataView fileType='branch' environmentSettings={environmentSettings} />
        {userData.fileSelected?.diffBranch && (
          <DataView fileType='diff' environmentSettings={environmentSettings} />
        )}
      </ViewerPanel>
    );
  } else {
    return null;
  }
};
