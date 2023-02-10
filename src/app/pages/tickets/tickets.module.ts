import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketRestService } from "../../services/rest/ticket-rest.service";
import { TicketsService } from "../../services/tickets/tickets.service";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { AsideComponent } from './tickets-aside/tickets-aside.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { BlocksStyleDirective } from "../../directives/blocks-style.directive";
import { ListFilterPipe } from "../../pipes/list-filter.pipe";
import { InputTextModule } from "primeng/inputtext";
import { FilterValueService } from "../../services/filter-value/filter-value.service";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";


@NgModule({
    declarations: [
        TicketsComponent,
        AsideComponent,
        TicketsListComponent,
        BlocksStyleDirective,
        ListFilterPipe
    ],
    imports: [
        CommonModule,
        TicketsRoutingModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        ToastModule
    ],
    exports: [
        BlocksStyleDirective
    ],
    providers: [
        TicketsService,
        TicketRestService,
        FilterValueService
    ]
})
export class TicketsModule {
}
