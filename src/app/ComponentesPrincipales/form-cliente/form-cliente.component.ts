import { Component, inject, INJECTOR } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { cliente } from '../../Interface/cliente';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-form-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.css'
})
export class FormClienteComponent {
  clienteService= inject(ClientesService);
  rutas = inject(Router)
  FB=inject(FormBuilder);

  formulario= this.FB.nonNullable.group(
    {
      nombre:["",Validators.required],
      descripcion:[""]
    }
  )

  cli:cliente = {
    nombre:"",
    descripcion:""
  }

  cargarcliente()
  {
    if (this.formulario.valid) {
      this.cli.nombre = this.formulario.value.nombre ?? '';
      this.cli.descripcion = this.formulario.value.descripcion;

    this.clienteService.addCliente(this.cli).subscribe({
      next:()=>
      {
        console.log("cliente cargado")
        this.rutas.navigate(["clientes"])
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }}
}
