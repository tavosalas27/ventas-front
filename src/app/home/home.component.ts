import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;

  listaProductos:any=[];
  listaCategorias:any=[];

  constructor(private home: HomeService, private router: Router){}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.home.getCategorias().subscribe((response: any)=>{
      if(response.response=='None'){
        console.log('No hay categorias para mostrar')
      }else{
        this.listaCategorias = response
        console.log(this.listaCategorias)
      }
    })
    this.home.getProductos().subscribe((response: any)=>{
      if(response.response=='None'){
        console.log('No hay productos para mostrar')
      }else{
        this.listaProductos = response
        console.log(this.listaProductos)
      }
    })
  }

  filtrar(id:number){
    this.home.getProductoCategoria(id).subscribe((response: any)=>{
      if(response.length==0){
        this.listaProductos = []
      }else{
        this.listaProductos = response
        console.log(this.listaProductos)
      }
    })
  }

  restaurar(){
    this.home.getProductos().subscribe((response: any)=>{
      if(response.length==0){
        this.listaProductos = []
      }else{
        this.listaProductos = response
        console.log(this.listaProductos)
      }
    })
  }

}
