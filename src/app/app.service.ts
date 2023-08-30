import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

import {map, Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({providedIn: 'root'})
export class appService {

    constructor(private http: HttpClient) {

    }

    private getAllSkillRootApi: string = environment.apiHost + 'skill/';
    private getAllEmployeeRootApi: string = environment.apiHost + 'employee/';
    private createSkillApi: string = this.getAllSkillRootApi + 'create';
    private createEmployeeApi: string = this.getAllEmployeeRootApi + 'create';
    private getAllSkillApi: string = this.getAllSkillRootApi +'getAllList';
    private getAllEmployeeApi: string = this.getAllEmployeeRootApi +'getEmployeeList';
    private getAllSkillApiById: string = this.getAllSkillRootApi +'getSkillBy/';
    private getAllEmployeeApiById: string = this.getAllEmployeeRootApi +'getEmployeeBy/';

    createSkill(skillId: string,skillName: string, skillDescription: string, marks: string): Observable<any> {

        return this.http.post(this.createSkillApi, {

            id: skillId,
            skillName: skillName,
            skillDescription: skillDescription,
            marks: marks

            },
        );
    }
    createEmployee(id:string,name: string,dateOfBirth: string, employeeAge: string,address: string,skill: string): Observable<any> {

        return this.http.post(this.createEmployeeApi, {

            id: id,
            employeeName: name,
            employeeAge: employeeAge,
            skillId: skill,
            dateOfBirth: dateOfBirth,
            address: address
            },
        );
    }

    public getSkillList(): Observable<any> {

        return this.http.get(this.getAllSkillApi , httpOptions)
            .pipe(map(res => res));

    }

    public getEmployeeist(): Observable<any> {

        return this.http.get(this.getAllEmployeeApi , httpOptions)
            .pipe(map(res => res));

    }

    public getSkillListById(id: any): Observable<any> {

        return this.http.get(this.getAllSkillApiById+id, httpOptions)
            .pipe(map(res => res));

    }
    public getAllEmployeeAndSkillById(id: any): Observable<any> {

        return this.http.get(this.getAllEmployeeApiById+id, httpOptions)
            .pipe(map(res => res));

    }



}


