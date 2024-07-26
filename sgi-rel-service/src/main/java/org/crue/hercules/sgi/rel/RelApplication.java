package org.crue.hercules.sgi.rel;

import java.time.ZoneOffset;
import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@ConfigurationPropertiesScan("org.crue.hercules.sgi.rel.config")
@Slf4j
public class RelApplication {

  public static void main(String[] args) {
    log.debug("main(String[] args) - start");
    log.info("Setting UTC as the default JVM TimeZone");
    TimeZone.setDefault(TimeZone.getTimeZone(ZoneOffset.UTC));
    SpringApplication.run(RelApplication.class, args);
    log.debug("main(String[] args) - end");
  }

}
