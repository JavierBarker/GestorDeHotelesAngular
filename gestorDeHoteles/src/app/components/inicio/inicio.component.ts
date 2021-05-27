import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public gethotels: any;
  public modelHotelId: Hotel;
  constructor(private _hotelService: HotelService) {

  }

  ngOnInit(): void {
    this.mostRequestedHotels();
  }

  
  
  mostRequestedHotels(){
    this._hotelService.mostRequestedHotels().subscribe(
      response=>{
        this.gethotels = response.mostRequestedHotels;
      },
      error =>{
        console.log(<any>error);
      }
    )
      
  }


  cmbRooms(num){
    const botonRooms = document.querySelectorAll('.buttonRooms');
    const menuRooms = document.querySelectorAll('.menuRooms');
    for (var i = 0; i < botonRooms.length; i++) {
      botonRooms[i].addEventListener('click', function(event){
        event.preventDefault()
        menuRooms[num].classList.toggle('hidden');
      })
    }
  }

  cmbEvents(num){
    const botonEvents = document.querySelectorAll('.botonEvents');
    const menuEvents = document.querySelectorAll('.menuEvents');
    for (var i = 0; i < botonEvents.length; i++) {
      botonEvents[i].addEventListener('click', function(event){
        event.preventDefault()
        menuEvents[num].classList.toggle('hidden');
      })
    }
  }
}
