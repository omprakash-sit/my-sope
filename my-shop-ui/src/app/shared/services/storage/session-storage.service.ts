import { Injectable } from "@angular/core";

@Injectable({ 'providedIn': 'root' })
export class SessionStorageService {
    store(key: string, data: any): void {
        sessionStorage.setItem(key, data);
    }
    retrieve(key: string): any {
        return sessionStorage.getItem(key);
    }
    remove(key: string): void {
        sessionStorage.removeItem(key);
    }
    clear(): void {
        sessionStorage.clear();
    }
}