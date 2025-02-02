import { ConfigurableModuleBuilder } from '@nestjs/common';
import { AzureBlobOptions } from './types';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AzureBlobOptions>().build();
