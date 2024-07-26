import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { FragmentComponent } from '@core/component/fragment.component';
import { IAcreditacion } from '@core/models/prc/acreditacion';
import { IAutorWithGrupos } from '@core/models/prc/autor';
import { IProyectoPrc } from '@core/models/prc/proyecto-prc';
import { FxLayoutProperties } from '@core/models/shared/flexLayout/fx-layout-properties';
import { DocumentoService, triggerDownloadToUser } from '@core/services/sgdoc/documento.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { transformAutorApellidos } from '../../../shared/autor/pipe/autor-apellidos.pipe';
import { transformAutorNombre } from '../../../shared/autor/pipe/autor-nombre.pipe';
import { ObraArtisticaActionService } from '../../obra-artistica.action.service';
import { ObraArtisticaDatosGeneralesFragment } from './obra-artistica-datos-generales.fragment';

const MSG_DOWNLOAD_ERROR = marker('error.file.download');

@Component({
  selector: 'sgi-obra-artistica-datos-generales',
  templateUrl: './obra-artistica-datos-generales.component.html',
  styleUrls: ['./obra-artistica-datos-generales.component.scss']
})
export class ObraArtisticaDatosGeneralesComponent extends FragmentComponent implements OnInit, OnDestroy {
  fxLayoutProperties: FxLayoutProperties;
  formPart: ObraArtisticaDatosGeneralesFragment;
  private subscriptions: Subscription[] = [];

  autorDataSource = new MatTableDataSource<IAutorWithGrupos>();
  displayedColumnsAutor = ['firma', 'nombre', 'apellidos', 'posicion', 'estado-responsable'];
  @ViewChild('sortAutor', { static: true }) sortAutor: MatSort;

  proyectoDataSource = new MatTableDataSource<IProyectoPrc>();
  displayedColumnsProyecto = ['titulo', 'acronimo', 'codigo-externo', 'fecha-inicio', 'fecha-fin'];
  @ViewChild('sortProyecto', { static: true }) sortProyecto: MatSort;

  acreditacionDataSource = new MatTableDataSource<IAcreditacion>();
  displayedColumnsAcreditacion = ['url', 'documento'];
  @ViewChild('sortAcreditacion', { static: true }) sortAcreditacion: MatSort;

  constructor(
    public readonly actionService: ObraArtisticaActionService,
    private readonly logger: NGXLogger,
    private readonly snackBarService: SnackBarService,
    private readonly documentoService: DocumentoService,
  ) {
    super(actionService.FRAGMENT.DATOS_GENERALES, actionService);
    this.formPart = this.fragment as ObraArtisticaDatosGeneralesFragment;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initFlexProperties();
    this.configSortAutor();
    this.subscribeToAutores();
    this.configSortProyecto();
    this.subscribeToProyectos();
    this.configSortAcreditacion();
    this.subscribeToAcreditaciones();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initFlexProperties(): void {
    this.fxLayoutProperties = new FxLayoutProperties();
    this.fxLayoutProperties.gap = '1%';
    this.fxLayoutProperties.layout = 'row wrap';
    this.fxLayoutProperties.xs = 'column';
  }


  private configSortAutor(): void {
    this.autorDataSource.sortingDataAccessor =
      (autor: IAutorWithGrupos, property: string) => {
        switch (property) {
          case 'firma':
            return autor.autor.firma;
          case 'nombre':
            return transformAutorNombre(autor.autor);
          case 'apellidos':
            return transformAutorApellidos(autor.autor);
          case 'posicion':
            return autor.autor.orden;
          default:
            return autor[property];
        }
      };
    this.autorDataSource.sort = this.sortAutor;
  }

  private subscribeToAutores(): void {
    this.subscriptions.push(this.formPart.getAutores$()
      .subscribe(elements => {
        this.autorDataSource.data = elements;
      }));
  }

  private configSortProyecto(): void {
    this.proyectoDataSource.sortingDataAccessor =
      (proyecto: IProyectoPrc, property: string) => {
        switch (property) {
          case 'titulo':
            return proyecto.proyecto.titulo;
          case 'acronimo':
            return proyecto.proyecto.acronimo;
          case 'codigo-externo':
            return proyecto.proyecto.codigoExterno;
          case 'fecha-inicio':
            return proyecto.proyecto.fechaInicio;
          case 'fecha-fin':
            return proyecto.proyecto.fechaFin;
          default:
            return proyecto[property];
        }
      };
    this.proyectoDataSource.sort = this.sortProyecto;
  }

  private subscribeToProyectos(): void {
    this.subscriptions.push(this.formPart.getProyectos$()
      .subscribe(elements => {
        this.proyectoDataSource.data = elements;
      }));
  }

  private configSortAcreditacion(): void {
    this.acreditacionDataSource.sortingDataAccessor =
      (acreditacion: IAcreditacion, property: string) => {
        switch (property) {
          case 'url':
            return acreditacion.url;
          case 'documento':
            return acreditacion.documento?.nombre;
          default:
            return acreditacion[property];
        }
      };
    this.acreditacionDataSource.sort = this.sortAcreditacion;
  }

  private subscribeToAcreditaciones(): void {
    this.subscriptions.push(this.formPart.getAcreditaciones$()
      .subscribe(elements => {
        this.acreditacionDataSource.data = elements;
      }));
  }

  downloadFile(acreditacion: IAcreditacion): void {
    this.subscriptions.push(this.documentoService.downloadFichero(acreditacion.documento.documentoRef).subscribe(
      (data) => {
        triggerDownloadToUser(data, acreditacion.documento.nombre);
      },
      (error) => {
        this.logger.error(error);
        this.snackBarService.showError(MSG_DOWNLOAD_ERROR);
      }
    ));
  }
}
