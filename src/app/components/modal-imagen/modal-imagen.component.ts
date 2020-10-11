import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: string=null;

  constructor(public modalImagenService:ModalImagenService,
              private fileUploadservice: FileUploadService) { }

  ngOnInit(): void {
    this.imgTemp = null;
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }


  cambiarImagen(file){
    this.imagenSubir = file
    if (!file){ 
      return this.imgTemp=null;
     }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend= () =>{
       this.imgTemp = reader.result.toString();
    }
   }


   subirImagen(){
    this.fileUploadservice.actualizarfoto(this.imagenSubir,this.modalImagenService.tipo,this.modalImagenService.id)
    .then( img =>{
      Swal.fire('Guardado', 'La imagen ha sido actualizada', 'success');
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    })
    .catch(err =>{
      console.log(err);
      Swal.fire('Error', 'A ocurrido un error al actualizar la imagen', 'error');
    })
  }


}
