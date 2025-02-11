import { inject } from "@angular/core"
import { AuthService } from "../auth.service"
import { Router } from "@angular/router";

export const authGuardFn = ()=>
{
   const  authservice = inject(AuthService);

   const rutas = inject(Router);
   
   if(authservice.getIsLoggedIn() || localStorage.getItem("token"))
   {
    localStorage.setItem("token","123.123.123");
        return true;
   }
   else
   {
    rutas.navigate(["inicioSesion"])
    return false;
   }
}