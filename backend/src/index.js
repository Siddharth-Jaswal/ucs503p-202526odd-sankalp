import { app } from "./app.js";
import { connectDb } from "./db/mongodb.js";
import dotenv from "dotenv";
import { telegramSetup } from "./services/telegram.service.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDb()
  .then(
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
      telegramSetup();
    })
  )
  .catch((err) => {
    console.log(err);
  });
