import dotenv from "dotenv";
import app from "./app.js";
import ConnectDb from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || "3000";

ConnectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Mongodb connection Failed ❌", error);
    process.exit(1);
  });
