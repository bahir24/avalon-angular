import { Pipe, PipeTransform } from '@angular/core';
import { ITour } from "../models/tours";
import { TicketsStorageService } from "../services/tickets-storage/tickets-storage.service";

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {
  constructor(private readonly ticketsStorageService: TicketsStorageService) {
  }
  transform(list: ITour[], filter: string): ITour[] {
    const filteredList = list.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    this.ticketsStorageService.filteredTicketStorage = filteredList;
    return filteredList;
  }

}
