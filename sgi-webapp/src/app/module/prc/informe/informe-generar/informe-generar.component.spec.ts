import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { PrcReportService } from '@core/services/prc/report/prc-report.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import TestUtils from '@core/utils/test-utils';
import { MaterialDesignModule } from '@material/material-design.module';
import { SgiAuthService } from '@sgi/framework/auth';
import { SharedModule } from '@shared/shared.module';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { PersonaNombreCompletoPipe } from 'src/app/esb/sgp/shared/pipes/persona-nombre-completo.pipe';

import { InformeGenerarComponent } from './informe-generar.component';

describe('InformeGenerarComponent', () => {
  let component: InformeGenerarComponent;
  let fixture: ComponentFixture<InformeGenerarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        InformeGenerarComponent,
      ],
      imports: [
        TestUtils.getIdiomas(),
        MaterialDesignModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [
        { provide: SnackBarService, useValue: TestUtils.getSnackBarServiceSpy() },
        PrcReportService,
        DecimalPipe,
        SgiAuthService,
        PersonaNombreCompletoPipe
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeGenerarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
