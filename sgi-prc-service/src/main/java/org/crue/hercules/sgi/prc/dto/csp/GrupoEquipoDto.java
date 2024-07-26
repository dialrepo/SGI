package org.crue.hercules.sgi.prc.dto.csp;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrupoEquipoDto implements Serializable {

  private Long id;
  private String personaRef;
  private Instant fechaInicio;
  private Instant fechaFin;
  private BigDecimal participacion;
}
