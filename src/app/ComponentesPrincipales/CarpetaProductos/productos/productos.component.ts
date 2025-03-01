import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { productos } from '../../../Interface/productos';
import { ProductosService } from '../../../services/productos.service';
import { categoria } from '../../../Interface/categoria';
import { CategoriasService } from '../../../services/categorias.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NavbarComponent,RouterLink,FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{


  catborrar:string = "";
  nuevacat:string= "";

  rutas = inject(Router);
  //SERVICIOS//
  servicioCategorias = inject(CategoriasService);
  servicioProductos = inject(ProductosService);

  //LISTAS PRODUCTOS--CATEGORIAS//

  listaProductos:productos[]= [];

  listaCategorias: categoria[] = [];   

  productosPorCategoria: productos[] = []; 

  categoriaSeleccionada: categoria | null = null


  ngOnInit(): void {

   this.traerProductos();
   this.traerCategorias();

  }

  agregarCategoria()
  {
    const categoria:categoria ={
      nombreCat : this.nuevacat
    }
    this.servicioCategorias.addCategoria(categoria).subscribe({
      next:()=>
      {
       
        window.location.reload();
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  borrarCategoria(nombre:string){
    var id = this.listaCategorias.find(e=> e.nombreCat.toLowerCase() === nombre.toLowerCase())?.id??0;

    if(id!=0)
    {
      this.servicioCategorias.deleteCategoria(id).subscribe({
        next:()=>
        {
          window.location.reload();
        },
        error:(err:Error)=>
        {
          console.log(err.message);
        }
      })
    }
    else
    {
      alert("El nombre ingresado es incorrecto")
      this.catborrar="";
      console.log("No se encontro el id")
    }

  }

 

  traerProductos()
  {
    this.servicioProductos.getProductos().subscribe({
      next:(lista)=>
      {
        this.listaProductos = lista;
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  traerCategorias()
  {
    this.servicioCategorias.getCategorias().subscribe({
      next:(categorias)=>
      {
        this.listaCategorias= categorias;
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }

  mostrarProductosPorCategoria(categoria: string): void {
    
    this.productosPorCategoria = this.listaProductos.filter(producto => producto.categoriaNombre === categoria);
  }

  deleteProdu(id:number)
  {
    this.servicioProductos.deleteProductoById(id).subscribe(
      {
        next:()=>{
          console.log("producto eliminado");
          window.location.reload();
        },
        error:(err: Error)=>
        {
          console.log(err.message)
        }
      }
    )
  }

  ircrearprodu()
  {
    this.rutas.navigate(["crearproducto"]);
  }

  irbajostock()
  {
    this.rutas.navigate(["bajostock"]);
  }



}
