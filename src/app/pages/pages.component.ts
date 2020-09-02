import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function precarga();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(settingService: SettingsService) {

   }

  ngOnInit(): void {
    precarga();
  }

}
