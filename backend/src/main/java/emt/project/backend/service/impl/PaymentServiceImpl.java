package emt.project.backend.service.impl;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Coupon;
import com.stripe.model.Customer;
import com.stripe.model.Subscription;
import emt.project.backend.model.dto.PaymentDto;
import emt.project.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Value("${stripe.keys.secret}")
    private String API_SECRET_KEY;

    @Override
    public String createCharge(PaymentDto payment) {
        String id = null;
        try {
            Stripe.apiKey = API_SECRET_KEY;
            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", payment.getPrice());
            chargeParams.put("currency", "EUR");
            chargeParams.put("description", "Charge for " + payment.getEmail());
            chargeParams.put("source", payment.getToken());

            Charge charge = Charge.create(chargeParams);
            id = charge.getId();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return id;
    }
}
