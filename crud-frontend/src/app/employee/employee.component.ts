import {HttpClient} from '@angular/common/http'
import { Component,OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {apiUrl} from '../constant';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  EmployeeArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive=false;

  employeeFormGroup!: FormGroup
  cid: Number=0;
  name: string = "";
  data: Number = 0;

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
    this.getAllEmployee();
    this.employeeFormGroup = new FormGroup({
      "name": new FormControl("",Validators.required),
      "data": new FormControl("",Validators.required)
    })
  }
  getAllEmployee(){
    this.http.get(`${apiUrl}/files/2`)
    .subscribe((resultData: any) =>{
      this.isResultLoaded=true;
      console.log(resultData);
      this.EmployeeArray = resultData;
    });
  }
  register(name: string, data:Number) {

    let bodyData = {
      name,data
    };
    
    this.http.post("http://localhost:8084/upload", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee Registered Successfully");
      this.getAllEmployee();
      
      this.name = '';
      this.data = 0;
    });
  }
  
  setUpdate(data: any){
    console.log(data);
    this.name=data.name
    this.data=data.data
    this.cid=data.id
  }

  UpdateRecords(id:Number,name:string, data:Number){
    let bodyData = {
      id,name,data
    };
    console.log(bodyData);
    this.http.put("http://localhost:8084/Employee/edit", bodyData, {responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee registered Updated")
      this.getAllEmployee();
      this.name='';
      this.data=0;
    });
  }
  save(){
    console.log(this.employeeFormGroup)
    let name= this.employeeFormGroup.value.name
    let data= this.employeeFormGroup.value.data
    let id=this.cid
    if(this.cid==0)
    this.register(name,data)
    else
    this.UpdateRecords(id,name,data)
  }
  setDelete(data: any){

    this.http.delete("http://localhost:8084/Employee/delete" +"/"+ data.id,{responseType :'text'}).subscribe((resultData:any) =>{
      console.log(resultData);
      alert("Employee Deleted")
      this.getAllEmployee();

      this.name='';
      this.data=0;

    });
  }
}