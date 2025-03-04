import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { pedido } from '../../../Interface/pedido';
import { PedidosService } from '../../../services/pedidos.service';
import { Router, RouterLink } from '@angular/router';
import { ClientesService } from '../../../services/clientes.service';
import { cliente } from '../../../Interface/cliente';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedidoshome',
  standalone: true,
  imports: [NavbarComponent,DatePipe,RouterLink],
  templateUrl: './pedidoshome.component.html',
  styleUrl: './pedidoshome.component.css'
})
export class PedidoshomeComponent implements OnInit {


  ngOnInit(): void {
  this.traerpedidos();
  this.traerclientes();
  }

  rutas = inject(Router);
    //servicios//
    servicePedidos=inject(PedidosService);
    serviceClientes = inject(ClientesService);

    //lista clientes//
    listaclientes:cliente[]=[];
    //listas para mostrar pedidos//
    listapedidos:pedido[]=[]
   
    listapedidosfiltrada:pedido[]=[];

  traerpedidos()
  {
    this.servicePedidos.traerPedidos().subscribe({
    next:(lista)=>
    {
      this.listapedidos=lista;
    },
      error:(err:Error)=>
    {
      console.log(err.message);
    }
    })
  }

  traerclientes()
  {
    this.serviceClientes.getClientes().subscribe({
      next:(lista)=>
      {
        this.listaclientes=lista;
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  eliminarpedido(id:number)
  {
    this.servicePedidos.deletePedido(id).subscribe({
      next:()=>
      {
       
        this.rutas.navigate(["pedidos"]);
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  actualizarestado(id:number)
  {
    this.servicePedidos.actualizarEstado(id,"entregado").subscribe({
      next:()=>
      {
        this.rutas.navigate(["pedidos"]);
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  obtenerNombreCliente(id: number): string {
    const cliente = this.listaclientes.find(c => c.id === id);
    
    return cliente ? cliente.nombre : 'Cliente no encontrado';
  }

  
ircrearpedido()
{
  this.rutas.navigate(["crearpedido"])
}
  mostrarpedidoporCategoria(estado: string): void {
    
    this.listapedidosfiltrada = this.listapedidos.filter(pedido => pedido.estado === estado);
  }

  irCartaPedido()
  {
    this.rutas.navigate(["cardPedido"]);
  }
}
