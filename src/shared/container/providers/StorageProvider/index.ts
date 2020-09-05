import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStrorageProvider from './implementations/DiskStorageProvider';

const providers = {
  diskStorage: DiskStrorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.diskStorage,
);
