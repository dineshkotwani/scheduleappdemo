import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router'
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider'
import {MatRadioModule} from '@angular/material/radio'
import {SearchOptionComponent} from './searchoption.component'
import {MatAutocompleteModule} from '@angular/material/autocomplete' 
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {SearchOptionService} from './services/searchoption.service'
import {ScheduleService} from './services/schedule.service'
import {LocationComponent} from './location.component';
import {MatButtonModule} from '@angular/material/button'
import {ScheduleListComponent} from './schedulelist.component'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { HttpErrorHandler }   from './services/httperrorhandler.service';
import { MessageService }     from './services/message.service';


const appRoutes:Routes=[

  {path:'home',component:SearchOptionComponent},
  {path:'scheduleList/:from/:to', component:ScheduleListComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'}
  
]



@NgModule({
  declarations: [
    AppComponent,
    SearchOptionComponent,
    LocationComponent,
    ScheduleListComponent
  ],
  providers:[
    SearchOptionService,
    ScheduleService,
    HttpErrorHandler,
    MessageService
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
