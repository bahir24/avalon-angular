import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { UserService } from "../../services/user/user.service";
import { interval, map, Observable, Subscription } from "rxjs";
import { ExtendedSettingsService } from "../../services/extended-settings.service";
import { IMenuType } from "../../models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public items: MenuItem[] = [];
  public timerObservable$!: Observable<Date>;
  private settingsActive = false;
  private changeExtendedSettingsSubscription$!: Subscription;
  constructor(
    private readonly extendedSettingsService: ExtendedSettingsService,
    public readonly userService: UserService
  ) {
  }

  ngOnInit() {
    this.timerObservable$ = interval(1000)
      .pipe(map(() => new Date()))
    this.items = this.initMenuItems();
    this.changeExtendedSettingsSubscription$ = this.extendedSettingsService
      .extendedSetting.subscribe((menuType: IMenuType) => {
      this.settingsActive = menuType.type === 'extended';
      this.items = this.initMenuItems();
    })
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Главная',
        routerLink:['/']
      },
      {
        label: 'Билеты',
        routerLink:['/tickets']
      },
      {
        label: 'Настройки',
        routerLink:['/settings'],
        visible: this.settingsActive
      },
      {
        label: 'Заказы',
        routerLink:['/orders']
      },
      {
        label: 'Выйти',
        routerLink:['/auth'],
        command: () => this.userService.clearUser()
      },
      {
        label: 'Ещё пункт',
        routerLink:['/exanple'],
      },
    ];
  }

  ngOnDestroy() {
    this.changeExtendedSettingsSubscription$.unsubscribe();
  }
}
