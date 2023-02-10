import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SettingsMainPageComponent } from "./settings-main-page/settings-main-page.component";
import { SettingsGuard } from "../../services/settings/guards/settings.guard";

const routes: Routes = [
  {
    path: '',
    component: SettingsMainPageComponent,
    // canActivate: [SettingsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
