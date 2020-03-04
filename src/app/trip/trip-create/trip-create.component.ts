import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GuideService} from '../../user/guide/guide.service';
import {UserOption} from '../../user/guide/guide.component';
import {Guide} from '../../user/guide/guide.models';
import {User} from '../../models/User';
import * as $ from 'jquery';
import {DaterangepickerComponent} from 'ngx-daterangepicker-material';
import {DynamicScriptLoaderService} from '../../shared/services/dynamic-script-loader.service';
import {TripService} from '../trip.service';
// export interface UserOption {
//   name: string;
//   id: string;
// }
declare const Picker: any;

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css'],
  // encapsulation: ViewEncapsulation.Emulated

})
export class TripCreateComponent implements OnInit {

  guideList = [{id: null, name: null}];
  tourPlanList = [{id: null, name: null}];
  tourismTypeList = [{id: null, name: null}];
  tripForm: FormGroup;
  guides = [];
  plans = [];
  tourismTypes = [];
  selectedFile: File;
  selectedDate: string;
  formData = {};

  constructor(private formBuilder: FormBuilder,
              private guideService: GuideService,
              private dynamicScriptLoader: DynamicScriptLoaderService,
              private tripService: TripService
  ) {
  }

  ngOnInit() {

  this.loadScripts();
  //   this.loader();


  this.initForm();

  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load(
      'jquery',
      'select2',
      'moment',
      'datepicker',
      'global',
    ).then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }


  initForm() {
    this.loadGuides();
    this.loadTourPlans();
    this.loadTourismTypes();

    this.tripForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      days: new FormControl('', Validators.required),
      guideList: new FormControl(this.guideList[0]),
      tourism_type: new FormControl(this.tourPlanList[0]),
      tourPlanList: new FormControl(this.tourPlanList[0]),
    });


  }

  onSubmit() {


    // this.formData = {
    //   name: this.tripForm.value.name,
    //   description: this.tripForm.value.description,
    //   image: this.selectedFile.name,
    //   date: this.tripForm.value.date,
    //   guideList: this.tripForm.value.guideList,
    // };
    console.log(this.tripForm.value);
    console.log(this.selectedFile);

    const tripData = new FormData();
    tripData.append('name', this.tripForm.value.name);
    tripData.append('description', this.tripForm.value.description);
    tripData.append('trip_cover', this.selectedFile, this.selectedFile.name);
    tripData.append('date', this.tripForm.value.date);
    tripData.append('guide', this.tripForm.value.guideList);
    tripData.append('tourism_type', this.tripForm.value.tourism_type);
    tripData.append('trip_plan', this.tripForm.value.tourPlanList);

    console.log(JSON.stringify(tripData));

    this.tripService.createTrip(tripData).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

  }

  loader(){
    // const script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = src;
    // document.getElementsByTagName('head')[0].appendChild(src);
    this.dynamicScriptLoader.load_scripts();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);

  }

  onDateChange(event){

    this.selectedDate = event.target.value;
    console.log(this.selectedDate);
  }

  loadGuides() {
    this.guideService.getAllGuides().subscribe(
      result => {
        console.log(result);
        this.fillGuideList(result);
      },
      error => {

      }
    );
  }

  loadTourPlans() {
    this.tripService.getAllTourPlans().subscribe(
      result => {
        console.log(result);
        this.fillTourPlanList(result);
      },
      error => {

      }
    );
  }

   loadTourismTypes() {
    this.tripService.getAllTourismTypes().subscribe(
      result => {
        console.log(result);
        this.fillToursimTypeList(result);
      },
      error => {

      }
    );
  }

  fillGuideList(guides) {

    let user: User;

    for (const guide of guides) {

      this.guides.push({id: guide.id, name: guide.user.username});

    }
    this.guideList = this.guides;
    console.log(this.guideList);
  }

  fillTourPlanList(plans) {


    for (const plan of plans) {
      this.plans.push({id: plan.id, name: plan.name});
    }

    this.tourPlanList = this.plans;
    console.log(this.tourPlanList);
  }

  fillToursimTypeList(types) {


    for (const type of types) {
      this.tourismTypes.push({id: type.id, name: type.name});
    }

    this.tourismTypeList = this.tourismTypes;
    console.log(this.tourismTypeList);
  }
}
