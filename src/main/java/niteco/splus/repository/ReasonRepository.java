package niteco.splus.repository;

import niteco.splus.domain.Reason;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Reason entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReasonRepository extends JpaRepository<Reason, Long> {

}
