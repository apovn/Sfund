package niteco.splus.service.mapper;

import niteco.splus.domain.*;
import niteco.splus.service.dto.MemberDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Member and its DTO MemberDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MemberMapper extends EntityMapper<MemberDTO, Member> {


    @Mapping(target = "payments", ignore = true)
    Member toEntity(MemberDTO memberDTO);

    default Member fromId(Long id) {
        if (id == null) {
            return null;
        }
        Member member = new Member();
        member.setId(id);
        return member;
    }
}
