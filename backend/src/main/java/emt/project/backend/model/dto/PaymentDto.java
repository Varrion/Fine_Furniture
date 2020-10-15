package emt.project.backend.model.dto;

import lombok.Data;

@Data
public class PaymentDto {
    public String apiKey;

    Integer customerId;

    String email;

    String token;

    int price;
}
