import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { productos } from '../../../Interface/productos';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css'
})
export class EditProductoComponent implements OnInit{

  productoID:number=0;
  route = inject(ActivatedRoute)
  serviceProducto = inject(ProductosService);

  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({

    precionuevo:[0,Validators.min(1)],
    stocknuevo:[0,Validators.min(1)]

  })

  produ:productos={
    nombre:"",
    precio:0,
    stock:0,
    categoriaNombre:""
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.productoID = Number(params.get('id'));

      this.serviceProducto.getProductoByID(this.productoID).subscribe({
        next:(produc)=>
        {
          this.produ = produc;
        },
        error:(err:Error)=>
        {
          console.log(err.message);
        }
      })
  }
  )}

  editProducto()
  {
    this.produ.precio=this.formulario.value.precionuevo??0;
    this.produ.stock= this.produ.stock+ (this.formulario.value.stocknuevo??0)
    this.serviceProducto.editProducto(this.produ).subscribe({
      next:()=>
      {
        console.log("Producto editado con exito");
      },
      error:(err:Error)=>
      {
        console.log(err.message);
      }
    })
  }


}
