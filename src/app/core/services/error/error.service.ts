import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  error:WritableSignal<null | string> = signal(null);

  setError(message: string) {
    this.error.set(message);
  }

  clearError() {
    this.error.set(null);
  }
}
