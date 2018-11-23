package niteco.splus.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Reason entity.
 */
public class ReasonDTO implements Serializable {

    private Long id;

    private Instant created;

    @NotNull
    private String name;

    @Lob
    private String description;

    @Lob
    private String info;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ReasonDTO reasonDTO = (ReasonDTO) o;
        if (reasonDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reasonDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReasonDTO{" +
            "id=" + getId() +
            ", created='" + getCreated() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", info='" + getInfo() + "'" +
            "}";
    }
}
