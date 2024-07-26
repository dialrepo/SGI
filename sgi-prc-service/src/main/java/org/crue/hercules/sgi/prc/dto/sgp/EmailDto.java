package org.crue.hercules.sgi.prc.dto.sgp;

import java.io.Serializable;

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
public class EmailDto implements Serializable {
  private static final long serialVersionUID = 1L;

  private String email;
  private Boolean principal;
}