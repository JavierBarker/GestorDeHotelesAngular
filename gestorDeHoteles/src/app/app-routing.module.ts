import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './components/admins/admins.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegisterComponent } from './components/register/register.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admins', component: AdminsComponent},
  { path: 'hotels', component: HotelsComponent},
  { path: 'my-account', component: MyAccountComponent},
  { path: 'reservations', component: ReservationsComponent},
  { path: '**', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
