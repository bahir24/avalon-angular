import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from "./tickets/tickets.component";
import { TicketsListComponent } from "./tickets-list/tickets-list.component";
import { AsideComponent } from "./tickets-aside/tickets-aside.component";

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    children: [
      {
        path: '',
        component: AsideComponent,
        outlet: 'aside'
      },
      {
        path: '',
        redirectTo: 'tickets-list',
        pathMatch: 'full',
      },
      {
        path: 'tickets-list',
        component: TicketsListComponent,
      },
      {
        path: 'ticket/:id',
        loadChildren: () => import('../ticket-info/ticket-info.module').then(module => module.TicketInfoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
