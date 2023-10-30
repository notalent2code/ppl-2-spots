import app from '../src/app';
import pactum from 'pactum';

export const setupTestEnivironment = async () => {
  const port = 5555;

  app.listen(port, () => {
    console.log(`Testing server is running on port ${port}`);
  });

  pactum.request.setDefaultTimeout(10000);
  pactum.request.setBaseUrl(`http://localhost:${port}`);
}

// export const teardownTestEnvironment = async () => {
  
// }