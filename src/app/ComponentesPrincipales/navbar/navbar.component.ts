import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  rutas = inject(Router);
    auth = inject(AuthService);
   
    logout()
    {
      
      localStorage.clear();
      this.rutas.navigate(["inicioSesion"])
    }

    
  irClientes()
  {
    this.rutas.navigate(["clientes"]);
  }

  irProductos()
  {
    this.rutas.navigate(["productos"])
  }

  irPedidos()
  {
    this.rutas.navigate(["pedidos"])
  }
}
