import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  rutas = inject(Router);
  auth = inject(AuthService);
  isMenuOpen = false; // Variable para controlar la visibilidad del menú

  logout() {
      localStorage.clear();
      this.rutas.navigate(["inicioSesion"]);
  }

  irClientes() {
      this.rutas.navigate(["clientes"]);
  }

  irProductos() {
      this.rutas.navigate(["productos"]);
  }

  irPedidos() {
      this.rutas.navigate(["pedidos"]);
  }

  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Cambiar el estado del menú
  }
}