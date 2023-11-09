import app from "./app.js";
import databaseInit from "./database/databaseinit.js";
import { PORT } from './constants.js'

databaseInit();

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})

