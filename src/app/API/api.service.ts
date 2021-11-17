import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //required for api call
import { map } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

// CRUD Methods
export class ApiService {

  constructor(private http: HttpClient) { }

// Method to Post new survey into json server
  postSurvey(data:any){
    return this.http.post<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

// Method to Get new survey into json server
  getSurvey(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any) => {
      return res;
    }))
  }

  // Method to update new survey into json server
  updateSurvey(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

 // Method to delete new survey into json server
  deleteSurvey(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any) => {
      return res;
    }))
  }



}
