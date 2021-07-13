import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParamService {
  private params$ = new BehaviorSubject({});
  private params: AppParams = new AppParamsClass();

  constructor() {}

  setAirportCode(code) {
    this.params.airportCode = code;
    this.setParams();
  }

  // set global app parameters via rxjs beahviour subject
  // these are required where no parent child relationship exists
  setParams() {
    this.params$.next(this.params);
  }

  // make global app parameters available as observable
  getParams(): Observable<any> {
    return this.params$.asObservable();
  }
}

export interface AppParams {
  airportCode: string;
};

export class AppParamsClass implements AppParams {
  airportCode = 'LHR';
};