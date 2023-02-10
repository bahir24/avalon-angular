import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IConfig } from "../../models/config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public static config: IConfig;
  private readonly sourceFile = 'assets/config/config.json';
  constructor(private http: HttpClient) {
  }

  load(): void {
    this.http.get<IConfig>(this.sourceFile).subscribe((data: IConfig) => {
      if (data && typeof(data) === 'object') {
        ConfigService.config = data;
      }
      console.log(ConfigService.config);
    })
  }

  loadPromise(): Promise<IConfig[]> {
    const configPromise = new Promise<IConfig>((resolve, reject) => {
      this.http.get<IConfig>(this.sourceFile).toPromise().then((response: IConfig | undefined) => {
        if (response && typeof response === 'object') {
          ConfigService.config = response;
          resolve(response);
        } else {
          reject('Ошибка при инициализации конфига: ' + response);
        }
      }).catch((response: any) => {
        reject('Ошибка при загрузке файла')
      })
    })
    const promiseArr = [configPromise];
    return Promise.all(promiseArr);
  }
}
