import express from "express";
import { addMovie, getAllMovies } from "../controllers/movie-controllers.js";

const movieRouter = express.Router();

movieRouter.get("/",getAllMovies);
movieRouter.get("/:id", getAllMovies);
movieRouter.post("/", addMovie);




export default movieRouter;