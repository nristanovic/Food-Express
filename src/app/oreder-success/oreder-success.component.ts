import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oreder-success',
  templateUrl: './oreder-success.component.html',
  styleUrls: ['./oreder-success.component.css']
})
export class OrederSuccessComponent  {

  constructor(route: Router
    ){
      setTimeout(() => {
        route.navigate(['/'])
      }, 8000 )
    }
}
