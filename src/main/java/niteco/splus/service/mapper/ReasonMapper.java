package niteco.splus.service.mapper;

import niteco.splus.domain.*;
import niteco.splus.service.dto.ReasonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Reason and its DTO ReasonDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ReasonMapper extends EntityMapper<ReasonDTO, Reason> {


    @Mapping(target = "payments", ignore = true)
    Reason toEntity(ReasonDTO reasonDTO);

    default Reason fromId(Long id) {
        if (id == null) {
            return null;
        }
        Reason reason = new Reason();
        reason.setId(id);
        return reason;
    }
}
