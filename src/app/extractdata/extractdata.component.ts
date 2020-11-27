import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-extractdata',
  templateUrl: './extractdata.component.html',
  styleUrls: ['./extractdata.component.css']
})
export class ExtractdataComponent implements OnInit {
  content;
  users;
  btnExcel=0;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  private roles: string[];
  public wait;
  form: any = {};
  dataGarantie;
  erreur:any;
  

  constructor(private userService: UserService,
    private authService: AuthService, private tokenStorageService: TokenStorageService
    ,private router: Router) { }

  ngOnInit(): void {

    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
    if(!this.isLoggedIn){
      this.router.navigateByUrl('/login')
    }
  }

 

  onSubmit(f:NgForm){
    this.btnExcel=0
    this.chargeData();
    console.log(f.value);
    //this.getDataGarantie();
    
  }


  chargeData(){
    this.wait=1;
    
      setTimeout(()=>{
        this.wait=0,this.getDataGarantie(),this.btnExcel=1, console.log(this.btnExcel)
      },5000);
      
  }
  private getVisiteurs(){
    this.btnExcel=1;
    this.userService.getResource("/allUsers").subscribe(data=>{
      this.users=data;
      console.log(this.users);
    }, err=>{
      this.erreur=0;
      console.log(this.erreur);
    });
  }

  getDataGarantie() {
    
    this.userService.getResource("/allDataFondGarantie").subscribe(data=>{
      this.dataGarantie=data;
      console.log(this.dataGarantie);
    }, err=>{
      this.erreur=0;
      console.log(this.erreur);
    });
  }


  public convetToPDF(){

  }
  public exportexcel(){

    this.userService.getFileExcel().subscribe(data=>{
      const blob=new Blob([data],
        {type:'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
      if(window.navigator && window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(blob);
        return ;
      }
      const donnees=window.URL.createObjectURL(blob);
      const link =document.createElement('a');
      link.href=donnees;
      link.download="fond.xlsx";
      link.dispatchEvent(new MouseEvent('click',{bubbles:true, cancelable:true, view: window}))
      setTimeout(function(){
        window.URL.revokeObjectURL(donnees);
        link.remove();
      }, 100)
      
    }, err=>{
      this.erreur=0;
      console.log(this.erreur);
    });
    //this.userService.getFileExcel();

  }

  logout() {
    window.location.reload();
  }


}
