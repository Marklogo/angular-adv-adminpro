import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label, Color  } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {


  @Input() title: string = "";
  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
      [350, 450, 100]
    ];

    public colors: Color[] = [
      {backgroundColor: ['#9E120E','#FF5800','#FFB414']}
    ]

  constructor() { }

  ngOnInit(): void {
  }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

}
