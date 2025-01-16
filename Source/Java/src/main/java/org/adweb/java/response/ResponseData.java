package org.adweb.java.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseData {
  private int status;
  private String message;
  @JsonInclude(JsonInclude.Include.NON_NULL)  // Khi data = null thì sẽ không có trong Response.
  private Object data;
}