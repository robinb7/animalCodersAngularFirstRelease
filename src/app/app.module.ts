import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyDashboardComponent } from './survey-dashboard/survey-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, //to bind data into form
    HttpClientModule, //to use http calls
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
