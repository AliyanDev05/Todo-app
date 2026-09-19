import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
