import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-social-page',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './social-page.component.html',
  styleUrl: './social-page.component.scss'
})
export class SocialPageComponent {

  userList: User[] = [];

  constructor(private http: HttpClient) {

  }

  getUsers() {
    this.http.get("http://localhost:3000/user/all").subscribe((data) => {
      console.log(data);
      this.userList.push(...data as User[]);
    })
  }

}

export interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  birthDate: Date;
}
