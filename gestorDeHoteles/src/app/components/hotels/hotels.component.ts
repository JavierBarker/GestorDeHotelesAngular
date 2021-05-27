import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  public getHotels: any;
  public token: any;
  public modelHotel: Hotel;
  public modelHotelEdit: Hotel;

  constructor(
    private _hotelService: HotelService,
    public _userService: UserService
    ) {
      this.token = this._userService.getTokenLocal();
      this.modelHotel = new Hotel("",0,"","","","",[{
        _id:"",
        nameRoom:"",
        descriptionRoom:"",
        services:"",
        cost: 0,
        imageRoom:""
      }],
      [{
        _id:"",
        nameEvent:"",
        descriptionEvent:"",
        typeEvent:""
      }]);

      this.modelHotelEdit = new Hotel("",0,"","","","",[{
        _id:"",
        nameRoom:"",
        descriptionRoom:"",
        services:"",
        cost: 0,
        imageRoom:""
      }],
      [{
        _id:"",
        nameEvent:"",
        descriptionEvent:"",
        typeEvent:""
      }]);
    }

  ngOnInit(): void {
    this.showHotels();
    this.modal();
    this.modalEditHotel();
    this.modalDeleteHotel();
  }

  showHotels(){
    this._hotelService.showHotels(this.token).subscribe(
      response=>{
        this.getHotels = response.foundHotels;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  addHotel(){
    this._hotelService.addHotel(this.modelHotel, this.token).subscribe(
      response=>{
        this.showHotels();
        this.modelHotel.name = "";
        this.modelHotel.address = "";
        this.modelHotel.administratorId = "";
        this.modelHotel.image = "";
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Hotel se Agrego Correctamente con su Administrador',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un Error al Agregar el Hotel',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

  }

  serchHotelById(hotelId){
    this._hotelService.getHotelById(hotelId, this.token).subscribe(
      response=>{
        this.modelHotelEdit = response.foundHotel;
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  editHotel(){
    this._hotelService.updateHotel(this.modelHotelEdit, this.token).subscribe(
      response=>{
        this.showHotels();
        this.modelHotelEdit.name = "";
        this.modelHotelEdit.address = "";
        this.modelHotelEdit.administratorId = "";
        this.modelHotelEdit.image = "";
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Hotel se Actualizo Correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un Error al Actualizar el Hotel',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  deleteHotel(){
    this._hotelService.deleteHotel(this.modelHotelEdit._id, this.token).subscribe(
      response=>{
        this.showHotels();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Hotel se Eliminó Correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error =>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un Error al Eliminar el Hotel',
          showConfirmButton: false,
          timer: 1500
        })
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
  

  modalEditHotel(){
    var openmodal = document.querySelectorAll('.modal-edit-hotel-open')
    for (var i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event){
    	event.preventDefault()
    	toggleModal()
      })
    }
    
    const overlay = document.querySelector('.modal-edit-hotel-overlay')
    overlay.addEventListener('click', toggleModal)
    
    var closemodal = document.querySelectorAll('.modal-edit-hotel-close')
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
      const modal = document.querySelector('.modal-edit-hotel')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-edit-hotel-active')
    }
  }

  modalDeleteHotel(){
    var openmodal = document.querySelectorAll('.modal-delete-hotel-open')
    for (var i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event){
    	event.preventDefault()
    	toggleModal()
      })
    }
    
    const overlay = document.querySelector('.modal-delete-hotel-overlay')
    overlay.addEventListener('click', toggleModal)
    
    var closemodal = document.querySelectorAll('.modal-delete-hotel-close')
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
      const modal = document.querySelector('.modal-delete-hotel')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-delete-hotel-active')
    }
  }
}
