import React from 'react';
import { UserDataProvider } from '../UserDataContext';
import { ForgePanel } from '../ForgePanel';
import { ForgeViewer } from '../ForgeViewer';
import styled, { createGlobalStyle } from 'styled-components';

import 'modern-css-reset/dist/reset.min.css';

const GlobalStyles = createGlobalStyle`
  :root {
    --animation-drift-in--long: fade-in--long 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
    --animation-drift-in--short: fade-in--short 250ms cubic-bezier(0.25, 1, 0.5, 1);
  }
  
  body {
    background: #5a2f9f19;
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    color: #212121;
  }

  * { 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  

  *:focus {
    outline: 2px solid #6E46AE;
    outline-offset: 3px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    letter-spacing: -0.025em;
    font-size: 1.5rem;
  }

  p, label {
    font-size: 1.125rem;
  }

  a {
    color: #6E46AE;
    text-decoration: none;
    font-weight: 600;
    border-radius: 1px;
    font-size: 0.875rem;
  }
  
  @keyframes fade-in--long {
    from {
      transform: translateY(100px);
      /* opacity: 0; */
    }
    to {
      transform: translateY(0px);
      /* opacity: 1; */
    }
  }
  
  @keyframes fade-in--short {
    from {
      transform: translateY(10px);
      /* opacity: 0; */
    }
    to {
      transform: translateY(0px);
      /* opacity: 1; */
    }
  }
`;
const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 300px 1fr;
  }
`;

export type EnvironmentSettings = {
  showDownload: boolean;
};

export const Layout = ({
  environmentSettings,
}: {
  environmentSettings: EnvironmentSettings;
}) => {
  return (
    <>
      <GlobalStyles />
      <UserDataProvider>
        <Container>
          <ForgePanel />
          <ForgeViewer environmentSettings={environmentSettings} />
        </Container>
      </UserDataProvider>
    </>
  );
};
