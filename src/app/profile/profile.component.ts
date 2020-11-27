import { TokenStorageService } from './../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  username;
  password;

  constructor(private token: TokenStorageService, private authService: AuthService
    ,private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(!this.currentUser){
      this.router.navigateByUrl('/login')
    }
  }

  logout() {
    window.location.reload();
  }


  onSubmit(f: NgForm) {
    console.log(f);
    const val=f.value;
    console.log(val);
    this.authService.updatepassword(val.country,val.password).subscribe(
      data => {
        console.log(data);
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    
  }

}
