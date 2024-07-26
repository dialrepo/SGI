package org.crue.hercules.sgi.csp.repository.specification;

import org.crue.hercules.sgi.csp.model.Proyecto;
import org.crue.hercules.sgi.csp.model.ProyectoAgrupacionGasto;
import org.crue.hercules.sgi.csp.model.ProyectoAgrupacionGasto_;
import org.crue.hercules.sgi.csp.model.Proyecto_;
import org.springframework.data.jpa.domain.Specification;

public class ProyectoAgrupacionGastoSpecifications {

  /**
   * {@link ProyectoAgrupacionGasto} del {@link Proyecto} con el id indicado.
   * 
   * @param id identificador del {@link Proyecto}.
   * @return specification para obtener los {@link ProyectoAgrupacionGasto} de la
   *         {@link Proyecto} con el id indicado.
   */
  public static Specification<ProyectoAgrupacionGasto> byProyectoId(Long id) {
    return (root, query, cb) -> {
      return cb.equal(root.get(ProyectoAgrupacionGasto_.proyecto).get(Proyecto_.id), id);
    };

  }
}
