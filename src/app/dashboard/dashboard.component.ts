import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { EnergyAssetTimeseries } from '../helpers/energy-asset-timeseries-data';
import { AssetService } from '../services/asset.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  echartsInstance: any;

  chosenAssets: any[] = [];
  assets: EnergyAssetTimeseries[] = [];
  uniqueAssets: EnergyAssetTimeseries[] = [];

  chartOption: EChartsOption = {
    legend: {},
    tooltip: {
      trigger: 'axis',
    },
    dataset: {
      source: this.chosenAssets,
      dimensions: ['assetId', 'timestamp', 'activePower', 'voltage'],
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        name: 'Active power (W)',
        encode: {
          x: 'timestamp',
          y: 'activePower'
        }
      },
      {
        type: 'line',
        name: 'Voltage (V)',
        encode: {
          x: 'timestamp',
          y: 'voltage'
        }
      },
    ],
  };

  constructor(private authenticationService: AuthenticationService,
    private assetService: AssetService) { }

  ngOnInit(): void {
    this.getAssets();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  setChartData(event: any) {
    this.chosenAssets = this.assets.filter(el => el.assetId == event);
    var dataset = {
      source: this.chosenAssets,
      dimensions: ['assetId', 'timestamp', 'activePower', 'voltage'],
    };
    console.log(this.chosenAssets)
    this.chartOption.dataset = [];
    this.chartOption.dataset.push(dataset);
    this.echartsInstance.setOption(this.chartOption);
  }

  onChartInit(event: any): void {
    this.echartsInstance = event;
  }

  getAssets() {
    this.assetService.getAssetActivity().subscribe((listOfAssetActivity) => {
      this.assets = listOfAssetActivity;
      this.uniqueAssets = [...new Map(this.assets.map(item => [item['assetId'], item])).values()];
    });
  }
}
