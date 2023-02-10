import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../../../services/statistic/statistic.service";
import {ICustomStatisticUser} from "../../../../models/users";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  public usersList: ICustomStatisticUser[] = [];
  public cols = [
    {field: 'name', header: 'Имя'},
    {field: 'company', header: 'Компания'},
    {field: 'phone', header: 'Телефон'},
    {field: 'city', header: 'Город'},
    {field: 'street', header: 'Улица'},
  ];
  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.getCustomUserStatistic()
      .subscribe((data: ICustomStatisticUser[]) => {
        this.usersList = data;
      })
  }

}
