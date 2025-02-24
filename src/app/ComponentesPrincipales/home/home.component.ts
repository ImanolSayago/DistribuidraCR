import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { pedido } from '../../Interface/pedido';
import { PedidosService } from '../../services/pedidos.service';
import { ProductosService } from '../../services/productos.service';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

 
  ventasTotales: number = 0;
  cantidadpedidosentregados: number = 0;
  cantidadpedidosRealizados: number = 0;
  
  listapedidos: pedido[] = [];
  
  productosMap: { [key: number]: string } = {};

  serviceProductos = inject(ProductosService);
  servicioPedidos = inject(PedidosService);
  auth = inject(AuthService);
  rutas = inject(Router);

  ngOnInit(): void {
      this.traerpedidos();
      console.log(this.listapedidos)
  }

  logout() {
      localStorage.clear();
      this.rutas.navigate(["inicioSesion"]);
  }

  traerpedidos() {
    this.servicioPedidos.traerPedidos().subscribe({
        next: (lista) => {
            this.listapedidos = lista;
            
            this.contarpedidos();
            this.obtenerVentasTotales();
        },
        error: (err: Error) => {
            console.log(err.message);
        }
    });
}

contarpedidos() {
    const fechaActual = new Date();
    const fechaActualUTC = format(fechaActual, 'yyyy-MM-dd'); // Fecha actual en UTC

    for (const pedido of this.listapedidos) {
        if (pedido && pedido.fecha) {
            const fechaPedido = parseISO(pedido.fecha); // Convertir a objeto Date
            const fechaPedidoUTC = format(fechaPedido, 'yyyy-MM-dd'); // Fecha pedido en UTC

            console.log("Fecha pedido:", fechaPedidoUTC);
            console.log("Fecha actual:", fechaActualUTC);

            if (fechaPedidoUTC === fechaActualUTC) {
                this.cantidadpedidosRealizados++;
                console.log("Pedido realizado encontrado");
                if (pedido.estado === "entregado") {
                    this.cantidadpedidosentregados++;
                    console.log("Pedido entregado encontrado");
                }
            }
        }
    }
    console.log("Pedidos realizados:", this.cantidadpedidosRealizados);
    console.log("Pedidos entregados:", this.cantidadpedidosentregados);
}

obtenerVentasTotales() {
    this.ventasTotales = 0;
    const fechaActual = new Date();
    const fechaActualUTC = format(fechaActual, 'yyyy-MM-dd'); // Fecha actual en UTC

    this.listapedidos.forEach(pedido => {
        if (pedido && pedido.fecha) {
            const fechaPedido = parseISO(pedido.fecha); // Convertir a objeto Date
            const fechaPedidoUTC = format(fechaPedido, 'yyyy-MM-dd'); // Fecha pedido en UTC

            console.log("Fecha pedido:", fechaPedidoUTC);
            console.log("Fecha actual:", fechaActualUTC);
            console.log("Estado pedido:", pedido.estado);

            if (pedido.estado === "entregado" && fechaPedidoUTC === fechaActualUTC) {
                pedido.detalles.forEach(detalle => {
                    console.log("Detalle:", detalle);
                    if (detalle.precio) {
                        this.ventasTotales += detalle.cantidad * detalle.precio;
                    } else {
                        this.serviceProductos.getProductoByID(detalle.productoId).subscribe({
                            next: (producto) => {
                                console.log("Producto:", producto);
                                detalle.precio = producto.precio;
                                this.ventasTotales += detalle.cantidad * producto.precio;
                            },
                            error: (err) => console.log(err.message)
                        });
                    }
                });
            }
        }
    });
    console.log("Ventas totales:", this.ventasTotales);
}
}