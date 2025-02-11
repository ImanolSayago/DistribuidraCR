import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../navbar/navbar.component";
import { PedidosService } from '../../../services/pedidos.service';
import { pedido } from '../../../Interface/pedido';
import { productos } from '../../../Interface/productos';
import { cliente } from '../../../Interface/cliente';
import { ClientesService } from '../../../services/clientes.service';
import { ProductosService } from '../../../services/productos.service';
import { DetallePedido } from '../../../Interface/DetallePedido';

@Component({
  selector: 'app-form-pedidos',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './form-pedidos.component.html',
  styleUrl: './form-pedidos.component.css'
})
export class FormPedidosComponent implements OnInit {


  listaproductoselejidos:DetallePedido[]=[];

  ngOnInit(): void {
   this.traerClientesYProductos();

  }

    hoy = new Date();
    fechaSinHora = this.hoy.toISOString().split('T')[0]; 

 

  listaProductos: productos[]= [];
  listaClientes:cliente[]=[];

  //esto para filtrar los productos elejidos//


  fb = inject(FormBuilder);

  //injectamos services necesarios//
  servicePedido = inject(PedidosService);
  serviceCliente = inject(ClientesService);
  serviceProducto= inject(ProductosService);

  formulario = this.fb.nonNullable.group({
    cliente:[0, Validators.required], // Cliente obligatorio
      descripcion: ['', Validators.maxLength(255)], // Descripción opcional
      productos:["",Validators.required],
      cantidadprodu:[1,Validators.required]
  })

  agregarproducto()
  {
    const nombreProducto = this.formulario.value.productos;

    // Buscar el producto en la lista
    const productoEncontrado = this.listaProductos.find(e => e.nombre === nombreProducto);
console.log(productoEncontrado?.nombre)
console.log(productoEncontrado?.id)
    if (productoEncontrado) {
  
    const detalle: DetallePedido = {
      productoId: productoEncontrado.id ?? 0,
      cantidad: this.formulario.value.cantidadprodu && this.formulario.value.cantidadprodu > 0 
        ? this.formulario.value.cantidadprodu 
        : 1
    };
    detalle.productoId=productoEncontrado.id??0;

    //esto para filtrar los productos elejidos//
   
   this.listaproductoselejidos.push(detalle);
    
    } else {
    console.log("Producto no encontrado");
  }
  }

  enviarPedido() {
    
      if (this.formulario.valid) {


        var pedido:pedido = {
          clienteId:this.formulario.value.cliente ?? 0,
          descripcion:this.formulario.value.descripcion??"",
          estado:"pendiente",
          fecha:this.fechaSinHora,
          detalles:this.listaproductoselejidos
        }

        console.log("detalles del pedido",pedido.detalles);
        console.log("descripcion del pedido",pedido.descripcion);
        console.log("cliente id",pedido.clienteId);
        console.log("estado",pedido.estado);
        console.log("fecha pedido",pedido.fecha);
        console.log(this.listaproductoselejidos);
        console.log(this.formulario.value.cantidadprodu)


        this.servicePedido.addPedidos(pedido).subscribe({
          next:()=>
          {
            console.log("pedido cargado correctamente");
            this.listaproductoselejidos = [];
          },
          error:(err:Error)=>
          {
            console.log(err.message);
          }
        })
      } else {
        console.log('Formulario inválido');
      }
    }
  


  

  traerClientesYProductos()
  {
    this.serviceCliente.getClientes().subscribe({
      next:(lista)=>
      {
        this.listaClientes = lista;
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })

    this.serviceProducto.getProductos().subscribe({
      next:(listaPR)=>
      {
        this.listaProductos=listaPR;
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

}
