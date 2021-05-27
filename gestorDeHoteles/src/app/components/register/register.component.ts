import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public modelUser: User;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.modelUser = new User("","","","","",[{
      customerId:"",
      hotelId:"",
      room:{roomId:"", name:"", description:"", services:"", cost:0, entryDate: null, exitDate: null},
      total: 0,
      daysElapsed: 0
    }]);
  }

  ngOnInit(): void {
  }

  registerNormalUser(){
    this._userService.registerUser(this.modelUser).subscribe(
      response=>{
        this._router.navigate(['/login']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Usuario se registro Correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un Error al Registar el Usuario',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
}
