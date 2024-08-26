package org.crue.hercules.sgi.tp.service.sgi;

import org.crue.hercules.sgi.framework.http.HttpEntityBuilder;
import org.crue.hercules.sgi.tp.config.RestApiProperties;
import org.crue.hercules.sgi.tp.enums.ServiceType;
import org.crue.hercules.sgi.tp.exceptions.UnknownServiceTypeException;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class SgiApiBaseService {
  public static final String CLIENT_REGISTRATION_ID = "tp-service";
  private final RestApiProperties restApiProperties;
  private final RestTemplate restTemplate;

  protected SgiApiBaseService(RestApiProperties restApiProperties, RestTemplate restTemplate) {
    this.restApiProperties = restApiProperties;
    this.restTemplate = restTemplate;
  }

  protected String buildUri(
      ServiceType serviceType, String relativeUrl) {
    log.debug("buildUrl(ServiceType serviceType, String relativeUrl) - start");
    String serviceURL = null;
    switch (serviceType) {
      case COM:
        serviceURL = restApiProperties.getComUrl();
        break;
      case CSP:
        serviceURL = restApiProperties.getCspUrl();
        break;
      case ETI:
        serviceURL = restApiProperties.getEtiUrl();
        break;
      case PII:
        serviceURL = restApiProperties.getPiiUrl();
        break;
      case PRC:
        serviceURL = restApiProperties.getPrcUrl();
        break;
      case REL:
        serviceURL = restApiProperties.getRelUrl();
        break;
      case REP:
        serviceURL = restApiProperties.getRepUrl();
        break;
      case USR:
        serviceURL = restApiProperties.getUsrUrl();
        break;
      default:
        throw new UnknownServiceTypeException(serviceType.name());
    }
    // TODO revisit implementation
    String mergedURL = new StringBuilder(serviceURL).append(relativeUrl).toString();
    log.debug("buildUrl(ServiceType serviceType, String relativeUrl) - end");
    return mergedURL;
  }

  protected <T> ResponseEntity<T> callEndpoint(String endPoint, HttpMethod httpMethod,
      ParameterizedTypeReference<T> returnType, Object... uriVariables) {
    return this.<Void, T>callEndpoint(endPoint, httpMethod, null, returnType, uriVariables);
  }

  protected <E, T> ResponseEntity<T> callEndpoint(String endPoint, HttpMethod httpMethod, E entity,
      ParameterizedTypeReference<T> returnType, Object... uriVariables) {
    log.info("Calling SGI API endpoint: {}", endPoint);
    log.debug("Endpoint uri variables: {} \\nRequest data: {}", (Object[]) uriVariables, entity);
    HttpEntity<E> request = new HttpEntityBuilder<E>().withEntity(entity)
        .withClientAuthorization(CLIENT_REGISTRATION_ID).build();

    ResponseEntity<T> response = restTemplate.exchange(endPoint, httpMethod, request,
        returnType, uriVariables);

    log.debug("Endpoint response: {}", response);
    return response;
  }
}