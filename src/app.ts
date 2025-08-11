import express from "express";
import "express-async-errors";
import { routes } from "./routes/index";
import { ErrorHandling } from "./middlewares/ErrorHandling";


const app = express();


app.use(express.json())
app.use(routes);
app.use(ErrorHandling)

export { app };
