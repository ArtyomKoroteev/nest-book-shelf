import { Inject, Injectable } from '@nestjs/common';
import { BlobServiceClient, RestError } from '@azure/storage-blob';
import { MODULE_OPTIONS_TOKEN } from './azure-blob.module-definition';
import { AzureBlobOptions } from './types';

@Injectable()
export class AzureBlobService {
  private blobClientService: BlobServiceClient;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private options: AzureBlobOptions,
  ) {
    this.initAzureBlob();
  }

  private getContainer(containerName: string) {
    return this.blobClientService.getContainerClient(containerName);
  }

  private initAzureBlob() {
    this.blobClientService = BlobServiceClient.fromConnectionString(
      this.options.connectionString,
    );
  }

  async getBlobData(blobName: string, containerName: string) {
    try {
      const blobContainer = this.getContainer(containerName);
      const blobClient = blobContainer.getBlobClient(blobName);
      const downloadBlockBlobResponse = await blobClient.download();
      return downloadBlockBlobResponse.readableStreamBody;
    } catch (e) {
      if (e instanceof RestError) {
        throw new Error(e.message + e.statusCode);
      }

      throw e;
    }
  }

  async setBlobData(
    containerName: string,
    blobName: string,
    itemContent: string | Buffer,
  ) {
    try {
      const blobContainer = this.getContainer(containerName);
      await blobContainer.uploadBlockBlob(
        blobName,
        itemContent,
        Buffer.byteLength(itemContent),
      );
    } catch (e) {
      if (e instanceof RestError) {
        throw new Error(e.message + e.statusCode);
      }

      if (e instanceof Error) {
        throw new Error(e.message);
      }

      throw e;
    }
  }

  getBlobUrl(containerName: string, blobName: string): string {
    const blobContainer = this.getContainer(containerName);
    const blobClient = blobContainer.getBlobClient(blobName);
    return blobClient.url;
  }
}
