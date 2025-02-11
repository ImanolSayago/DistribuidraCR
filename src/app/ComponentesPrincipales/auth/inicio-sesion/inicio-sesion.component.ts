import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Admin } from '../../../Interface/admin';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

  authService= inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    correo:["",Validators.required],
    contrasena:["",Validators.required]
  })


  admin: Admin={
    correo:"",
    contrasena:""
  }

  onLoginLogout() {
    if (this.formulario.valid) {
      const credentials = this.formulario.value;  // Obtenemos los datos del formulario
      
      this.admin.correo = this.formulario.value.correo;
      this.admin.contrasena = this.formulario.value.contrasena;

      this.authService.logIn(this.admin).subscribe(
        (isAuthenticated) => {
          if (isAuthenticated) {
            // Si el login es exitoso, redirigimos al home
            this.router.navigate(['/home']);
          } else {
            // Si el login falla, mostramos un mensaje
            alert('Error: Usuario o contraseña incorrectos');
          }
        },
        (error) => {
          // Aquí manejamos errores si la API falla
          console.error('Error en la solicitud de login', error);
          alert('Error en la solicitud de login');
        }
      );
    } else {
      // Si el formulario no es válido, mostramos un mensaje
      alert('Por favor, completa todos los campos.');
    }
  }
}
