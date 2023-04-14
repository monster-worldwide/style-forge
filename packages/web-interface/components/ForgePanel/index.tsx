import React, { useContext, useState } from 'react';
import { UserDataContext } from '../UserDataContext';
import { GetStartedStep } from '../data-collection/01-get-started';
import { SelectFileStep } from '../data-collection/02-select-file';
import { Button } from '../Button';
import styled from 'styled-components';
import { PanelBody } from './PanelBody';

const StyledPanel = styled.div<{ hasUserProvidedFileData: Boolean }>`
  display: grid;
  /* gap: 1rem;å */
  grid-template-rows: min-content 1fr min-content;
  grid-column: ${({ hasUserProvidedFileData }) =>
    hasUserProvidedFileData ? '1 / 2' : '1 / -1'};
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  animation: var(--animation-drift-in--long);
`;

const PanelBranding = styled.div`
  padding: 1rem;
`;

const PanelFooter = styled.div`
  padding: 1rem;
`;

export const ForgePanel = () => {
  const [userData, dataActions] = useContext(UserDataContext);
  const [panelView, setPanelView] = useState<
    'default' | 'file' | 'branch' | 'diffBranch'
  >('default');

  const cleanLocalStorage = () => {
    dataActions.clear();
  };

  return (
    <StyledPanel
      hasUserProvidedFileData={Boolean(
        userData.figmaApiToken && userData.fileSelected,
      )}
    >
      <PanelBranding>
        <h1>Style Forge</h1>
      </PanelBranding>

      {!userData.figmaApiToken && <GetStartedStep />}
      {userData.figmaApiToken && !userData.fileSelected && <SelectFileStep />}
      {userData.figmaApiToken && userData.fileSelected && (
        <>
          <PanelBody panelView={panelView} setPanelView={setPanelView} />
          <PanelFooter>
            <Button variant='tertiary' onClick={cleanLocalStorage}>
              Reset my Figma personal access token
            </Button>
          </PanelFooter>
        </>
      )}
    </StyledPanel>
  );
};

// <BackgroundImageWrapper>
//   {/* eslint-disable-next-line @next/next/no-img-element */}
//   <img src='/flames.svg' alt='flames' height={1755} width={1262} />
// </BackgroundImageWrapper>

// const BackgroundImageWrapper = styled.div`
//   position: absolute;
//   top: 0;
//   background: #e9e7f7;
//   background: white;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   overflow: hidden;
//   display: grid;
//   place-content: center;
//   opacity: 1;
//   z-index: -1;

//   > * {
//     transform: scale(5);
//     opacity: 0.25;
//     filter: blur(10px);
//     animation: moveIt 60s ease-in-out infinite both alternate;
//   }

//   @keyframes moveIt {
//     from {
//       transform: scale(5) rotate(0);
//     }
//     to {
//       transform: scale(6) rotate(400deg);
//     }
//   }
// `;
