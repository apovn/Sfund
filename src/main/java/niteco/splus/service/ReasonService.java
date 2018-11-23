package niteco.splus.service;

import niteco.splus.domain.Reason;
import niteco.splus.repository.ReasonRepository;
import niteco.splus.service.dto.ReasonDTO;
import niteco.splus.service.mapper.ReasonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Reason.
 */
@Service
@Transactional
public class ReasonService {

    private final Logger log = LoggerFactory.getLogger(ReasonService.class);

    private final ReasonRepository reasonRepository;

    private final ReasonMapper reasonMapper;

    public ReasonService(ReasonRepository reasonRepository, ReasonMapper reasonMapper) {
        this.reasonRepository = reasonRepository;
        this.reasonMapper = reasonMapper;
    }

    /**
     * Save a reason.
     *
     * @param reasonDTO the entity to save
     * @return the persisted entity
     */
    public ReasonDTO save(ReasonDTO reasonDTO) {
        log.debug("Request to save Reason : {}", reasonDTO);

        Reason reason = reasonMapper.toEntity(reasonDTO);
        reason = reasonRepository.save(reason);
        return reasonMapper.toDto(reason);
    }

    /**
     * Get all the reasons.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ReasonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Reasons");
        return reasonRepository.findAll(pageable)
            .map(reasonMapper::toDto);
    }


    /**
     * Get one reason by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ReasonDTO> findOne(Long id) {
        log.debug("Request to get Reason : {}", id);
        return reasonRepository.findById(id)
            .map(reasonMapper::toDto);
    }

    /**
     * Delete the reason by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Reason : {}", id);
        reasonRepository.deleteById(id);
    }
}
