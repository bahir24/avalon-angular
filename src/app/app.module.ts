import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./pages/auth/auth.module";
import { MainModule } from "./pages/main/main.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MessageModule } from "primeng/message";
import { CheckboxModule } from "primeng/checkbox";
import { HeaderComponent } from './components/header/header.component';
import { MenubarModule } from "primeng/menubar";
import { InputTextModule } from "primeng/inputtext";
import { MessageService } from "primeng/api";
import { TicketsStorageService } from "./services/tickets-storage/tickets-storage.service";
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ResInterceptorsService } from "./services/interceptors/res-interceptors.service";
import {ConfigService} from "./services/config/config.service";
import { ToastModule } from "primeng/toast";


export function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then((result) => {
    console.log('Config loaded', ConfigService.config);
  })
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    MainModule,
    BrowserAnimationsModule,
    MessageModule,
    CheckboxModule,
    MenubarModule,
    InputTextModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    },
    MessageService,
    TicketsStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResInterceptorsService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
