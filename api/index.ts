import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import connectDB from "../database/db";
import attendeeRouter from "../routes/attendeeRoutes";


const app: Express = express();
const PORT: string | number = 3006

dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("For Nils")
})
app.use('/admin', attendeeRouter)

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
})
