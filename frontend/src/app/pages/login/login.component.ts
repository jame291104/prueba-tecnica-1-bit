import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.formularioLogin = this.initLoginForm();
    this.formularioRegistro = this.initRegisterForm();
  }

  ngOnInit(): void {}

  // Inicialización del formulario de login
  private initLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Inicialización del formulario de registro
  private initRegisterForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]], // Cambié 'userName' por 'username'
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  // Validación de contraseñas coincidentes
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  // Manejo del formulario de inicio de sesión
  handleLoginSubmit(): void {
    if (this.formularioLogin.invalid) {
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    const { email, password } = this.formularioLogin.value;
    const credenciales = { emailLogin: email, passwordLogin: password };

    this.loginService.inicioSesion(credenciales).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        alert('Inicio de sesión exitoso.');
        this.loginService.redireccionar();
      },
      error: (err) => {
        alert('Error al iniciar sesión. Verifica tus credenciales.');
        console.error('Error al iniciar sesión:', err);
      }
    });
  }

  // Manejo del formulario de registro
  handleRegisterSubmit(): void {
    if (this.formularioRegistro.invalid) {
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    const { username, email, password, confirmPassword } = this.formularioRegistro.value;

    // Verificación de contraseñas
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const nuevoUsuario = { username, email, password };

    this.loginService.registroUsuario(nuevoUsuario).subscribe({
      next: (response) => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.formularioRegistro.reset();
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        const errorMsg = err?.error?.mensaje || 'Error desconocido. Intenta nuevamente.';
        alert(`Error al registrar el usuario: ${errorMsg}`);
      }
    });
  }
}
