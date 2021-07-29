require("dotenv").config();
import Keros from "../index"
const weather = new Keros(process.env.WEATHER_TOKEN);