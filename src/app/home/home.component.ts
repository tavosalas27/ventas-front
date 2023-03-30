import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfCategoryComponent } from './conf-category/conf-category.component';
import { ProductoComponent } from './producto/producto.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;

  listaProductos:any=[];
  listaCategorias:any=[];

  constructor(private home: HomeService, public dialog: MatDialog){}

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

  configuracion() {
    const dialogRef = this.dialog.open(ConfCategoryComponent, {
      width:'30%',
      height:'80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  producto(){
    const dialogRef = this.dialog.open(ProductoComponent, {
      width:'70%',
      height:'90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
