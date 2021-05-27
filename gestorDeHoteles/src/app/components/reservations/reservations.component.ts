import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationsService } from 'src/app/services/reservations.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  public modelReservations: Reservation;
  public reservations: any;
  public token: any;
  constructor(
    private _reservationService : ReservationsService,
    private _userService: UserService
  ) {
    this.token = this._userService.getTokenLocal();
    this.modelReservations = new Reservation("","","",{
      roomId: "",
      name: "",
      description: "",
      services:"",
      cost: 0,
      entryDate: null,
      exitDate: null
    },0, null);
  }

  ngOnInit(): void {
    this.showReservations();
  }

  showReservations(){
    this._reservationService.showMyReservations(this.token).subscribe(
      response=>{
        this.reservations = response.foundReservations;
        console.log(this.reservations);
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
}
