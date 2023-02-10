import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(mod => mod.AuthModule),
  },
  {
    path: 'tickets',
    loadChildren: () => import('./pages/tickets/tickets.module').then(mod => mod.TicketsModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(mod => mod.SettingsModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(mod => mod.OrdersModule),
  },
  {
    path: '',
    loadChildren: () => import('./pages/main/main.module').then(mod => mod.MainModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
