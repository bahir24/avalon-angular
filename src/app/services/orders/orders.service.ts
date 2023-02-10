import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IOrder} from "../../models/order";


@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {
  }

  public getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('http://localhost:4200/order');
  }
}
