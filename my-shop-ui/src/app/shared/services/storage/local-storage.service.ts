import { Injectable } from "@angular/core";

@Injectable({ 'providedIn': 'root' })
export class LocalStorageService {
    store(key: string, data: any): void {
        localStorage.setItem(key, data);
    }
    retrieve(key: string): any {
        return localStorage.getItem(key);
    }
    remove(key: string): void {
        localStorage.removeItem(key);
    }
    clear(): void {
        localStorage.clear();
    }
}