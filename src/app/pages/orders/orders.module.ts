import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersRoutingModule} from "./orders-routing.module";
import { OrdersComponent } from './orders/orders.component';
import {OrdersService} from "../../services/orders/orders.service";
import {TicketsModule} from "../tickets/tickets.module";


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TicketsModule
  ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule {
}
