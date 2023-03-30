import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomeService } from '../home.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  listaConsolas:any = []
  listaCategorias:any = []
  listaEstados:any = []
  formsave: FormGroup;
  formupdate: FormGroup;
  idestado:number;

  constructor(private home: HomeService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.accion==1) {
      this.formsave = this.fb.group({
        nombre: ['', [Validators.required]],
        precio: [0, [Validators.required]],
        iva: [0, [Validators.required]],
        consola: ['', [Validators.required]],
        categoria: ['', [Validators.required]],
        url: ['', [Validators.required]],
        descripcion: ['', [Validators.required]]
      })
    } else {
      this.obtenerEstados()
      this.formupdate = this.fb.group({
        nombre: [this.data.producto.nombre, [Validators.required]],
        precio: [this.data.producto.precio_unitario, [Validators.required]],
        iva: [this.data.producto.iva, [Validators.required]],
        consola: [0, [Validators.required]],
        categoria: [0, [Validators.required]],
        url: [this.data.producto.imagen, [Validators.required]],
        descripcion: [this.data.producto.descripcion, [Validators.required]],
        estado: [0, [Validators.required]]
      })
    }

    this.obtenerCategorias();
    this.obtenerConsolas();
  }
  estado(value:number){
    this.idestado=value;
  }

  obtenerEstados(){
    this.home.getEstados().subscribe((response: any)=>{
      if(response.length==0){
        console.log('No hay estados para mostrar')
      }else{
        this.listaEstados = response
      }
    })
  }

  guardarProducto(){
    let data = {
      "name": this.formsave.value.nombre,
      "description": this.formsave.value.descripcion,
      "uniteprice": parseInt(this.formsave.value.precio),
      "image": this.formsave.value.url,
      "iva": parseFloat(this.formsave.value.iva),
      "idconsola": parseInt(this.formsave.value.consola),
      "idcategoria": parseInt(this.formsave.value.categoria),
      "idestado": this.idestado
    }
    console.log(data)
    this.home.crearProducto(data).subscribe((response: any)=>{
      console.log(response)
    })
  }

  actualizarProducto(){
    let data = {
      "name": this.formupdate.value.nombre,
      "description": this.formupdate.value.descripcion,
      "uniteprice": parseInt(this.formupdate.value.precio),
      "image": this.formupdate.value.url,
      "iva": parseFloat(this.formupdate.value.iva),
      "idconsola": parseInt(this.formupdate.value.consola),
      "idcategoria": parseInt(this.formupdate.value.categoria),
      "idestado": parseInt(this.formupdate.value.estado)
    }
    console.log(data)
    this.home.actualizarProducto(this.data.producto.id, data).subscribe((response: any)=>{
      console.log(response)
    })
  }

  obtenerConsolas(){
    this.home.getConsola().subscribe((response: any)=>{
      if(response.length==0){
        console.log('No hay consolas para mostrar')
      }else{
        this.listaConsolas = response
      }
    })
  }

  obtenerCategorias(){
    this.home.getCategorias().subscribe((response: any)=>{
      if(response.response=='None'){
        console.log('No hay categorias para mostrar')
      }else{
        this.listaCategorias = response
        console.log(this.listaCategorias)
      }
    })
  }

}
