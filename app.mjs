import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.mjs";
import cookieParser from "cookie-parser";
import { requireAuth, checkUser } from "./middleware/authMiddleware.mjs";

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://Mukha:Mukha1234@cluster0.pckrunp.mongodb.net/node_auth?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .then(() => console.log("running on http://localhost:3000"))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
