package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface LocationRepository extends JpaRepository<Location,Long> {
    Location findByLocationName(String locationName);

}
