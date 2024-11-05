import express from "express";
import { connectDB } from "./config/db.js";
import router from "./routes/signup.routes.js";

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(5000, () => {
    connectDB();
    console.log(`Server started at http://localhost:5000`);
});
