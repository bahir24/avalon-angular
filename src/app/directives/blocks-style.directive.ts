import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output, } from '@angular/core';
import { timer } from "rxjs";
import { Router } from "@angular/router";
import { TicketsStorageService } from "../services/tickets-storage/tickets-storage.service";

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keydown)': 'preventDefault($event)',
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})
export class BlocksStyleDirective implements AfterViewInit {
  @Input() selector!: string;
  @Input() initFirst = false;
  @Output() renderComplete = new EventEmitter<void>();

  public items!: HTMLElement[];
  public index = 0;

  constructor(
    private el: ElementRef,
    private router: Router,
    private ticketsStorageService: TicketsStorageService
  ) {
  }

  ngAfterViewInit() {
   this.initList();
  }

  preventDefault(ev: KeyboardEvent) {
    const availableKeys = ['ArrowRight', 'ArrowLeft', 'Enter', 'ArrowDown', 'ArrowUp'];
    if (availableKeys.includes(ev.key)) {
      ev.preventDefault();
    }
  }

  initList() {
    this.index = 0;
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        if (this.items[this.index]) {
          timer(0).subscribe(() => this.renderComplete.next());
        }
      }
    }
  }

  initKeyUp(ev: KeyboardEvent): void {
    const availableKeys = ['ArrowRight', 'ArrowLeft', 'Enter', 'ArrowDown', 'ArrowUp'];
    if (!availableKeys.includes(ev.key)) {
      return;
    }
    const windowWidth = window.innerWidth;
    const cells = windowWidth >= 1200 ? 4 : 2;
    switch (ev.key) {
      case 'ArrowRight':
        if (this.index + 1 < this.items.length) {
          this.index++;
          if (this.items[this.index]) {
            this.scrollTo(this.items[this.index]);
            this.initStyle(this.index);
          }
        }
        break;
      case 'ArrowLeft':
        if (this.index - 1 >= 0) {
          this.index--;
          if (this.items[this.index]) {
            this.scrollTo(this.items[this.index]);
            this.initStyle(this.index);
          }
        }
        break;
      case 'ArrowDown':
        if (this.index + cells < this.items.length) {
          this.index += cells;
          if (this.items[this.index]) {
            this.scrollTo(this.items[this.index]);
            this.initStyle(this.index);
          }
        }
        break;
      case 'ArrowUp':
        if (this.index - cells >= 0) {
          this.index -= cells;
          if (this.items[this.index]) {
            this.scrollTo(this.items[this.index]);
            this.initStyle(this.index);
          }
        }
        break;
      case 'Enter':
        if (this.ticketsStorageService.filteredTicketStorage[0]) {
          const currentItemId = this.ticketsStorageService.filteredTicketStorage[this.index]._id;
          this.router.navigate([`tickets/ticket/${currentItemId}`]);
        }
        break;
    }
  }

  initStyle(index = 0) {
    this.items.forEach(item => item.removeAttribute('style'));
    this.items[index].setAttribute('style', 'outline: 1px solid red');
  }

  scrollTo(item: HTMLElement) {
    if (item.parentElement) {
      item.parentElement.scrollIntoView({block: 'center', behavior: 'smooth'})
    }
  }

}
