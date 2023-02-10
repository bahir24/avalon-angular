import {Component, OnInit} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ExtendedSettingsService} from "../../../services/extended-settings.service";
import {FilterValueService} from "../../../services/filter-value/filter-value.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {MessageService} from "primeng/api";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-tickets-aside',
  templateUrl: './tickets-aside.component.html',
  styleUrls: ['./tickets-aside.component.scss']
})
export class AsideComponent implements OnInit {
  public menuTypes!: IMenuType[];
  public selectedMenuType!: IMenuType;
  public filterValue = '';

  constructor(
    private readonly extendedSettingsService: ExtendedSettingsService,
    private readonly filterValueService: FilterValueService,
    private readonly ticketsService: TicketsService,
    private readonly messageService: MessageService,
    private readonly settingsService: SettingsService,
    private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ];
    this.selectedMenuType = {type: 'all',label: 'Все'};
  }

  valueChange(value: string) {
    this.filterValueService.filterValue = value;
    this.filterValueService.valueEmitter.emit(this.filterValueService.filterValue);
  }

  selectDropdown(event: { originalEvent: PointerEvent, value: IMenuType }) {
    this.extendedSettingsService.extendedSetting.emit(event.value);
  }

  changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.ticketsService.updateTour(ev.value)
  }

  initRestError(): void {
    this.messageService.add(
      {
        severity: 'error',
        summary: 'Что-то пошло не так',
        life: 1500
      }
    )
  }

  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    });
  }

  initTours() {
    this.http.post<ITour[]>('http://localhost:4200/tours', {})
      .subscribe((tours: ITour[]) => {
        if (tours) {
          this.ticketsService.updateTicketList(tours);
        }
      });
  }

  removeTours() {
    this.http.delete<ITour[]>('http://localhost:4200/tours')
      .subscribe((tours: ITour[]) => {
        if (tours) {
          this.ticketsService.updateTicketList(tours);
        }
      });
  }

}
