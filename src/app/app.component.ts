import { AppParams, ParamService } from './services/param.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'arrivals-and-departures';
  private alive = true;
  public airportCode = 'LHR';

  constructor(private paramService: ParamService) {}

  ngOnInit() {
    this.getParams();
  }

  // get global parameters as no parent child relationship exists.
  // the airportCode is required for routing in template.
  getParams() {
    this.paramService
      .getParams()
      .pipe(takeWhile(() => this.alive))
      .subscribe((params: AppParams) => {
        this.airportCode = params.airportCode;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
};