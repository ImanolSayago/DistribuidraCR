import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  auth = inject(AuthService);
  rutas = inject(Router);
  logout()
  {
    
    localStorage.clear();
    this.rutas.navigate(["inicioSesion"])
  }
}
