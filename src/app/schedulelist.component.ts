import {Component,OnInit, ViewChild} from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {ScheduleService} from './services/schedule.service'
import { Schedule } from './models/schedule';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({

    templateUrl:'schedulelist.component.html',
    styleUrls: ['schedulelist.component.css']

})

export class ScheduleListComponent  implements OnInit {

    schedules:Schedule[];
    isScheduleLoading:boolean=true;
    isEmptyResult:boolean=false;
    dataSource = new MatTableDataSource<Schedule>(this.schedules);
    displayedColumns: string[] = ['id','carrier','vessel', 'productType', 'eta', 'etd'];
    selectedId: string;
    from:string;
    to:string;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        private scheduleService:ScheduleService
      ) {}


    ngOnInit() {
        this.from = this.route.snapshot.params.from;
        this.to = this.route.snapshot.params.to;
        this.getSchedules(this.from,this.to);
        
      }  

      getSchedules(from:string,to:string):void{

         this.scheduleService.getSchedules(from,to).subscribe(result=>{
             if(result.length>0){
                this.schedules = result;
                this.dataSource = new MatTableDataSource<Schedule>(this.schedules);
                this.dataSource.paginator = this.paginator;
             }
             else{
                 this.isEmptyResult = true;
             }
             this.isScheduleLoading=false;
             
            
         });

         
      }

}
