import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-inicial',
  templateUrl: './home-inicial.component.html',
  styleUrls: ['./home-inicial.component.css']
})
export class HomeInicialComponent implements OnInit{

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {
    //this.router.navigate(["pokedex"]);
  }

  clickButton(){
    this.router.navigate(["login"]);
  }

}
