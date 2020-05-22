import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../providers/service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profilePictute: { width: string; height: string; background: string; 'background-position': string; 'background-repeat': string; 'background-size': string; 'background-color': string; 'border-radius': string; };
  profile: any;
  profileEdit: boolean = false;
  editForm: FormGroup;
  constructor(private router: Router, private service: ServiceService, private loading: Ng4LoadingSpinnerService) {
    this.profilePictute = {
      width: '170px',
      height: '170px',
      background: "url('assets/image/profile.jpg')",
      'background-position': "center",
      'background-repeat': "no-repeat",
      'background-size': "cover",
      'background-color': '#0a29621a',
      'border-radius': '90%'
    }
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    this.getProfile(token);
  }
  getProfile(token) {
    this.loading.show();
    const body = { token: token }
    this.service.profileClient(body).subscribe((data) => {
      this.loading.hide();
      this.profile = data[0];
      this.initForm();
    }, (err) => {
      this.loading.hide();
    });
  }
  initForm() {
    this.editForm = new FormGroup({
      iduser: new FormControl(this.profile.iduser, [Validators.required]),
      name: new FormControl(this.profile.name, [Validators.required]),
      email: new FormControl(this.profile.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.profile.phone, [Validators.required]),
      address: new FormControl(this.profile.address, [Validators.required])
    })
  }
  saveToChanges() {
    this.loading.show();
    this.service.updateProfile(this.editForm.value).subscribe((data) => {
      Swal.fire({
        position: 'center', icon: 'success', title: "Listo!", text: "¡Actualización exitosa!", showConfirmButton: false, timer: 2000
      });
      this.loading.hide();
      let token = localStorage.getItem('token');
      this.getProfile(token);
      this.profileEdit = false;
    }, (err) => {
      this.loading.hide();
      console.log(err)
      Swal.fire({
        position: 'center', icon: 'warning', title: "Error", text: "¡Ocurrio un error!", showConfirmButton: false, timer: 2000
      });
    })
  }
  signOut() {
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
}
