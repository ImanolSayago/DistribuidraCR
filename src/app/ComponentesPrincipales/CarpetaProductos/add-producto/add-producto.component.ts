import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { CategoriasService } from '../../../services/categorias.service';
import { TmplAstSwitchBlock } from '@angular/compiler';
import { categoria } from '../../../Interface/categoria';
import { productos } from '../../../Interface/productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-producto',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule],
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.css'
})
export class AddProductoComponent implements OnInit{

  rutas = inject(Router)
  ngOnInit(): void {
   this.traerCategorias();
  }

  fb = inject(FormBuilder)
  serviceproducto = inject(ProductosService);
  catservice= inject(CategoriasService);

  listacategorias:categoria[]=[];

  formulario = this.fb.nonNullable.group(
    {
      categoria:["",Validators.required],
      nombre:["",Validators.required],
      stock:[0,Validators.required],
      precio:[0,Validators.required]
    }
  );

  traerCategorias()
  {
    this.catservice.getCategorias().subscribe({
      next:(lista)=>
      {
        this.listacategorias=lista;
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  nuevoproducto:productos={
    nombre:"",
    precio:0,
    stock:0,
    categoriaNombre:""
  }

  agregarProducto()
  {
    //seteamos valores al nuevo producto//
    this.nuevoproducto.nombre=this.formulario.value.nombre??"";
    this.nuevoproducto.precio=this.formulario.value.precio??0;
    this.nuevoproducto.stock=this.formulario.value.stock??0;
    this.nuevoproducto.categoriaNombre=this.formulario.value.categoria??"";

    this.agregar(this.nuevoproducto);
    
  }

  agregar(producto: productos)
  {
   
    this.serviceproducto.addProducto(producto).subscribe({
      next:()=>
      {
        console.log("producto agregado con exito");
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  irproductos()
  {
    this.rutas.navigate(["productos"])
  }
}
