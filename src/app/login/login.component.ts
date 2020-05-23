import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServiceService } from '../providers/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private loading: Ng4LoadingSpinnerService, private service: ServiceService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  login() {
    var server: any
    this.loading.show();
    this.service.loginClient(this.loginForm.value).subscribe((resp) => {
      server = resp
      this.loading.hide();
      if (server.status == 404) {
        Swal.fire({
          position: 'center', icon: 'warning', title: "¡Cuidado!", text: "Credenciales incorrectas", showConfirmButton: false, timer: 2500
        });
      } else {
        Swal.fire({
          position: 'center', icon: 'warning', title: "", text: "¡Bienvenido!", showConfirmButton: false, timer: 2500
        });
        localStorage.setItem('token', server[0].token);
        this.router.navigate(['/home']);
      }
    }, (err) => {
      this.loading.hide();
      Swal.fire({
        position: 'center', icon: 'warning', title: "¡Lo sentimos!", text: "Por ahora no podemos procesar la solicitud.", showConfirmButton: false, timer: 2500
      });
    });
  }
}
