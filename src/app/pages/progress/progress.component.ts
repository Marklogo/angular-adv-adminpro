import { Component } from '@angular/core';
import { NgModel } from "@angular/forms";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent  {

  progreso1: number = 25;
  progreso2: number = 50;
  
  get getProgres1(){
    return `${this.progreso1}%`;
  }

  get getProgres2(){
    return `${this.progreso2}%`;
  }
  
}