import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  listaConsolas:any = []
  listaCategorias:any = []
  formsave: FormGroup;
  idestado:number;

  constructor(private home: HomeService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.formsave = this.fb.group({
      nombre: ['', [Validators.required]],
      precio: [0, [Validators.required]],
      iva: [0, [Validators.required]],
      consola: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      url: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })

    this.obtenerCategorias();
    this.obtenerConsolas();
  }
  estado(value:number){
    this.idestado=value;
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
