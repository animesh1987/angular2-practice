import { Component } from '@angular/core';

interface Nav{
  link: string,
  name: string,
  exact: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: `
    <div class="app">
      <nav class="nav">
        <a *ngFor="let item of nav;"
          [routerLink]="item.link"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{exact: item}">
          {{ item.name }}
        </a>
        <!--<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          Home
        </a>
        <a routerLink="/oops" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          404
        </a>-->
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})

export class AppComponent{
  name: string = 'Animesh';

  nav: Nav[] = [
    {
      link: '/',
      name: 'Home',
      exact: true
    },
    {
      link: '/passengers',
      name: 'Passengers',
      exact: false
    },
    {
      link: '/oops',
      name: '404',
      exact: false
    }
  ]
  handleClick(value){
    //this.name = 'Animesh';
    this.name = value;
  }
}


