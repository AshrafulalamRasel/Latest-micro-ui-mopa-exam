import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import {appService} from "../app.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    skillForm!: FormGroup;
    returnUrl!: string;
    submitted = false;
    show!: boolean;
    showDoctorInfo!: boolean;
    serverError = '';
    skillList: any;
    skillId: any;

    employeeListDataSource: MatTableDataSource<any>;

    constructor(private formBuilder: FormBuilder,
                private appService: appService,
                private router: Router) {
    }

    public displayedColumns: string[] = ['Skill_Name', 'Skill_Description', 'Mark', 'Action'];
    private Toast: any;

    ngOnInit() {
        this.skillForm = this.formBuilder.group({
            skillName: ['', Validators.required],
            skillDescription: ['', !Validators],
            marks: ['', Validators.required]
        });
        this.getSkillList();
    }

    get f() {
        return this.skillForm.controls;
    }

    getSkillList() {

        this.appService.getSkillList().subscribe(res => {
            res.forEach((employeedata: any) => {
                this.employeeListDataSource = new MatTableDataSource(res);
                this.employeeListDataSource.paginator = this.paginator;
            });

        });
    }

    getSkillListById(id: any) {
        this.appService.getSkillListById(id).subscribe(res => {
            this.skillList = res;
            console.log(res)
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.skillForm.invalid) {
            return;
        }
            this.appService.createSkill(this.skillId,this.f.skillName.value,
                this.f.skillDescription.value,
                this.f.marks.value)
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

    edit(id: any) {
        this.getSkillListById(id)
        this.skillId = id;
    }
}
