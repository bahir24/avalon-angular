import { Injectable } from '@angular/core';
import { ITour } from "../../models/tours";

@Injectable()
export class TicketsStorageService {
  private ticketsStorage: ITour[] = [];
  public filteredTicketStorage: ITour[] = [];

  setStorage(data: ITour[]): void {
    this.ticketsStorage = data;
  }

  getStorage(): ITour[] {
    return this.ticketsStorage;
  }
}
