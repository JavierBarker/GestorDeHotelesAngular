import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/src/sweetalert2.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public modelUser: User;
  public token: any;
  public getIdentity: any;

  constructor(
    public _userService: UserService,
    private _router: Router
  ){
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

  getToken(){
    this._userService.login(this.modelUser, 'true').subscribe(
      response =>{
        this.token = response.token;
        localStorage.setItem('token', this.token);
        this._router.navigate(['/inicio']);

      }
    )
  }

  login(){
    this._userService.login(this.modelUser, 'false').subscribe(
      response=>{
        this.getIdentity = response.login;
        localStorage.setItem('identity', JSON.stringify(this.getIdentity));
        this.getToken();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Logged in Correctly',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Incorrect E-mail or Password',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
}
