import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketsService} from "../../../../services/tickets/tickets.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  public tourForm!: FormGroup;

  constructor(private ticketService: TicketsService, private ms: MessageService) {
  }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      operator: new FormControl(),
      price: new FormControl(),
      img: new FormControl(),
    })
  }

  createTour(): void {
    const tourDataRow = this.tourForm.getRawValue();
    let formParams = new FormData();
    if (typeof tourDataRow === 'object') {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop]);
      }
    }
    this.ticketService.createTour(formParams)
      .subscribe({
        next: (answer: any) => {
          this.ms.add({severity: 'success', summary: 'Успешно', life: 1500});
        },
        error: (err) => {
          this.ms.add({severity: 'error', summary: 'Ошибка!', life: 1500});
        }
      })
  }

  selectFile(ev: any): void {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.tourForm.patchValue({ img: file });
    }
  }

}
