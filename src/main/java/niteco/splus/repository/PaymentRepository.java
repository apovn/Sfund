package niteco.splus.repository;

import niteco.splus.domain.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query(value = "select distinct payment from Payment payment left join fetch payment.reasons",
        countQuery = "select count(distinct payment) from Payment payment")
    Page<Payment> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct payment from Payment payment left join fetch payment.reasons")
    List<Payment> findAllWithEagerRelationships();

    @Query("select payment from Payment payment left join fetch payment.reasons where payment.id =:id")
    Optional<Payment> findOneWithEagerRelationships(@Param("id") Long id);

}
