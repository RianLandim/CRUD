import express from 'express';
import routes from './src/routes/routes';

import './src/database/connection';

const app = express();

app.use(express.json());
app.use(routes);

const port = 3000
app.listen(port, () => {
    console.log("✅ API running!")
});