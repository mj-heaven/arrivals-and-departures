import { ParamService } from './../services/param.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Flight,
  FlightDataService,
} from '../services/flight-data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-arrivals',
  templateUrl: './arrivals.component.html',
  styleUrls: ['./arrivals.component.scss'],
})
export class ArrivalsComponent implements OnInit, OnDestroy {
  public airportCode = null;
  public board = 'arrivals';
  public flights: Flight[] = [];
  public filteredFlights: Flight[] = [];
  public flights$: Subscription;
  public airportsObj;
  public currentTime = 0;
  public airportForm: FormGroup = new FormGroup({
    airport: new FormControl(null),
  });

  constructor(
    private flightService: FlightDataService,
    private route: ActivatedRoute,
    private router: Router,
    private paramService: ParamService
  ) {}

  ngOnInit(): void {
    this.getAirports();
    this.getFlights();
    this.initAirportForm();
    this.getRouteParams();
    this.getTime();
  }

  // subscribe to arrivals, departures and selected airport route params 
  // and filter flights accordingly 
  getRouteParams() {
    this.route.paramMap.subscribe((params) => {
      this.airportCode = params.get('airport');
      this.board = params.get('board');
      if (this.airportCode) this.airport.setValue(this.airportCode);
      this.paramService.setAirportCode(this.airportCode);
      this.filterFlights();
    });
  }

  // get the current time to display within template
  getTime() {
    setInterval(() => {
      this.currentTime = new Date().getTime();
    }, 1);
  }

  // retrieve airports object from flight service mock data
  getAirports() {
    this.airportsObj = this.flightService.getAirports();
  }

  // retrieve flight array from flight service mock data and
  // generate new flight array every 25 seconds to demonstrate real time 
  // data updates in the template as requested
  getFlights() {
    const source = timer(0, 25000);
    this.flights$ = source.subscribe(() => {
      this.flights = this.flightService.getFlightData();
      this.filterFlights();
    });
  }

  // define an airport getter for easy access
  get airport() {
    return this.airportForm.controls.airport;
  }

  // subscribe to airport selection and update router to reflect new airport
  initAirportForm() {
    this.airport.valueChanges.subscribe((airport) => {
      this.router.navigate(['../', airport], { relativeTo: this.route });
    });
  }

  // filter flights by arrivals, departures and selected airport
  filterFlights() {
    this.filteredFlights = this.flights.filter((flight) => {
      if (
        this.board === 'arrivals' &&
        flight.destination.code === this.airportCode
      ) {
        return true;
      } else if (
        this.board === 'departures' &&
        flight.origin.code === this.airportCode
      ) {
        return true;
      }
    });
  }

  // clean up subscription before destroying component
  ngOnDestroy() {
    this.flights$.unsubscribe();
  }
}
