import { Injectable } from '@angular/core';
import { LocalStorageService } from './storage/local-storage.service';
import { SessionStorageService } from './storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataCommunicationService {

  constructor(
    private $sessionStorage: SessionStorageService,
    private $localStorage: LocalStorageService
  ) { }
  setStorage(key: string, value: any, type = 'session'): void {
    if (type === 'session') {
      this.$sessionStorage.store(key, JSON.stringify(value));
    } else {
      this.$localStorage.store(key, JSON.stringify(value));
    }
  }
  getStorage(key: string, type?: string): any {
    if (type) {
      return JSON.parse(this.$localStorage.retrieve(key));
    }
    return JSON.parse(this.$sessionStorage.retrieve(key));
  }
  clearStorage(key?: string, isLocal?: boolean): void {
    if (key) {
      if (isLocal) {
        this.$localStorage.remove(key);
      }
      this.$sessionStorage.remove(key);
    } else {
      if (isLocal) {
        this.$localStorage.clear();
      }
      this.$sessionStorage.clear();
    }
  }
}
