package org.adweb.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService
{
    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Autowired
    private final RestTemplate restTemplate;

    public OpenAIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Float> getEmbedding(String query) {
        String url = "https://api.openai.com/v1/embeddings";

        // Set the headers for the request
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openaiApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare the request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("input", query);
        requestBody.put("model", "text-embedding-ada-002");

        // Wrap the request body and headers in an HttpEntity
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Send the POST request to OpenAI
        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
        );

        // Check if the response is successful and extract the embedding
        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = response.getBody();

            // Get the 'data' list from the response body
            List<Map<String, Object>> data = (List<Map<String, Object>>) responseBody.get("data");
            // Extract the embedding list from the first element in 'data'
            List<Float> embedding = (List<Float>) data.get(0).get("embedding");
            System.out.println(embedding);
            return embedding;
        } else {
            throw new RuntimeException("Failed to retrieve embedding from OpenAI API");
        }
    }
}
