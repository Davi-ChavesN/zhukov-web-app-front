import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-social-page',
  imports: [NavBarComponent],
  templateUrl: './social-page.component.html',
  styleUrl: './social-page.component.scss'
})
export class SocialPageComponent {

  userList: any = [];

  constructor(private http: HttpClient) {

  }

  getUsers() {
    this.http.get("http://localhost:3000/user/all").subscribe((data) => {
      console.log(data);
      this.userList = data;
    })
  }

}
