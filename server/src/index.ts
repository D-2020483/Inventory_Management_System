import  express  from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//Route import


//Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//Route Import
import dashbordRoutes from "./routes/dashboardRoutes";
import ProductRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";



//Routes
app.use("/dashboard" , dashbordRoutes);
app.use("/products", ProductRoutes);
app.use("/users", userRoutes);
app.use("/api", ProductRoutes);
app.use('/api', userRoutes);



//Servers
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});