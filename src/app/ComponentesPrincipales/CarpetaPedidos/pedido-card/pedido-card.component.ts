import { Component, inject, OnInit } from '@angular/core';
import { pedido } from '../../../Interface/pedido';
import { PedidosService } from '../../../services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { DetallePedido } from '../../../Interface/DetallePedido';
import { DatePipe } from '@angular/common';
import { cliente } from '../../../Interface/cliente';
import { ClientesService } from '../../../services/clientes.service';
import { ProductosService } from '../../../services/productos.service';
import { productos } from '../../../Interface/productos';

@Component({
  selector: 'app-pedido-card',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './pedido-card.component.html',
  styleUrl: './pedido-card.component.css'
})
export class PedidoCardComponent implements OnInit{

  pedidoID:number=0;
  
  servicepedidos = inject(PedidosService);
  serviceClientes= inject(ClientesService);
  serviceProductos= inject(ProductosService);

  rutas = inject(Router);
  route = inject(ActivatedRoute)
  listClientes:cliente[]=[];
  listaproductos:productos[]=[];
  total = 0;

  producto:productos={
    nombre:"",
    precio:0,
    stock:0,
    categoriaNombre:""
  }

 pedido:pedido={
  clienteId:0,
  descripcion:"",
  estado:"",
  fecha:"",
  detalles:[]
  }

  productosMap: { [key: number]: string } = {};
  ngOnInit(): void {

    
    this.route.paramMap.subscribe(params => {
      this.pedidoID = Number(params.get('id'));

      this.servicepedidos.traerPedidoPorID(this.pedidoID).subscribe({
        next: (pedidoAPI) => {
          this.pedido = pedidoAPI;

          // Traer los nombres de los productos
          this.pedido.detalles.forEach(detalle => {
            this.serviceProductos.getProductoByID(detalle.productoId).subscribe({
              next: (producto) => {
                this.productosMap[detalle.productoId] = producto.nombre;  // Guardar el nombre
               
              detalle.precio = producto.precio;
              this.calcularprecio();
              },
              error: (err) => console.log(err.message)
            });
          });
        },
        error: (err) => console.log(err.message)
      });
    });
 

      //trae todos los clientes asi podemos buscar el nombre por el ID//
     this.serviceClientes.getClientes().subscribe(
      {
        next:(lista)=>
        {
          this.listClientes= lista;
        },
        error:(err:Error)=>
        {
          console.log(err.message);
        }
      }
     )
  };

  obtenerNombreProducto(productoId: number): string {
    return this.productosMap[productoId] || 'Producto no encontrado';
  }

  obtenerNombreCliente(id: number): string {
    const cliente = this.listClientes.find(c => c.id === id);
    
    return cliente ? cliente.nombre : 'Cliente no encontrado';
  }

  irPedidos()
  {
    this.rutas.navigate(["pedidos"])
  }

  calcularprecio() {
    this.total = 0; // Reiniciar el total
  
    this.pedido.detalles.forEach(detalle => {
      if (detalle.precio) { 
        this.total += detalle.cantidad * detalle.precio;
      }
    });
  }






}
