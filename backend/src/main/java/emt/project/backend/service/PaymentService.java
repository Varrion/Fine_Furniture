package emt.project.backend.service;

import com.stripe.model.Coupon;
import emt.project.backend.model.dto.Payment;

public interface PaymentService {
    public String createCustomer(String email, String token);

    public String createSubscription(String customerId, String plan, String coupon);

    public boolean cancelSubscription(String subscriptionId);

    public Coupon retrieveCoupon(String code);

    public String createCharge(Payment paymentRequest);
}
