import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  public user: any;
  public modelUser: User;
  public modelUserEdit: User;
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
    this.modelUserEdit = new User("","","","","",[{
      customerId:"",
      hotelId:"",
      room:{roomId:"", name:"", description:"", services:"", cost:0, entryDate: null, exitDate: null},
      total: 0,
      daysElapsed: 0
    }]);
  }

  ngOnInit(): void {
    this.serchUserById();
    this.modal();
    this.modalDeleteUser();
  }

  serchUserById(){
    this._userService.serchUserById().subscribe(
      response=>{
        this.modelUser = response.foundUser;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  serchUserByIdEdit(){
    this._userService.serchUserById().subscribe(
      response=>{
        this.modelUserEdit = response.foundUser;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  updateUser(){
    this._userService.updateUser(this.modelUserEdit).subscribe(
      response=>{
        this.serchUserById();
        this.modelUserEdit.name = "";
        this.modelUserEdit.user = "";
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Usuario se Actualizo Correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un Error al Actualizar el Usuario',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  deleteUser(){
    this._userService.deleteUser().subscribe(
      response=>{
        this.logOff();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Usuario se Eliminó, hasta luego Amigo',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un Error al Eliminar el Usuario',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  logOff(){
    localStorage.clear();
    this._router.navigate(['/login']);
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

  modalDeleteUser(){
    var openmodal = document.querySelectorAll('.modal-delete-user-open')
    for (var i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event){
    	event.preventDefault()
    	toggleModal()
      })
    }
    
    const overlay = document.querySelector('.modal-delete-user-overlay')
    overlay.addEventListener('click', toggleModal)
    
    var closemodal = document.querySelectorAll('.modal-delete-user-close')
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
      const modal = document.querySelector('.modal-delete-user')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-delete-user-active')
    }
  }
}
