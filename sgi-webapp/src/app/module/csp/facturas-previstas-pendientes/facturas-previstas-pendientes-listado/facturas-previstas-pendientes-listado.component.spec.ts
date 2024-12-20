import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackBarService } from '@core/services/snack-bar.service';
import TestUtils from '@core/utils/test-utils';
import { MaterialDesignModule } from '@material/material-design.module';
import { SgiAuthModule, SgiAuthService } from '@sgi/framework/auth';
import { SharedModule } from '@shared/shared.module';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { CspSharedModule } from '../../shared/csp-shared.module';
import { FacturasPrevistasPendientesListadoExportService } from '../facturas-previstas-pendientes-listado-export.service';
import { FacturasPrevistasPendientesListadoComponent } from './facturas-previstas-pendientes-listado.component';

describe('FacturasPrevistasPendientesListadoComponent', () => {
  let component: FacturasPrevistasPendientesListadoComponent;
  let fixture: ComponentFixture<FacturasPrevistasPendientesListadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FacturasPrevistasPendientesListadoComponent
      ],
      imports: [
        CspSharedModule,
        RouterTestingModule,
        MaterialDesignModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        BrowserAnimationsModule,
        TestUtils.getIdiomas(),
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        SgiAuthModule
      ],
      providers: [
        SgiAuthService,
        FacturasPrevistasPendientesListadoExportService,
        { provide: SnackBarService, useValue: TestUtils.getSnackBarServiceSpy() }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasPrevistasPendientesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

