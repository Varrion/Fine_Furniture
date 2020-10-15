package emt.project.backend.service;

import com.stripe.model.Coupon;
import emt.project.backend.model.dto.PaymentDto;

public interface PaymentService {

    public String createCharge(PaymentDto paymentRequest);
}
