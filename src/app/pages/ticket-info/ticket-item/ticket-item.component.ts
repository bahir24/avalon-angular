import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import { ActivatedRoute, Router } from "@angular/router";
import { TicketsStorageService } from "../../../services/tickets-storage/tickets-storage.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IUser } from "../../../models/users";
import { UserService } from "../../../services/user/user.service";
import {forkJoin, fromEvent, Subject, Subscription, takeUntil} from "rxjs";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {IBookingATour} from "../../../models/booking-a-tour";
import {IOrder} from "../../../models/order";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss'],
  host: {
    '(document:keyup)': 'handleGoBackKey($event)'
  }
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {
  ticket: ITour | undefined;
  user!: IUser | null;
  userForm!: FormGroup;
  // nearestTours!: ITour[];
  // toursLocation!: ITourLocation[];
  public tours: ITour[] = [];

  @ViewChild('ticketSearch') ticketSearch!: ElementRef;
  ticketSearchValue!: string;
  searchTypes = [1, 2, 3];
  private searchTicketSub!: Subscription;
  private ticketRestSub!: Subscription;

  private subDestroyer = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private router: Router,
              private userService: UserService,
              private ticketsService: TicketsService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticketsService.getTicketById(id)
        .subscribe((tour: ITour) => {
          this.ticket = tour;
        })
      // const ticketStorage: ITour[] = this.ticketStorage.getStorage();
      // this.ticket = ticketStorage.find((ticket: ITour) => ticket.id === id);
    }

    this.user = this.userService.user;

    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl(),
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl()
    })
    this.initCarousel();
  }

  initCarousel() {
    // get nearest tours
    // forkJoin([this.ticketsService.getNearestTours(), this.ticketsService.getToursLocation()])
    //   .subscribe((data: [INearestTour[], ITourLocation[]]) => {
    //     this.nearestTours = data[0];
    //     this.toursLocation = data[1];
    //   })
    this.ticketsService.getTickets()
      .subscribe((tours: ITour[]) => {
        this.tours = tours.slice(0, 5);
      })
  }

  ngAfterViewInit() {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent<KeyboardEvent>(this.ticketSearch.nativeElement, 'keyup');
    this.searchTicketSub = fromEventObserver.subscribe((ev: KeyboardEvent) => {
      const value = this.ticketSearch.nativeElement.value ;
      this.initSearchTour(value);
    })
  }

  initSearchTour(value: string) {
    if (value === '') {
      this.initCarousel();
    } else {
      if (this.ticketRestSub && !this.searchTicketSub.closed) {
        this.ticketRestSub.unsubscribe();
      }
      this.ticketRestSub = this.ticketsService.getTicketsByName(value).subscribe((data: ITour[]) => {
        this.tours = data;
      })
    }
    // const type = Math.floor(Math.random() * this.searchTypes.length)
  }

  handleGoBackKey(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      // this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  onSubmit() {
    const userId = this.userService.user?.id || null;
    const userData = this.userForm.getRawValue();
    const postObject: IOrder = {
      age: userData.age,
      birthDay: userData.birthDay,
      userId,
      cardNumber: userData.cardNumber,
      tourId: this.ticket?._id || null
    }
    console.log('sendData', postObject)
    this.ticketsService.sendTourData(postObject)
      .pipe(takeUntil(this.subDestroyer))
      .subscribe({
        next: () => console.log('ok'),
        error: (err) => console.log('not ok', err)
      });
  }

  selectDate(ev: Date) {
    const today = new Date();
    const bornYear = today.getFullYear() - ev.getFullYear()
    this.userForm.controls['age'].setValue(bornYear);
  }

  // getLocation(tour: ITour): string {
  //   return this.toursLocation.find((location: ITourLocation) => location.id === tour.locationId)?.name || '';
  // }

  ngOnDestroy() {
    this.searchTicketSub.unsubscribe();
  }

}
