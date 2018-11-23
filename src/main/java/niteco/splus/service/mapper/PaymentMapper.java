package niteco.splus.service.mapper;

import niteco.splus.domain.*;
import niteco.splus.service.dto.PaymentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Payment and its DTO PaymentDTO.
 */
@Mapper(componentModel = "spring", uses = {ReasonMapper.class, MemberMapper.class})
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {

    @Mapping(source = "member.id", target = "memberId")
    PaymentDTO toDto(Payment payment);

    @Mapping(source = "memberId", target = "member")
    Payment toEntity(PaymentDTO paymentDTO);

    default Payment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Payment payment = new Payment();
        payment.setId(id);
        return payment;
    }
}
