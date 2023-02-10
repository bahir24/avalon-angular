import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {TicketsListComponent} from "../tickets/tickets-list/tickets-list.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: AuthorizationComponent,
  }
];

// routes.forEach(route => console.log);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
