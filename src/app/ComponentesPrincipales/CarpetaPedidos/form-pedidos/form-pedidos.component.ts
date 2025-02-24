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
import Swal from 'sweetalert2'
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
    
    if (productoEncontrado) {
  
    const detalle: DetallePedido = {
      productoId: productoEncontrado.id ?? 0,
      cantidad: this.formulario.value.cantidadprodu && this.formulario.value.cantidadprodu > 0 
        ? this.formulario.value.cantidadprodu 
        : 1
    };

    if(productoEncontrado.stock>=detalle.cantidad)
    {

      detalle.productoId=productoEncontrado.id??0;
      this.listaproductoselejidos.push(detalle);

      this.alertaProductoCargado()

      this.editarStock(detalle.productoId,detalle.cantidad);
     
    }
    else{
      this.alertaProductoSinStock()
      
    }
    

  
    
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

        this.servicePedido.addPedidos(pedido).subscribe({
          next:()=>
          {
           this.alertaPedidoCargado()
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
  
    editarStock(id:number, stock:number)
    {
      this.serviceProducto.editStockProducto(id,stock).subscribe({
        next:()=>
        {
          
        },
        error:(err:Error)=>
        {
          console.log(err.message);
        }
      })
    };

  

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

  alertaPedidoCargado()
  {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Pedido cargado con exito",
      showConfirmButton: false,
      timer: 1200
    });
  }

  alertaProductoCargado()
  {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Producto cargado al pedido",
      showConfirmButton: false,
      timer: 1200
    });
  }

  alertaProductoSinStock()
  {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Producto sin stock",
      showConfirmButton: false,
      timer: 1200
    });
  }

}
