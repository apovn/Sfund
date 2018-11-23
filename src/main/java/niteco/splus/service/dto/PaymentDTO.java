package niteco.splus.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import niteco.splus.domain.enumeration.PayStatusEnum;

/**
 * A DTO for the Payment entity.
 */
public class PaymentDTO implements Serializable {

    private Long id;

    private Instant created;

    private Long amount;

    private PayStatusEnum status;

    private Instant payDate;

    @Lob
    private String info;

    private Set<ReasonDTO> reasons = new HashSet<>();

    private Long memberId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreated() {
        return created;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public PayStatusEnum getStatus() {
        return status;
    }

    public void setStatus(PayStatusEnum status) {
        this.status = status;
    }

    public Instant getPayDate() {
        return payDate;
    }

    public void setPayDate(Instant payDate) {
        this.payDate = payDate;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Set<ReasonDTO> getReasons() {
        return reasons;
    }

    public void setReasons(Set<ReasonDTO> reasons) {
        this.reasons = reasons;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PaymentDTO paymentDTO = (PaymentDTO) o;
        if (paymentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paymentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaymentDTO{" +
            "id=" + getId() +
            ", created='" + getCreated() + "'" +
            ", amount=" + getAmount() +
            ", status='" + getStatus() + "'" +
            ", payDate='" + getPayDate() + "'" +
            ", info='" + getInfo() + "'" +
            ", member=" + getMemberId() +
            "}";
    }
}
