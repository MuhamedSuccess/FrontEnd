import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderServiceService} from "../dynamic-script-loader-service.service";

@Component({
  selector: 'app-trip-start',
  templateUrl: './trip-start.component.html',
  styleUrls: ['./trip-start.component.css']
})
export class TripStartComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderServiceService) { }

  ngOnInit() {
     // this.loadScripts();
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load(


      'modernizr',
      'respond',
      'jquery',
      'jquery.easing',
      'bootstrap',
      'jquery.waypoints',
      'sticky',
      'jquery.stellar',
      'hoverIntent',
      'superfish',
      'jquery.magnific',
      'magnific-popup',
      'bootstrap-datepicker',
      'classie',
      'selectFx',
      'main',
    ).then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }


}
