import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormularioSolicitud } from '@core/enums/formulario-solicitud';
import { Estado } from '@core/models/csp/estado-solicitud';
import { SnackBarService } from '@core/services/snack-bar.service';
import TestUtils from '@core/utils/test-utils';
import { MaterialDesignModule } from '@material/material-design.module';
import { FormlyModule } from '@ngx-formly/core';
import { SgiAuthService } from '@sgi/framework/auth';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { SOLICITUD_DATA_KEY } from '../../solicitud-data.resolver';
import { ISolicitudData, SolicitudActionService } from '../../solicitud.action.service';
import { SolicitudAutoevaluacionComponent } from './solicitud-autoevaluacion.component';

describe('SolicitudAutoevaluacionComponent', () => {
  let component: SolicitudAutoevaluacionComponent;
  let fixture: ComponentFixture<SolicitudAutoevaluacionComponent>;
  const routeData: Data = {
    [SOLICITUD_DATA_KEY]: {
      solicitud: {
        formularioSolicitud: FormularioSolicitud.PROYECTO,
        estado: {
          estado: Estado.BORRADOR
        }
      }
    } as ISolicitudData
  };
  const routeMock = TestUtils.buildActivatedRouteMock('1', routeData);

  const state = {
    idConvocatoria: 1
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SolicitudAutoevaluacionComponent
      ],
      imports: [
        TestUtils.getIdiomas(),
        MaterialDesignModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        FlexModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormlyModule
      ],
      providers: [
        { provide: SnackBarService, useValue: TestUtils.getSnackBarServiceSpy() },
        SolicitudActionService,
        SgiAuthService,
        { provide: ActivatedRoute, useValue: routeMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOnProperty(history, 'state', 'get').and.returnValue(state);
    fixture = TestBed.createComponent(SolicitudAutoevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
