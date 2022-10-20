import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EnergyAssetTimeseries } from '../helpers/energy-asset-timeseries-data';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor() { }

  public getAssetActivity(): Observable<EnergyAssetTimeseries[]> {
    //this is where you would instead call api and get asset activity for last timeframe
    var assetActivity: EnergyAssetTimeseries[] = [];

    var rand = this.randomIntFromInterval(3, 10);
    for (var i = 0; i < rand; i++) {
      this.generateRandomObject(assetActivity);
    }

    assetActivity.sort((el1, el2) => el1.timestamp - el2.timestamp);

    return of(assetActivity);
  }

  private generateRandomObject(assetActivity: EnergyAssetTimeseries[]) {
    var rand = this.randomIntFromInterval(100, 200);
    var assetId = uuid();
    for (var i = 0; i < rand; i++) {
      var newObject = {
        assetId: assetId,
        timestamp: Date.now() - i * 10000 - this.randomIntFromInterval(1000, 60000),
        activePower: this.randomIntFromInterval(50, 60),
        voltage: this.randomIntFromInterval(20, 40)
      }

      assetActivity.push(newObject);
    }
    return assetActivity;
  }

  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
