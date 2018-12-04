package niteco.splus.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import niteco.splus.domain.enumeration.PayStatusEnum;

/**
 * A Payment.
 */
@Entity
@Table(name = "payment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Payment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created")
    private Instant created;

    @Column(name = "amount")
    private Long amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private PayStatusEnum status;

    @Column(name = "pay_date")
    private Instant payDate;

    @Lob
    @Column(name = "info")
    private String info;

    @Lob
    @Column(name = "description")
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "payment_reason",
               joinColumns = @JoinColumn(name = "payments_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "reasons_id", referencedColumnName = "id"))
    private Set<Reason> reasons = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("payments")
    private Member member;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreated() {
        return created;
    }

    public Payment created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public Long getAmount() {
        return amount;
    }

    public Payment amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public PayStatusEnum getStatus() {
        return status;
    }

    public Payment status(PayStatusEnum status) {
        this.status = status;
        return this;
    }

    public void setStatus(PayStatusEnum status) {
        this.status = status;
    }

    public Instant getPayDate() {
        return payDate;
    }

    public Payment payDate(Instant payDate) {
        this.payDate = payDate;
        return this;
    }

    public void setPayDate(Instant payDate) {
        this.payDate = payDate;
    }

    public String getInfo() {
        return info;
    }

    public Payment info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getDescription() {
        return description;
    }

    public Payment description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Reason> getReasons() {
        return reasons;
    }

    public Payment reasons(Set<Reason> reasons) {
        this.reasons = reasons;
        return this;
    }

    public Payment addReason(Reason reason) {
        this.reasons.add(reason);
        reason.getPayments().add(this);
        return this;
    }

    public Payment removeReason(Reason reason) {
        this.reasons.remove(reason);
        reason.getPayments().remove(this);
        return this;
    }

    public void setReasons(Set<Reason> reasons) {
        this.reasons = reasons;
    }

    public Member getMember() {
        return member;
    }

    public Payment member(Member member) {
        this.member = member;
        return this;
    }

    public void setMember(Member member) {
        this.member = member;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Payment payment = (Payment) o;
        if (payment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), payment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Payment{" +
            "id=" + getId() +
            ", created='" + getCreated() + "'" +
            ", amount=" + getAmount() +
            ", status='" + getStatus() + "'" +
            ", payDate='" + getPayDate() + "'" +
            ", info='" + getInfo() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
