import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { productos } from '../../../Interface/productos';
import { ProductosService } from '../../../services/productos.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-bajo-stock',
  standalone: true,
  imports: [NavbarComponent,FormsModule],
  templateUrl: './bajo-stock.component.html',
  styleUrl: './bajo-stock.component.css'
})
export class BajoStockComponent implements OnInit {


ngOnInit(): void {
  this.traerProductos();
}

cantidadBaja: number = 0; 

listaproductos : productos[]= [];

listafiltrada:productos[]=[];

servicioProductos = inject(ProductosService);

traerProductos()
{
  this.servicioProductos.getProductos().subscribe({
    next:(lista)=>
    {
      this.listaproductos=lista;
    },
    error:(err:Error)=>
    {
      console.log(err.message);
    }
  })
}

filtrarProductos(cantidad:number)
{
  for(var i=0;i<this.listaproductos.length;i++)
  {
    if(this.listaproductos[i].stock<=cantidad)
    {
      this.listafiltrada.push(this.listaproductos[i]);
    }
    
  }
  console.log(this.listaproductos);
  console.log(this.listafiltrada);
}


}
