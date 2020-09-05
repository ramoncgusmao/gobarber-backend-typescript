import { container } from 'tsyringe';

import uploadConfig from '@config/upload';
import IStorageProvider from './models/IStorageProvider';
import DiskStrorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStrorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
