package niteco.splus.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(niteco.splus.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(niteco.splus.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(niteco.splus.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(niteco.splus.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Reason.class.getName(), jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Member.class.getName(), jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Payment.class.getName(), jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Reason.class.getName() + ".reasons", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Member.class.getName() + ".mempayments", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Payment.class.getName() + ".payments", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Reason.class.getName() + ".mm2payments", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Member.class.getName() + ".mem2pays", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Payment.class.getName() + ".mm2reasons", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Reason.class.getName() + ".payments", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Member.class.getName() + ".payments", jcacheConfiguration);
            cm.createCache(niteco.splus.domain.Payment.class.getName() + ".reasons", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
