const cityList = require("./assets/city.list.json") as ICity[];
import axios from "axios";
import { ICity, ICordsWeather, IWeather } from "./types";

type IUnit = "standard" | "metric" | "imperial";

/**
 * OpenWeatherMap API wrapper for JS
 * @author Geoxor, Cimok
 */
export default class Keros {
  private apiKey: string;
  private units: IUnit;

  /**
   * @param apiKey Your OpenWeatherMap API Key
   * @param units The units you want the respones to be in
   */
  constructor(apiKey: string, units?: IUnit) {
    this.apiKey = apiKey;
    this.units = units || "metric";
  }

  /**
   * Creates REST requests to openweathermap
   * @author Geoxor
   */
  private async request(params: string) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather${params}&appid=${this.apiKey}&units=${this.units}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /**
   * Changes the unit type to a new one
   * @author Geoxor
   */
  public changeUnit(newUnits: IUnit): void {
    this.units = newUnits;
  }

  /**
   * Gets weather for a given city by it's ID
   * @param {string} id Your city's ID
   * @author Cimok
   */
  public getByCityID = async (id: string): Promise<IWeather> => await this.request(`?id=${id}`);

  /**
   * Gets weather for a given city by it's name
   * @param {string} name Your city's name
   * @author Cimok
   */
  public getByCityName = async (name: string): Promise<IWeather> => await this.request(`?q=${name}`);

  /**
   * Gets weather & more for a given city by it's longitude and latitude
   * @param {string} cords Your city's coordinates
   * @author Cimok
   */
  public getByCityCords = async (lat: number, lon: number): Promise<ICordsWeather> => (await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)).data;

  /**
   * Finds all cities who the names of match the given string
   * @param {string} cityName the string to find city names of
   * @author Cimok
   */
  public findCitiesByName = (cityName: string): ICity[] | undefined => cityList.filter((city) => city.name.toLowerCase().includes(cityName.toLowerCase()));

  /**
   * Finds a city based on it's name
   * @param {string} cityName the name of the city to find
   * @author Cimok
   */
  public findCityByName = (cityName: string): ICity | undefined => cityList.find((city) => city.name.toLowerCase().includes(cityName.toLowerCase()));

  /**
   * Finds all the cities of a country based on the country code
   * @param {string} countryCode the country code e.g. GB, GR, US
   * @author Cimok
   */
  public findCitiesByCountry = (countryCode: string): ICity[] | undefined => cityList.filter((city) => city.country === countryCode.toUpperCase());
}