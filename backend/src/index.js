import {app} from "./app.js";
import {connectDb} from "./db/mongodb.js";
import dotenv from "dotenv";
import { whatsappSetup } from "./services/whatsapp.service.js";

dotenv.config({
    path: './.env'
});
const port=3000;

connectDb()
.then(
    app.listen(port,()=>{
        console.log(`Listening at port ${port}`);
        whatsappSetup();
    })
)
.catch((err)=>{
    console.log(err);
});

