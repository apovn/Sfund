package niteco.splus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Member.
 */
@Entity
@Table(name = "member")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Member implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created")
    private Instant created;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "phone")
    private Long phone;

    @Column(name = "current_amount")
    private Long currentAmount;

    @Column(name = "total_amount")
    private Long totalAmount;

    @Lob
    @Column(name = "info")
    private String info;

    @OneToMany(mappedBy = "member")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();
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

    public Member created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public String getName() {
        return name;
    }

    public Member name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Member description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public Member birthday(LocalDate birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public Long getPhone() {
        return phone;
    }

    public Member phone(Long phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public Long getCurrentAmount() {
        return currentAmount;
    }

    public Member currentAmount(Long currentAmount) {
        this.currentAmount = currentAmount;
        return this;
    }

    public void setCurrentAmount(Long currentAmount) {
        this.currentAmount = currentAmount;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public Member totalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
        return this;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getInfo() {
        return info;
    }

    public Member info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Member payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Member addPayment(Payment payment) {
        this.payments.add(payment);
        payment.setMember(this);
        return this;
    }

    public Member removePayment(Payment payment) {
        this.payments.remove(payment);
        payment.setMember(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
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
        Member member = (Member) o;
        if (member.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), member.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Member{" +
            "id=" + getId() +
            ", created='" + getCreated() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", phone=" + getPhone() +
            ", currentAmount=" + getCurrentAmount() +
            ", totalAmount=" + getTotalAmount() +
            ", info='" + getInfo() + "'" +
            "}";
    }
}
