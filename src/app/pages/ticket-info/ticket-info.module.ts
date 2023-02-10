import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import { TicketInfoRoutingModule } from "./ticket-info-routing.module";
import { CalendarModule } from "primeng/calendar";
import { InputNumberModule } from "primeng/inputnumber";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import {CarouselModule} from "primeng/carousel";



@NgModule({
  declarations: [
    TicketItemComponent
  ],
  imports: [
    CommonModule,
    TicketInfoRoutingModule,
    InputNumberModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    CarouselModule,
    FormsModule
  ]
})
export class TicketInfoModule { }
