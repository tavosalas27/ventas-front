import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfCategoryComponent } from './conf-category/conf-category.component';
import { ProductoComponent } from './producto/producto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { CantidadCompraComponent } from './cantidad-compra/cantidad-compra.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;
  listaProductos:any=[];
  listaCategorias:any=[];
  productos:any[] = [];

  constructor(private home: HomeService, public dialog: MatDialog, private router: Router){}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.home.getCategorias().subscribe((response: any)=>{
      if(response.response=='None'){
        console.log('No hay categorias para mostrar')
      }else{
        this.listaCategorias = response
      }
    })
    this.home.getProductos().subscribe((response: any)=>{
      if(response.response=='None'){
        console.log('No hay productos para mostrar')
      }else{
        this.listaProductos = response
        for (let index = 0; index < this.listaProductos.length; index++) {
          const element = this.listaProductos[index];
          element['cantidad'] = 0
        }
      }
    })
  }

  verCompras(){
    this.router.navigate(['/compras']);
  }

  llenarCarrito(evento:any, opcion:any) {
    const cantidadString = opcion.cantidad;
    const cantidadNumber = +cantidadString;
    opcion.cantidad = cantidadNumber;

    const precioString = opcion.precio_unitario;
    const precioNumber = +precioString;
    opcion.precio_unitario = precioNumber;

    if (evento.checked) {
      console.log(opcion)
      this.productos.push(opcion);
    } else {
      const index = this.productos.indexOf(opcion);
      if (index >= 0) {
        this.productos.splice(index, 1);
      }
    }
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

  crearProducto(){
    const dialogRef = this.dialog.open(ProductoComponent, {
      width:'70%',
      height:'90%',
      data: {accion:1}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  actualizarProducto(item:any){
    const dialogRef = this.dialog.open(ProductoComponent, {
      width:'70%',
      height:'90%',
      data: {accion:2, producto:item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  detallarProducto(item:any){
    const dialogRef = this.dialog.open(DetalleProductoComponent, {
      width:'55%',
      height:'80%',
      data: {item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  abrirCarrito(){
    const dialogRef = this.dialog.open(CantidadCompraComponent, {
      width:'90%',
      height:'80%',
      data: this.productos
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
      }
    })
  }

  restaurar(){
    this.home.getProductos().subscribe((response: any)=>{
      if(response.length==0){
        this.listaProductos = []
      }else{
        this.listaProductos = response
      }
    })
  }

}
