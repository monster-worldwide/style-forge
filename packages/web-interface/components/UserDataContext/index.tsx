import React, { createContext, useEffect, useState } from 'react';

type FigmaFileBranch = {
  key: string;
  name: string;
};

type ApiParserOptions = {
  parserType: 'api';
  parserAction: 'data';
};

type ThemeParserOptions = {
  parserType: 'theme';
  parserAction: 'data' | 'metadata' | 'schema';
};

type IconParserOptions = {
  parserType: 'icon';
  parserAction: 'data' | 'metadata';
};

type ParserOptions = ApiParserOptions | ThemeParserOptions | IconParserOptions;

export type UserFigmaFile = {
  fileKey: string;
  name: string;
  selectedBranch: FigmaFileBranch;
  diffBranch?: FigmaFileBranch;
  branches: FigmaFileBranch[];
};

export type UserDataContextType = {
  figmaApiToken: string;
  fileSelected?: UserFigmaFile;
  parserOptions: ParserOptions;
  runParser: boolean;
  isParserRunning: boolean;
  recentFiles: UserFigmaFile[];
};

type UserDataContextActions = {
  storeToken: (token: string) => void;
  selectFile: (file: UserFigmaFile) => void;
  clear: () => void;
  selectBranch: (branch: FigmaFileBranch) => void;
  selectDiffBranch: (branch: FigmaFileBranch | undefined) => void;
  setParserOptions: (options: ParserOptions) => void;
  setParserRunning: (value: boolean) => void;
  setParserFinished: () => void;
};

const defaultUserDataContextActions = {
  storeToken: () => {},
  selectFile: () => {},
  clear: () => {},
  selectBranch: () => {},
  selectDiffBranch: () => {},
  setParserOptions: () => {},
  setParserRunning: () => {},
  setParserFinished: () => {},
};

export const defaultUserDataContext: UserDataContextType = {
  figmaApiToken: '',
  parserOptions: {
    parserAction: 'data',
    parserType: 'theme',
  },
  runParser: false,
  isParserRunning: false,
  recentFiles: [],
};

export const UserDataContext = createContext<
  [UserDataContextType, UserDataContextActions]
>([defaultUserDataContext, defaultUserDataContextActions]);

export const UserDataProvider = (props: JSX.IntrinsicElements['div']) => {
  const [userData, setUserData] = useState<UserDataContextType>(
    defaultUserDataContext,
  );
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    setUserData(JSON.parse(userData || '{}') || defaultUserDataContext);
  }, []);

  const storeToken = (token: string) => {
    const newData = { ...userData, figmaApiToken: token };
    localStorage.setItem('userData', JSON.stringify(newData));
    setUserData(newData);
  };

  const selectFile = (file: UserFigmaFile) => {
    const uniqueRecentFiles = userData?.recentFiles || [];
    if (!uniqueRecentFiles.find((f) => f.fileKey === file.fileKey)) {
      uniqueRecentFiles.unshift(file);
    }

    const newData = {
      ...userData,
      fileSelected: {
        ...file,
        selectedBranch: { key: file.fileKey, name: 'Main' },
      },
      parserOptions: {
        parserAction: 'data',
        parserType: 'theme',
      },
      runParser: false,
      isParserRunning: false,
      recentFiles: uniqueRecentFiles.slice(0, 4),
    } as UserDataContextType;
    localStorage.setItem('userData', JSON.stringify(newData));
    setUserData(newData);
  };

  const clear = () => {
    localStorage.setItem('userData', JSON.stringify(defaultUserDataContext));
    setUserData(defaultUserDataContext);
  };

  const setParserOptions = (options: ParserOptions) => {
    const newData = {
      ...userData,
      parserOptions: options,
      runParser: true,
    } as UserDataContextType;
    localStorage.setItem('userData', JSON.stringify(newData));
    setUserData(newData);
  };

  const setParserFinished = () => {
    const newData = {
      ...userData,
      runParser: false,
      isParserRunning: false,
    } as UserDataContextType;
    localStorage.setItem('userData', JSON.stringify(newData));
    setUserData(newData);
  };

  const setParserRunning = (value: boolean) => {
    const newData = {
      ...userData,
      isParserRunning: value,
    } as UserDataContextType;
    localStorage.setItem('userData', JSON.stringify(newData));
    setUserData(newData);
  };

  const selectBranch = (branch: FigmaFileBranch) => {
    const newData = {
      ...userData,
      fileSelected: { ...userData.fileSelected, selectedBranch: branch },
    } as UserDataContextType;
    localStorage.setItem('userData', JSON.stringify(newData));
    setUserData(newData);
  };

  const selectDiffBranch = (branch: FigmaFileBranch | undefined) => {
    const newData = {
      ...userData,
      fileSelected: { ...userData.fileSelected, diffBranch: branch },
    } as UserDataContextType;
    localStorage.setItem('userData', JSON.stringify(newData));
    setUserData(newData);
  };

  return (
    <UserDataContext.Provider
      value={[
        userData,
        {
          storeToken,
          selectFile,
          clear,
          selectBranch,
          selectDiffBranch,
          setParserOptions,
          setParserFinished,
          setParserRunning,
        },
      ]}
    >
      {props.children}
    </UserDataContext.Provider>
  );
};
