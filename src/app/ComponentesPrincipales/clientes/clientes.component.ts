import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ClientesService } from '../../services/clientes.service';
import { cliente } from '../../Interface/cliente';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{

  rutas = inject(Router);
  listaclientes:cliente[]= [];
  servicioClientes = inject(ClientesService);
  ngOnInit(): void {
   this.traerClientes();
  }




  FB = inject(FormBuilder);

  formEliminar = this.FB.nonNullable.group({
    nombre:["",Validators.required]
  }) 


  eliminarPorNombre() {
    const nombreCliente = this.formEliminar.value.nombre?.trim();
  
    if (!nombreCliente) {
      alert("Por favor, ingrese el nombre del cliente.");
      return;
    }
  
    const clienteEncontrado = this.listaclientes.find(c => c.nombre.toLowerCase() === nombreCliente.toLowerCase());
    console.log(clienteEncontrado?.nombre);
  
    if (!clienteEncontrado) {
      alert("Cliente no encontrado.");
      return;
    }
  
    if (confirm(`¿Seguro que querés eliminar a ${clienteEncontrado.nombre}?`)) {
      this.servicioClientes.deleteCliente(clienteEncontrado.id!).subscribe(() => {
        this.listaclientes = this.listaclientes.filter(c => c.id !== clienteEncontrado.id);
        this.alertaEliminarCliente()
        this.formEliminar.reset();
      });
    }
  }
  traerClientes()
  {
    this.servicioClientes.getClientes().subscribe(
      {
        next:(lista)=>
        {
          if(lista!=null)
          {
            this.listaclientes = lista;
          }
        },
        error:(err:Error)=>
        {
          console.log(err.message);
        }
      }
    )
  }

  deleteClientes(id:number){
    
    this.servicioClientes.deleteCliente(id).subscribe({
      next:()=>
      {
        
        window.location.reload();
        
      },
      error:(err:Error)=>
      {
        this.alertaErrorEliminarCliente()
        console.log(err.message);
      }
    })
  }

  ircrearclientes(){
    this.rutas.navigate(["crearCliente"]);
  }

  alertaErrorEliminarCliente()
  {
     Swal.fire({
          position: "top-end",
          icon: "error",
          title: "El cliente no se pudo eliminar",
          showConfirmButton: false,
          timer: 1200
        });
  }

  alertaEliminarCliente()
  {
     Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente eliminado",
          showConfirmButton: false,
          timer: 1200
        });
  }
}
