import dotenv from 'dotenv';

dotenv.config();

import { ApiServer } from './api-server';

const apiServer = new ApiServer();
apiServer.start();
