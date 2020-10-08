import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: string=null;



  constructor( private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadservice: FileUploadService) {
      this.usuario= usuarioService.usuario; 
   }

   ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required, Validators.email]],
    })
  }

  actualizar(){
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
        .subscribe(resp =>{
          const {nombre, email} = this.perfilForm.value;
          this.usuario.nombre=nombre;
          this.usuario.email=email;
          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error');
          console.log(err.error.msg);       
        })
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
    this.fileUploadservice.actualizarfoto(this.imagenSubir,'usuarios',this.usuario.uid)
    .then( img =>{
      this.usuario.img=img
      Swal.fire('Guardado', 'La imagen a sido actualizada', 'success');
    })
    .catch(()=>{
      Swal.fire('Error', 'A ocurrido un error al actualizar la imagen', 'error');
    })
  }


}