import { Module } from '@nestjs/common';
import { AzureBlobService } from './azure-blob.service';
import { ConfigurableModuleClass } from './azure-blob.module-definition';

@Module({
  providers: [AzureBlobService],
  exports: [AzureBlobService],
})
export class AzureBlobModule extends ConfigurableModuleClass {}
