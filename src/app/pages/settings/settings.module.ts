import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsMainPageComponent } from './settings-main-page/settings-main-page.component';
import { SettingsRoutingModule } from "./settings-routing.module";
import { TabViewModule } from "primeng/tabview";
import { ChangePasswordComponent } from './settings-main-page/change-password/change-password.component';
import { ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { StatisticComponent } from './settings-main-page/statistic/statistic.component';
import {StatisticService} from "../../services/statistic/statistic.service";
import {StatisticRestService} from "../../services/rest/statistic-rest.service";
import {TableModule} from "primeng/table";
import { TourLoaderComponent } from './settings-main-page/tour-loader/tour-loader.component';
import {TicketsService} from "../../services/tickets/tickets.service";
import {TicketRestService} from "../../services/rest/ticket-rest.service";



@NgModule({
  declarations: [
    SettingsMainPageComponent,
    ChangePasswordComponent,
    StatisticComponent,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TableModule
  ],
  providers: [
    StatisticRestService,
    StatisticService,
    TicketsService,
    TicketRestService
  ]
})
export class SettingsModule { }
