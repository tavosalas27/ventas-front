import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-cantidad-compra',
  templateUrl: './cantidad-compra.component.html',
  styleUrls: ['./cantidad-compra.component.css']
})
export class CantidadCompraComponent implements OnInit {

  formcantidad: FormGroup;
  usuario:any;
  nombreUsuario:any;

  constructor(private home: HomeService, private fb: FormBuilder, public dialogRef: MatDialogRef<CantidadCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    console.log(this.data)
    this.nombreUsuario = localStorage.getItem('user');
    this.home.getDatoUsuario(this.nombreUsuario).subscribe((response: any)=>{
      if(response.length==0){
        console.log('No hay datos para mostrar')
      }else{
        this.usuario = response
        console.log(this.usuario)
      }
    })
    this.formcantidad = this.fb.group({
      cantidad: ['', [Validators.required]]
    })
  }

  addCompra(){
    let total = (parseInt(this.data.item.precio) * this.formcantidad.value.cantidad) *  this.data.item.iva
    let data = {
      
    }
    // console.log(this.data)
  }

}
