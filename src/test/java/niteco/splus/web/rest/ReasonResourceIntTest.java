package niteco.splus.web.rest;

import niteco.splus.SfundApp;

import niteco.splus.domain.Reason;
import niteco.splus.repository.ReasonRepository;
import niteco.splus.service.ReasonService;
import niteco.splus.service.dto.ReasonDTO;
import niteco.splus.service.mapper.ReasonMapper;
import niteco.splus.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static niteco.splus.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReasonResource REST controller.
 *
 * @see ReasonResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SfundApp.class)
public class ReasonResourceIntTest {

    private static final Instant DEFAULT_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_INFO = "AAAAAAAAAA";
    private static final String UPDATED_INFO = "BBBBBBBBBB";

    @Autowired
    private ReasonRepository reasonRepository;

    @Autowired
    private ReasonMapper reasonMapper;

    @Autowired
    private ReasonService reasonService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReasonMockMvc;

    private Reason reason;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReasonResource reasonResource = new ReasonResource(reasonService);
        this.restReasonMockMvc = MockMvcBuilders.standaloneSetup(reasonResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reason createEntity(EntityManager em) {
        Reason reason = new Reason()
            .created(DEFAULT_CREATED)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .info(DEFAULT_INFO);
        return reason;
    }

    @Before
    public void initTest() {
        reason = createEntity(em);
    }

    @Test
    @Transactional
    public void createReason() throws Exception {
        int databaseSizeBeforeCreate = reasonRepository.findAll().size();

        // Create the Reason
        ReasonDTO reasonDTO = reasonMapper.toDto(reason);
        restReasonMockMvc.perform(post("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isCreated());

        // Validate the Reason in the database
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeCreate + 1);
        Reason testReason = reasonList.get(reasonList.size() - 1);
        assertThat(testReason.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testReason.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReason.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testReason.getInfo()).isEqualTo(DEFAULT_INFO);
    }

    @Test
    @Transactional
    public void createReasonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reasonRepository.findAll().size();

        // Create the Reason with an existing ID
        reason.setId(1L);
        ReasonDTO reasonDTO = reasonMapper.toDto(reason);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReasonMockMvc.perform(post("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reason in the database
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = reasonRepository.findAll().size();
        // set the field null
        reason.setName(null);

        // Create the Reason, which fails.
        ReasonDTO reasonDTO = reasonMapper.toDto(reason);

        restReasonMockMvc.perform(post("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isBadRequest());

        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReasons() throws Exception {
        // Initialize the database
        reasonRepository.saveAndFlush(reason);

        // Get all the reasonList
        restReasonMockMvc.perform(get("/api/reasons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reason.getId().intValue())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(DEFAULT_CREATED.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].info").value(hasItem(DEFAULT_INFO.toString())));
    }
    
    @Test
    @Transactional
    public void getReason() throws Exception {
        // Initialize the database
        reasonRepository.saveAndFlush(reason);

        // Get the reason
        restReasonMockMvc.perform(get("/api/reasons/{id}", reason.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reason.getId().intValue()))
            .andExpect(jsonPath("$.created").value(DEFAULT_CREATED.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.info").value(DEFAULT_INFO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReason() throws Exception {
        // Get the reason
        restReasonMockMvc.perform(get("/api/reasons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReason() throws Exception {
        // Initialize the database
        reasonRepository.saveAndFlush(reason);

        int databaseSizeBeforeUpdate = reasonRepository.findAll().size();

        // Update the reason
        Reason updatedReason = reasonRepository.findById(reason.getId()).get();
        // Disconnect from session so that the updates on updatedReason are not directly saved in db
        em.detach(updatedReason);
        updatedReason
            .created(UPDATED_CREATED)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .info(UPDATED_INFO);
        ReasonDTO reasonDTO = reasonMapper.toDto(updatedReason);

        restReasonMockMvc.perform(put("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isOk());

        // Validate the Reason in the database
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeUpdate);
        Reason testReason = reasonList.get(reasonList.size() - 1);
        assertThat(testReason.getCreated()).isEqualTo(UPDATED_CREATED);
        assertThat(testReason.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReason.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testReason.getInfo()).isEqualTo(UPDATED_INFO);
    }

    @Test
    @Transactional
    public void updateNonExistingReason() throws Exception {
        int databaseSizeBeforeUpdate = reasonRepository.findAll().size();

        // Create the Reason
        ReasonDTO reasonDTO = reasonMapper.toDto(reason);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReasonMockMvc.perform(put("/api/reasons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reasonDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Reason in the database
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReason() throws Exception {
        // Initialize the database
        reasonRepository.saveAndFlush(reason);

        int databaseSizeBeforeDelete = reasonRepository.findAll().size();

        // Get the reason
        restReasonMockMvc.perform(delete("/api/reasons/{id}", reason.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Reason> reasonList = reasonRepository.findAll();
        assertThat(reasonList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reason.class);
        Reason reason1 = new Reason();
        reason1.setId(1L);
        Reason reason2 = new Reason();
        reason2.setId(reason1.getId());
        assertThat(reason1).isEqualTo(reason2);
        reason2.setId(2L);
        assertThat(reason1).isNotEqualTo(reason2);
        reason1.setId(null);
        assertThat(reason1).isNotEqualTo(reason2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReasonDTO.class);
        ReasonDTO reasonDTO1 = new ReasonDTO();
        reasonDTO1.setId(1L);
        ReasonDTO reasonDTO2 = new ReasonDTO();
        assertThat(reasonDTO1).isNotEqualTo(reasonDTO2);
        reasonDTO2.setId(reasonDTO1.getId());
        assertThat(reasonDTO1).isEqualTo(reasonDTO2);
        reasonDTO2.setId(2L);
        assertThat(reasonDTO1).isNotEqualTo(reasonDTO2);
        reasonDTO1.setId(null);
        assertThat(reasonDTO1).isNotEqualTo(reasonDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(reasonMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(reasonMapper.fromId(null)).isNull();
    }
}
