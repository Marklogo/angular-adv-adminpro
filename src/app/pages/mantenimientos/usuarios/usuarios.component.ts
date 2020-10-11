import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public pagactual: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService:ModalImagenService
  ) {}

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.pagactual)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.pagactual += valor;
    if (this.pagactual < 0) {
      this.pagactual = 0;
    } else if (this.pagactual >= this.totalUsuarios) {
      this.pagactual -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }
    this.busquedasService.buscar('usuarios', termino).subscribe((resp) => {
      this.usuarios = resp;
    });
  }

  eliminarUsuario(usuario: Usuario) {
    if (this.usuarioService.uid != usuario.uid) {
      Swal.fire({
        title: '¿Borrar Usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado`,
              'success'
            );
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: 'No puedes borrarte a ti mismo'
      })
    }
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarUsuario(usuario)
    .subscribe(resp=>{
      console.log(resp);
    })
  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(100))
    .subscribe(img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
  this.imgSubs.unsubscribe();
  }


}
