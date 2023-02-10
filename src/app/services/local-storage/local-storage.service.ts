import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setLocalStorage(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  getLocalStorage(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  removeFromLocaleStorage(key: string) {
    window.localStorage.removeItem(key);
  }
}
