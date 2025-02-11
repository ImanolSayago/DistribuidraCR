import { inject } from "@angular/core"
import { AuthService } from "../auth.service"
import { Router } from "@angular/router";

export const authGuardFnLogout = ()=>
{


   const rutas = inject(Router);
   if(!localStorage.getItem("token"))
   {
        return true;
   }
   else
   {
    rutas.navigate(["home"])
    return false;
   }
}