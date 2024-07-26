package org.crue.hercules.sgi.rep.dto.eti;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@SuperBuilder
public class InformeEvaluacionEvaluadorReportOutput extends BloquesReportOutput {
  private EvaluacionDto evaluacion;
}
