import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {TicketsStorageService} from "../../../services/tickets-storage/tickets-storage.service";
import {IClassStyles} from "../../../models/class-type";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {Subject, takeUntil, timer} from "rxjs";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directives/blocks-style.directive";
import {FilterValueService} from "../../../services/filter-value/filter-value.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit, OnDestroy {
  public cardClass!: IClassStyles;
  private unsubscribeNotifier = new Subject<void>()
  public tours: ITour[] = [];
  public isLoading = true;
  public filterValue!: string;
  @ViewChild(BlocksStyleDirective) blockStyleDirective!: BlocksStyleDirective;

  constructor(
    private readonly ticketsService: TicketsService,
    private readonly ticketsStorageService: TicketsStorageService,
    private readonly router: Router,
    private readonly filterValueService: FilterValueService,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.filterValue = this.filterValueService.filterValue;
    this.ticketsService.getTickets()
      .pipe(takeUntil(this.unsubscribeNotifier))
      .subscribe((toursArray: ITour[]) => {
          this.tours = toursArray;
          this.isLoading = false;
        },
        () => {
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Туры не выгружены',
              life: 1500
            }
          )
        })
  }

  goToTicket(item: ITour) {
    this.router.navigate([`tickets/ticket/${item._id}`])
  }

  directiveRenderComplete() {
    this.blockStyleDirective.initStyle();
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

}
