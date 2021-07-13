import { Injectable } from '@angular/core';

export interface Flight {
  origin: Airport;
  destination: Airport;
  depatureTime: number;
  arrivalTime: number;
  duration: number;
}

export interface Airport {
  city: string;
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class FlightDataService {
  private statii = ['delayed', 'on time', 'cancelled'];
  private carriers = [
    { name: 'Ryanair', code: 'RK' },
    { name: 'British Airways', code: 'BA' },
    { name: 'Jet2', code: 'LS' },
  ];

  constructor() {}

  // return airports as key value pairs
  getAirports() {
    return {
      [this.heathrow.code]: this.heathrow,
      [this.gatwick.code]: this.gatwick,
      [this.manchester.code]: this.manchester,
      [this.stansted.code]: this.stansted,
      [this.luton.code]: this.luton,
      [this.edinburgh.code]: this.edinburgh,
      [this.birmingham.code]: this.birmingham,
      [this.bristol.code]: this.bristol,
      [this.glasgow.code]: this.glasgow,
      [this.belfast.code]: this.belfast,
    };
  }

  // generate a random set of flights of length 100.
  // desination, origin, status, flightId and carrier set randomly from above arrs/objs.
  // duration is set randomly between 1 and 3 hours.
  // departure is random time within next 12 hours.
  // arrival = departure + duration.
  getFlightData() {
    const airports = Object.values(this.getAirports());
    const generateFlight = () => {
      const randomStatus = this.statii
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)[0];
      const carrier = this.carriers
        .sort(() => 0.5 - Math.random())
        .slice(0, 1)[0];
      const randomAirports = airports
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      const flight = {
        origin: randomAirports[0],
        destination: randomAirports[1],
        status: randomStatus,
        carrier: carrier.name,
        flightId:
          carrier.code + Math.floor(Math.random() * (9999 - 1000) + 1000),
        duration: Math.floor(Math.random() * (3 - 1) + 1),
        depatureTime: this.getTime(),
        get arrivalTime() {
          return this.depatureTime + this.duration * 60 * 60 * 1000;
        },
      };
      return flight;
    };
    const flights: Flight[] = new Array(100)
      .fill(null)
      .map(() => generateFlight());
    return flights;
  }

  // time within next 12 hours (miliseconds)
  getTime(): number {
    const min = 0;
    const max = 12 * 60 * 60 * 1000;
    const time = new Date().getTime();
    return time + Math.random() * (max - min) + min;
  }

  private heathrow: Airport = {
    city: 'London',
    name: 'Heathrow Airport',
    code: 'LHR',
  };
  private gatwick: Airport = {
    city: 'London',
    name: 'Gatwick Airport',
    code: 'LGW',
  };
  private manchester: Airport = {
    city: 'Manchester',
    name: 'Manchester Airport',
    code: 'MAN',
  };
  private stansted: Airport = {
    city: 'London',
    name: 'Stansted Airport',
    code: 'STN',
  };
  private luton: Airport = {
    city: 'London',
    name: 'Luton Airport',
    code: 'LTN',
  };
  private edinburgh: Airport = {
    city: 'Edinburgh',
    name: 'Edinburgh Airport',
    code: 'EDI',
  };
  private birmingham: Airport = {
    city: 'Birmingham',
    name: 'Birmingham Airport',
    code: 'BHX',
  };
  private bristol: Airport = {
    city: 'Bristol',
    name: 'Bristol Airport',
    code: 'BRS',
  };
  private glasgow: Airport = {
    city: 'Glasgow',
    name: 'Glasgow Airport',
    code: 'GLA',
  };
  private belfast: Airport = {
    city: 'Belfast',
    name: 'Belfast Airport',
    code: 'BFS',
  };
}
