
import {Component, OnInit,Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Location} from './models/location';
import {SearchOptionService} from './services/searchoption.service'


@Component({
  selector: 'location-selector',
  templateUrl: 'location.component.html',
  styleUrls: ['location.component.css'],
})



export class LocationComponent implements OnInit {

  
  countryVisible:boolean = false;
  portsVisible:boolean = false;
  countryControl = new FormControl();
  portControl = new FormControl();
  selectedCountry:Location;
  selectedPort:Location;
  Countries: Location[];
  Ports :Location[];
  isPortsLoading : boolean = false;

  @Output() countryEmitter = new EventEmitter<string>();

  @Output() portEmitter = new EventEmitter<string>();


  constructor(private searchOptionService:SearchOptionService){}

   
  filteredOptionsCountries: Observable<any[]>;
  filteredOptionsPorts: Observable<any[]>;

  onCountrySelected(event:any){
   
    this.selectedCountry=event.option.value;
    this.isPortsLoading=true;
    this.getLocations(this.selectedCountry.code);
    this.countryEmitter.emit(this.selectedCountry.code);

  }
  onPortSelected(event:any){
   
    this.selectedPort=event.option.value;
    this.portEmitter.emit(this.selectedPort.code);
    
  }

  displayFn(location: Location): string {
    return location && location.name ? location.name : '';
  }

  ngOnInit() {

    this.getCountries();
    
  }

  getCountries():void{

    this.searchOptionService.getCountries().subscribe(locations=>
        {
            this.Countries=locations;
            this.filteredOptionsCountries = this.countryControl.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value,this.Countries))
              );
           
           this.countryVisible = true;
        }
        );
  }

  getLocations(countryCode:string):void{
      this.searchOptionService.getLocations(countryCode).subscribe(locations=>{

        this.Ports = locations.map(loc=>({code:loc.unCode,name:loc.name}));
  
          this.filteredOptionsPorts = this.portControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value,this.Ports))
          );
       
       this.portsVisible = true;
       this.isPortsLoading=false;

      })

  }



  private _filter(value: any,data:Location[]): Location[] {
      let filterValue:string='';
    if(typeof value ==="string")
     filterValue = value.toLowerCase();
    else
     filterValue = value.name.toLowerCase();

    let filtered = data.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    return filtered;
  }

}

