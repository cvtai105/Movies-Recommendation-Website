package org.adweb.java.document;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
public class Trailer {
  private String key;
  private String name;
  private String site;
  private String type;
}
