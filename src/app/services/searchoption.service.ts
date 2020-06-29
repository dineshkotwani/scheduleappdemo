import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Location} from '../models/location';
import { HttpErrorHandler, HandleError } from './httperrorhandler.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class SearchOptionService{
    locationsApiBaseUrl = environment.APIBaseUrl
    private handleError: HandleError;

    constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler){
      this.handleError = httpErrorHandler.createHandleError('SearchOptionService')
    }

    getLocations(countryCode:string):Observable<any[]>{
       
       let locationsUrl ='codes/locations?country='+countryCode;

       return this.http.get<any>(this.locationsApiBaseUrl+locationsUrl)
                       .pipe(
                          catchError(this.handleError('getLocations', []))
                        );

    }
    getCountries():Observable<Location[]>{

        let countriesUrl = 'codes/countries';

        return this.http.get<Location[]>(this.locationsApiBaseUrl+countriesUrl)
                        .pipe(
                          catchError(this.handleError('getCountries', []))
                        );
    }

}