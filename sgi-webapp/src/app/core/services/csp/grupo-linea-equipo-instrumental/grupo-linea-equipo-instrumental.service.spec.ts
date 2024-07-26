import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { GrupoLineaEquipoInstrumentalService } from './grupo-linea-equipo-instrumental.service';

describe('GrupoLineaEquipoInstrumentalService', () => {
  let service: GrupoLineaEquipoInstrumentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        LoggerTestingModule
      ]
    });
    service = TestBed.inject(GrupoLineaEquipoInstrumentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
