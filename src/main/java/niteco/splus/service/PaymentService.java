package niteco.splus.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import niteco.splus.domain.Member;
import niteco.splus.domain.Payment;
import niteco.splus.domain.enumeration.PayStatusEnum;
import niteco.splus.repository.MemberRepository;
import niteco.splus.repository.PaymentRepository;
import niteco.splus.service.dto.PaymentDTO;
import niteco.splus.service.mapper.PaymentMapper;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Service Implementation for managing Payment.
 */
@Service
@Transactional
public class PaymentService {

    private final Logger log = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;

    private final MemberRepository memberRepository;

    private final PaymentMapper paymentMapper;

    public PaymentService(PaymentRepository paymentRepository, PaymentMapper paymentMapper, MemberRepository memberRepository) {
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
        this.memberRepository = memberRepository;
    }

    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save
     * @return the persisted entity
     */
    public PaymentDTO save(PaymentDTO paymentDTO) {
        log.debug("Request to save Payment : {}", paymentDTO);

        Payment payment = paymentMapper.toEntity(paymentDTO);
        payment.setCreated(Instant.now());

        // time of payment
        if (payment.getId() == null && payment.getStatus().equals(PayStatusEnum.PAID)) {
            payment.setPayDate(Instant.now());
        } else if (payment.getId() != null) {
            Payment pay = paymentRepository.getOne(payment.getId());
            if (pay.getStatus().equals(PayStatusEnum.UNPAID) && payment.getStatus().equals(PayStatusEnum.PAID)) {
                payment.setPayDate(Instant.now());
            }
        }

        // calculate total amount of a Member
        if (StringUtils.isBlank(payment.getInfo()) && payment.getStatus().equals(PayStatusEnum.PAID)) {
            Member m = memberRepository.getOne(payment.getMember().getId());
            if (m.getTotalAmount() == null && m.getCurrentAmount() == null) {
                m.setTotalAmount(payment.getAmount());
            } else if (m.getTotalAmount() == null && m.getCurrentAmount() >= 0) {
                m.setTotalAmount(m.getCurrentAmount() + payment.getAmount());
            } else if (m.getTotalAmount() > 0) {
                m.setTotalAmount(m.getTotalAmount() + payment.getAmount());
            }

            memberRepository.save(m);

            Map<String, Object> msgMap = new HashMap<>();
            msgMap.put("payCount", "1");
            Gson gson = new GsonBuilder().create();
            payment.setInfo(gson.toJson(msgMap));
        }

        payment = paymentRepository.save(payment);
        return paymentMapper.toDto(payment);
    }

    /**
     * Get all the payments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PaymentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Payments");
        return paymentRepository.findAll(pageable)
            .map(paymentMapper::toDto);
    }

    /**
     * Get all the Payment with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<PaymentDTO> findAllWithEagerRelationships(Pageable pageable) {
        return paymentRepository.findAllWithEagerRelationships(pageable).map(paymentMapper::toDto);
    }
    

    /**
     * Get one payment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PaymentDTO> findOne(Long id) {
        log.debug("Request to get Payment : {}", id);
        return paymentRepository.findOneWithEagerRelationships(id)
            .map(paymentMapper::toDto);
    }

    /**
     * Delete the payment by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Payment : {}", id);

        Payment deletedPayment = paymentRepository.getOne(id);

        if (deletedPayment.getStatus().equals(PayStatusEnum.PAID)) {
            Long amount = deletedPayment.getAmount();
            Member m = memberRepository.getOne(deletedPayment.getMember().getId());
            if (m.getTotalAmount() > 0) {
                m.setTotalAmount(m.getTotalAmount() - amount);
            }

            memberRepository.save(m);
        }

        paymentRepository.deleteById(id);
    }
}
