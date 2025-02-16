import express, { Request, Response } from 'express';
import { BlobServiceClient } from '@azure/storage-blob';
import { ClientSecretCredential } from '@azure/identity';
const router = express.Router();

router.get('/', function(req: Request, res: Response, next: Function) {
  const tenantId = 'TENANT_ID';
  const clientId = 'CLIENT_ID';

  const clientSecretValue = 'CLIENT_SECRET_VALUE';

  const storageAccountName = 'STORAGE_ACCOUNT_NAME';
  
  const credential = new ClientSecretCredential(tenantId, clientId, clientSecretValue);
  const blobServiceClient = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net`,
    credential
  );

  async function listBlobsInDirectory() {
    const containerClient = blobServiceClient.getContainerClient('test');
    for await (const blob of containerClient.listBlobsByHierarchy('/', { prefix: 'videos/' })) {
      console.log(`Blob: ${blob.name}`);
    }
  }

  listBlobsInDirectory();

  res.send(200);
});

export default router;
