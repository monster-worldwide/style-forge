import React, { useContext, useState } from 'react';
import { UserDataContext } from '../UserDataContext';
import { GetStartedStep } from '../data-collection/01-get-started';
import { SelectFileStep } from '../data-collection/02-select-file';
import { Button } from '../Button';
import styled from 'styled-components';
import { PanelBody } from './PanelBody';
import { Logo } from '../Logo';
import { Icon } from '../Icon';

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
  max-width: 220px;
`;

const PanelFooter = styled.div``;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  padding-bottom: 1rem;
`;

export const Section = styled.div`
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
        <Logo />
      </PanelBranding>

      {!userData.figmaApiToken && <GetStartedStep />}
      {userData.figmaApiToken && !userData.fileSelected && <SelectFileStep />}
      {userData.figmaApiToken && userData.fileSelected && (
        <>
          <PanelBody panelView={panelView} setPanelView={setPanelView} />
          <PanelFooter>
            <Section>
              <Button variant='tertiary' onClick={cleanLocalStorage}>
                Reset my Figma personal access token
              </Button>
            </Section>
            <Section>
              <FooterLinks>
                <Button
                  variant='tertiary'
                  as='a'
                  href='https://github.com/monster-worldwide/style-forge/blob/main/LICENSE'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  &copy; 2023 Monster Worldwide, Inc.
                </Button>
                <Button
                  variant='tertiary'
                  as='a'
                  href='https://github.com/monster-worldwide/style-forge'
                  target='_blank'
                  rel='noopener noreferrer'
                  title='View Style Forge on GitHub'
                  aria-label='View Style Forge on GitHub'
                >
                  <Icon name='gitHub' styles={{ margin: '.25em' }} />
                </Button>
              </FooterLinks>
            </Section>
          </PanelFooter>
        </>
      )}
    </StyledPanel>
  );
};
