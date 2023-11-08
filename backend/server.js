import app from "./app.js";
// import databaseInit from "./database/databaseinit.js";
import { PORT } from './constants.js';

// databaseInit();

import { sequelize } from './database/connection2.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('mysl Db connection successful');
  } catch (err) {
    console.log('Database connection error!', err);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})


