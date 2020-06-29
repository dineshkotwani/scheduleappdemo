
import {Component, OnInit,OnChanges} from '@angular/core';
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';



export interface SearchParameters{
  fromcountry:string;
  tocountry:string;
  fromport:string;
  toport:string;
}



@Component({
  //selector: 'search-option',
  templateUrl: 'searchoption.component.html',
  styleUrls: ['searchoption.component.css'],
})


export class SearchOptionComponent  {

  searchParams : SearchParameters={fromcountry:'',fromport:'',tocountry:'',toport:''};

  constructor(private _router: Router,private _snackBar: MatSnackBar) { }

  setOriginCountry(event:any){

  this.searchParams.fromcountry= event;
  console.log(this.searchParams);

  }

  setOriginPort(event:any){

    this.searchParams.fromport= event;
    console.log(this.searchParams);
    }

  setDestCountry(event:any){

      this.searchParams.tocountry= event;
      console.log(this.searchParams);
    
  }
    
  setDestPort(event:any){
        this.searchParams.toport= event;
        console.log(this.searchParams);
  }

  goToScheduleList(url){

    if(this.searchParams.fromport && this.searchParams.toport){
      this._router.navigate([url,this.searchParams.fromport,this.searchParams.toport]);
      
    }
    else if(this.searchParams.fromport && this.searchParams.tocountry){
      this._router.navigate([url,this.searchParams.fromport,this.searchParams.tocountry]);
    }
    else if(this.searchParams.fromcountry && this.searchParams.toport){
      this._router.navigate([url,this.searchParams.fromcountry,this.searchParams.toport]);
    }
    else if(this.searchParams.fromcountry && this.searchParams.tocountry){
      this._router.navigate([url,this.searchParams.fromcountry,this.searchParams.tocountry]);
      
    }
  }

  validateSearchOptions(url){
    if(!((this.searchParams.fromcountry || this.searchParams.fromport) && (this.searchParams.tocountry||this.searchParams.toport))){
      this.openSnackBar("Please select origin and destination country before searching","Error");
    }
    this.goToScheduleList(url);
  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
}
}