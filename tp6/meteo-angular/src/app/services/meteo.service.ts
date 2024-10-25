import { Injectable } from "@angular/core";
@Injectable({ providedIn: "root" })
export class MeteoService {
  private apiKey = "dd7bd60037a3d21e2b4a6e44f9b64e6f";
  private baseUrl = "https://api.openweathermap.org/data/2.5";
  constructor() { }
  getMeteo(name: string): Promise<any> {
    console.log("from service", name);
    return fetch(
      `${this.baseUrl}/weather/?q=${name}&units=metric&lang=fr&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod == 200) {
          return Promise.resolve(json);
        } else {
          console.error(`Météo introuvable pour ${name} (${json.message})`);
          return Promise.reject(
            `Météo introuvable pour ${name} (${json.message})`
          );
        }
      });
  }
  getFiveDayForecast(name: string): Promise<any> {
    console.log("Fetching 5-day forecast for", name);
    return fetch(
      `${this.baseUrl}/forecast?q=${name}&units=metric&lang=fr&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod == "200") {
          return Promise.resolve(json);
        } else {
          console.error(
            `Prévision introuvable pour ${name} (${json.message})`
          );
          return Promise.reject(
            `Prévision introuvable pour ${name} (${json.message})`
          );
        }
      });
  }
}