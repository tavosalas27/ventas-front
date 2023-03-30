import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { HomeService } from '../home.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-cantidad-compra',
  templateUrl: './cantidad-compra.component.html',
  styleUrls: ['./cantidad-compra.component.css']
})
export class CantidadCompraComponent implements OnInit {
  usuario:any;
  nombreUsuario:any;
  fecha:Date = new Date();

  total:number = 0;
  totales:any = []
  totalCompras:number = 0;
  detalles:any = []

  constructor(private home: HomeService, public dialogRef: MatDialogRef<CantidadCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    console.log(this.data)
    this.nombreUsuario = localStorage.getItem('user');
    this.home.getDatoUsuario(this.nombreUsuario).subscribe((response: any)=>{
      if(response.length==0){
        console.log('No hay datos para mostrar')
      }else{
        this.usuario = response[0]
        console.log(this.usuario)
      }
    })
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      const subtotal = element.cantidad * element.precio_unitario;
      const iva = subtotal * element.iva
      this.total = subtotal + iva;
      this.totales.push(this.total);
      let datos = {
        "idproducto": element.id,
        "cantidad": element.cantidad
      }
      this.detalles.push(datos);
    }
    console.log(this.totales)
    for (let index = 0; index < this.totales.length; index++) {
      const element = this.totales[index];
      this.totalCompras += element;
    }
  }

  comprar(){
    let data = {
      "date": format(this.fecha, 'yyyy-MM-dd').toString(),
      "total": this.totalCompras,
      "idusuario": this.usuario.id,
      "detalle": this.detalles
    }
    console.log(data)
    this.home.crearCompra(data).subscribe((response: any)=>{
      console.log(response)
    })
  }

}
