import { Routes } from '@angular/router';
import { InicioSesionComponent } from './ComponentesPrincipales/auth/inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './ComponentesPrincipales/home/home.component';
import { authGuardFn } from './ComponentesPrincipales/auth/guard/auth.guard-fn';
import { authGuardFnLogout } from './ComponentesPrincipales/auth/guard/auth.guard-fn copy';
import { ClientesComponent } from './ComponentesPrincipales/clientes/clientes.component';
import { FormClienteComponent } from './ComponentesPrincipales/form-cliente/form-cliente.component';
import { ProductosComponent } from './ComponentesPrincipales/CarpetaProductos/productos/productos.component';
import { AddProductoComponent } from './ComponentesPrincipales/CarpetaProductos/add-producto/add-producto.component';
import { FormPedidosComponent } from './ComponentesPrincipales/CarpetaPedidos/form-pedidos/form-pedidos.component';
import { PedidoshomeComponent } from './ComponentesPrincipales/CarpetaPedidos/pedidoshome/pedidoshome.component';
import { PedidoCardComponent } from './ComponentesPrincipales/CarpetaPedidos/pedido-card/pedido-card.component';
import { EditProductoComponent } from './ComponentesPrincipales/CarpetaProductos/edit-producto/edit-producto.component';
import { BajoStockComponent } from './ComponentesPrincipales/CarpetaProductos/bajo-stock/bajo-stock.component';

export const routes: Routes = [
    {
        path:"inicioSesion", component:InicioSesionComponent,
        canActivate:[authGuardFnLogout]
    },
    {
        path:'', redirectTo:'inicioSesion', pathMatch: 'full'
    },
    {
        path:"home",component: HomeComponent,
        canActivate:[authGuardFn]
    },
    {
        path:"clientes", component:ClientesComponent,
        canActivate:[authGuardFn]
        
    },
    {
        path:"crearCliente",component:FormClienteComponent,
        canActivate:[authGuardFn]
        
    },
    {
        path:"productos",component:ProductosComponent,
        canActivate:[authGuardFn]
    },
    {
        path:"bajostock", component:BajoStockComponent,
        canActivate:[authGuardFn]
    }
    ,
    
    {
        path:"crearproducto",component:AddProductoComponent,
        canActivate:[authGuardFn]
    },
    {
        path:"crearpedido" ,component:FormPedidosComponent,
        canActivate:[authGuardFn]
    },
    {
        path:"pedidos",component:PedidoshomeComponent,
        canActivate:[authGuardFn]
    },
    { path: 'pedido/:id', component: PedidoCardComponent ,
        canActivate:[authGuardFn]
    },
    { path: 'producto/:id', component: EditProductoComponent ,canActivate:[authGuardFn]}
];
