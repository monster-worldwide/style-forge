import { NextApiRequest, NextApiResponse } from 'next';
import archiver from 'archiver';
import { StyleForge } from '@monsterww/style-forge';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token, key } = req.query;
  if (Array.isArray(token) || !token) {
    throw new Error('Expected token to be a string, got an array or missing.');
  }
  if (Array.isArray(key) || !key) {
    throw new Error(
      'Expected projectKey to be a string, got an array or missing.',
    );
  }
  const parseResult = await StyleForge.getThemeData(token, key);
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=theme.zip');
  (
    StyleForge.createThemePackage(parseResult, {
      outputType: 'zip',
      packageName: 'theme-package',
      version: '0.1.0',
    }) as archiver.Archiver
  ).pipe(res);
};

export default handler;
