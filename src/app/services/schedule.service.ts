import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Schedule} from '../models/schedule';
import { HttpErrorHandler, HandleError } from './httperrorhandler.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class ScheduleService{
    apiBaseUrl = environment.APIBaseUrl;
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
      this.handleError = httpErrorHandler.createHandleError('ScheduleService');
    }

    getSchedules(from:string,to:string):Observable<Schedule[]>{

        let scheduleUrl = 'schedules?from='+from+'&to='+to;
        return this.http.get<Schedule[]>(this.apiBaseUrl+scheduleUrl)
                   .pipe(
                    catchError(this.handleError('getSchedules', []))
                  );;
    }

}