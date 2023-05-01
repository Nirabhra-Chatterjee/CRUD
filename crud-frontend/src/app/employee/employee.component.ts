import {HttpClient} from '@angular/common/http'
import { Component,OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

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
  designation: string = "";

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
    this.getAllEmployee();
    this.employeeFormGroup = new FormGroup({
      "name": new FormControl("",Validators.required),
      "designation": new FormControl("",Validators.required)
    })
  }
  getAllEmployee(){
    this.http.get("http://localhost:8084/Employee/view")
    .subscribe((resultData: any) =>{
      this.isResultLoaded=true;
      console.log(resultData);
      this.EmployeeArray = resultData;
    });
  }
  register(name: string, designation:string) {

    let bodyData = {
      name,designation
    };
    
    this.http.post("http://localhost:8084/Employee/add", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee Registered Successfully");
      this.getAllEmployee();
      
      this.name = '';
      this.designation = '';
    });
  }
  
  setUpdate(data: any){
    console.log(data);
    debugger
    this.name=data.name
    this.designation=data.designation
    this.cid=data.id
  }

  UpdateRecords(id:Number,name:string, designation:string){
    let bodyData = {
      id,name,designation
    };
    console.log(bodyData);
    this.http.put("http://localhost:8084/Employee/edit", bodyData, {responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee registered Updated")
      this.getAllEmployee();
      this.name='';
      this.designation='';
    });
  }
  save(){
    console.log(this.employeeFormGroup)
    let name= this.employeeFormGroup.value.name
    let designation= this.employeeFormGroup.value.designation
    let id=this.cid
    if(this.cid==0)
    this.register(name,designation)
    else
    this.UpdateRecords(id,name,designation)
  }
  setDelete(data: any){

    this.http.delete("http://localhost:8084/Employee/delete" +"/"+ data.id,{responseType :'text'}).subscribe((resultData:any) =>{
      console.log(resultData);
      alert("Employee Deleted")
      this.getAllEmployee();

      this.name='';
      this.designation='';

    });
  }
}
