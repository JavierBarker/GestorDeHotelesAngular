import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [UserService]
})
export class AdminsComponent implements OnInit {
  public modelUser: User;
  public getUsers: any;
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
    this.showAdminHotelUsers();
    this.modal();
  }

  showAdminHotelUsers(){
    this._userService.showAdminHotelUsers().subscribe(
      response=>{
        this.getUsers = response.usersFind;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  registerAdminHotel(){
    this._userService.registerAdminHotel(this.modelUser).subscribe(
      response=>{
        //this._router.navigate(['/admins']);
        this.showAdminHotelUsers();
        this.modelUser.name = "";
        this.modelUser.user = "";
        this.modelUser.password = "";
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

  modal(){
    var openmodal = document.querySelectorAll('.modal-open')
    for (var i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event){
    	event.preventDefault()
    	toggleModal()
      })
    }
    
    const overlay = document.querySelector('.modal-overlay')
    overlay.addEventListener('click', toggleModal)
    
    var closemodal = document.querySelectorAll('.modal-close')
    for (var i = 0; i < closemodal.length; i++) {
      closemodal[i].addEventListener('click', toggleModal)
    }
    
    document.onkeydown = function(evt: any) {
      evt = evt || window.event
      var isEscape = false
      if ("key" in evt) {
    	isEscape = (evt.key === "Escape" || evt.key === "Esc")
      } else {
    	isEscape = (evt.keyCode === 27)
      }
      if (isEscape && document.body.classList.contains('modal-active')) {
    	toggleModal()
      }
    };
    
    
    function toggleModal () {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    }
  }
}
