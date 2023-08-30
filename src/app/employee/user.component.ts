import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {appService} from "../app.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  skillList: any = [];
  employeeById: any;
  employeeList: any ;
  employeeForm!: FormGroup;
  returnUrl!: string;
  submitted = false;
  show!: boolean;
  serverError = '';
  employeeListDataSource: MatTableDataSource<any>;


  constructor(private formBuilder: FormBuilder,
              private appService: appService ,
              private router: Router) {
  }

  public displayedColumns: string[] = ['govId','name','dateOfBirth','age', 'address', 'action'];

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      name: ['', !Validators.required],
      dateOfBirth: ['', !Validators],
      employeeAge: ['', !Validators],
      address: ['', !Validators.required],
      skill: ['', !Validators.required]
    });
    this.getSkillList();
    this.getEmployeeList();
  }

  get f() {
    return this.employeeForm.controls;
  }

  getSkillList() {

    this.appService.getSkillList().subscribe(res => {
      res.forEach((skill: any) => {
        this.skillList.push(skill)
      });

    });
  }

  getEmployeeList() {

    this.appService.getEmployeeist().subscribe(res => {
        this.employeeListDataSource = new MatTableDataSource(res);
        this.employeeListDataSource.paginator = this.paginator;
        console.log(res)
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    this.appService.createEmployee(this.employeeById,this.f.name.value,this.f.dateOfBirth.value,this.f.employeeAge.value,this.f.address.value,this.f.skill.value)
        .subscribe(
            data => {
              this.getSkillList();
              window.location.reload()
            },
            error => {
              if (error.status === 500) {
                this.serverError = 'Already taken !!';
              }
            });
  }

  getAllEmployeeAndSkillById(id: any) {
    this.appService.getAllEmployeeAndSkillById(id).subscribe(res => {
      this.employeeList = res;
      console.log(res)
    });
  }

  edit(id: any) {
    this.getAllEmployeeAndSkillById(id)
    this.employeeById = id;
  }
}
