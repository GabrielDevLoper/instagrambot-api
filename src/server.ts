import app from "./app";
import "reflect-metadata";
import "./database";
import "dotenv/config";

app.listen(3333, () => {
  console.log("Server is running");
});
