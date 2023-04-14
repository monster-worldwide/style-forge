import React from 'react';
import { Layout } from '../components/layout';
import { NextPage } from 'next';

type PageProps = {
  showDownload: boolean;
};

const Page: NextPage<PageProps> = ({ showDownload }) => {
  return <Layout environmentSettings={{ showDownload }} />;
};

Page.getInitialProps = async () => {
  return {
    showDownload: process.env.BUILD === 'server',
  };
};

export default Page;
