import {Injectable} from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject, tap} from "rxjs";
import {INearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours";
import {TicketsStorageService} from "../tickets-storage/tickets-storage.service";
import {HttpClient} from "@angular/common/http";
import {IBookingATour} from "../../models/booking-a-tour";
import {IOrder} from "../../models/order";

@Injectable()
export class TicketsService {
  constructor(
    private ticketsRestService: TicketRestService,
    private ticketsStorageService: TicketsStorageService,
    private http: HttpClient
  ) {
  }

  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();

  private ticketSubject = new Subject<ITourTypeSelect>();
  public readonly ticketType$ = this.ticketSubject.asObservable();
  public currentType: ITourTypeSelect = {label: 'Все', value: 'all'};

  public getTickets(): Observable<ITour[]> {
    return this.ticketsRestService.getTours()
      .pipe(
        map((tickets: ITour[]) => {
          const resultArray = [...tickets];
          tickets.forEach((ticket: ITour) => {
            ticket.type === 'single' && resultArray.push(ticket);
          })
          return resultArray;
        }),
      );
  }

  public updateTour(type: ITourTypeSelect): void {
    this.currentType = type;
    this.ticketSubject.next(type);
  }

  public getError() {
    return this.ticketsRestService.getRestError();
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketsRestService.getNearestTickets();
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketsRestService.getLocationList();
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    return this.ticketsRestService.getRandomNearestEvent(type);
  }

  sendTourData(data: IOrder): Observable<IOrder> {
    return this.ticketsRestService.sendTourData(data);
  }

  updateTicketList(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
  }

  getTicketById(id: string): Observable<ITour> {
    return this.http.get<ITour>('http://localhost:4200/tours/' + id)
  }

  getTicketsByName(name: string): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:4200/tour-item/' + name)
  }

  createTour(body: any): Observable<any> {
    return this.ticketsRestService.createTour(body);
  }
}
