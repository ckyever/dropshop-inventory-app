import express from "express";
import path from "node:path";
import { homeRouter } from "./routes/homeRouter.js";
import { productsRouter } from "./routes/productsRouter.js";

const currentDirectory = process.cwd();
const app = express();

app.set("views", path.join(currentDirectory, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(currentDirectory, "public");
app.use(express.static(assetsPath));

app.use("/", homeRouter);
app.use("/products", productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Last updated ${new Date().toISOString()}`);
});
