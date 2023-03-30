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

  subtotal:number = 0;

  constructor(private home: HomeService, public dialogRef: MatDialogRef<CantidadCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    console.log(this.data)
    const formatoFecha = format(this.fecha, 'yyyy-MM-dd');
    this.nombreUsuario = localStorage.getItem('user');
    this.home.getDatoUsuario(this.nombreUsuario).subscribe((response: any)=>{
      if(response.length==0){
        console.log('No hay datos para mostrar')
      }else{
        this.usuario = response
        // console.log(this.usuario)
      }
    })
  }

  comprar(){

  }

}
