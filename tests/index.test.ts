require("dotenv").config();
require('ts-mocha');
import {IWeather} from "../types"
import Keros from "../index"
import chai from "chai";
import mocha from "mocha";

const weather = new Keros(process.env.WEATHER_TOKEN!);

describe('Keros', () => {
  it('⚡ getByCityName       - should return a weather object', async () => {
    const response = await weather.getByCityName('dimos florina');
    chai.expect(response).to.be.an('object');
  });

  it('⚡ getByCityID         - should return a weather object', async () => {
    const response = await weather.getByCityID(3245);
    chai.expect(response).to.be.an('object');
  });

  it('⚡ getByCityCoords     - should return a weather object', async () => {
    const response = await weather.getByCityCoords(6.17648, 43.732948);
    chai.expect(response).to.be.an('object');
  });

  it('⚡ findCitiesByName    - should return an array of cities', async () => {
    const response = weather.findCitiesByName("cal");
    chai.expect(response).to.be.an('array');
  });

  it('⚡ findCityByName      - should return a city', async () => {
    const response = weather.findCityByName("london");
    chai.expect(response).to.be.an('object');
  });

  it('⚡ findCitiesByCountry - should return an array of cities', async () => {
    const response = weather.findCitiesByCountry("GB");
    chai.expect(response).to.be.an('array');
  });
});