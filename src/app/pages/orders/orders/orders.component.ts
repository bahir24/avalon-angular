import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../../services/orders/orders.service";
import {IOrder} from "../../../models/order";
import {IClassStyles} from "../../../models/class-type";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders: IOrder[] = [];
  public cardClass!: IClassStyles;

  constructor(private orderService: OrdersService) {
  }

  ngOnInit(): void {
    this.cardClass = {'col-xl-3': true, 'col-6': true};
    this.orderService.getAllOrders()
      .subscribe((orders: IOrder[]) => {
        this.orders = orders;
      })
  }

}
