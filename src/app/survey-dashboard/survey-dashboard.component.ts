import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; //to add form input
import { SurveyModel } from './survey-model.model';
import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-survey-dashboard',
  templateUrl: './survey-dashboard.component.html',
  styleUrls: ['./survey-dashboard.component.css']
})
export class SurveyDashboardComponent implements OnInit {

  formValue !: FormGroup; 
  surveyModelOjb: SurveyModel = new SurveyModel(); //created new survey object
  surveyData !: any; //property that stores the survey data
  showAdd!: boolean; //property to show add button
  showUpdate!: boolean; //property to show update button
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }
 
  
//method to bind all form values into our form 
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      surveyName:[''],
      surveyDescription:['']
    })
    this.getSurveyDetails() //calls get method when application is ran
  }

  //method when add button is clicked
  clickAddSurvey(){
    this.formValue.reset();
    this.showAdd = true; //shows only add button
    this.showUpdate = false;
  }


// Method to Use object to post data
  postSurveyDetails(){

    this.surveyModelOjb.surveyName = this.formValue.value.surveyName;
    this.surveyModelOjb.surveyDescription = this.formValue.value.surveyDescription;

    this.api.postSurvey(this.surveyModelOjb).subscribe(res=>{
      console.log(res);
      alert("Survey Added Successfully")
      let ref = document.getElementById('cancel') //to close modal after adding survey
      ref?.click();
      this.formValue.reset();
      this.getSurveyDetails() //recalls this method to update records
    },
    err=>{
      alert("error");
    })

   
    }

// Method to get data from json server to our web application
    getSurveyDetails(){
      this.api.getSurvey().subscribe(res=>{
        this.surveyData = res;
      })
    }

  // Method to delete survey
    deleteSurveyDetails(row : any){
      this.api.deleteSurvey(row.id)
      .subscribe(res=>{
        alert("Survey Deleted");
        this.getSurveyDetails();
      })
    }

    // Method to edit survey, gets value from survey form into modal form 
    onEdit(row:any){
      this.showAdd = false; 
      this.showUpdate = true; //only show edit button
      this.surveyModelOjb.id = row.id;
      this.formValue.controls['surveyName'].setValue(row.surveyName)
      this.formValue.controls['surveyDescription'].setValue(row.surveyDescription)
    }

    // Method to pass new data into existing survey object, 
    updateSurveyDetails(){
    this.surveyModelOjb.surveyName = this.formValue.value.surveyName;
    this.surveyModelOjb.surveyDescription = this.formValue.value.surveyDescription;

    this.api.updateSurvey(this.surveyModelOjb, this.surveyModelOjb.id).subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getSurveyDetails()
    })

    }




}


