import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {ICustomStatisticUser, IStatisticUser} from "../../models/users";
import {StatisticRestService} from "../rest/statistic-rest.service";

@Injectable()
export class StatisticService {
  constructor(private statisticRestService: StatisticRestService) {
  }

  getCustomUserStatistic(): Observable<ICustomStatisticUser[]> {
    return this.statisticRestService.getUserStatistic()
      .pipe(
        map((data: IStatisticUser[]) => {
          const newDataArray: ICustomStatisticUser[] = [];
          data.forEach((el: IStatisticUser) => {
            const newDataObj: ICustomStatisticUser = {
              id: el.id,
              name: el.name,
              city: el.address.city,
              company: el.company.name,
              phone: el.phone,
              street: el.address.street
            }
            newDataArray.push(newDataObj);
          })
          return newDataArray;
        })
      );
  }
}
