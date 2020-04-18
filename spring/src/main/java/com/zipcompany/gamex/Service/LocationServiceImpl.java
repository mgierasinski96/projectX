package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Location;
import com.zipcompany.gamex.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;


import javax.sql.DataSource;
import java.sql.Blob;
import javax.transaction.Transactional;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    LocationRepository locationRepository;

    @Override
    public Location findByLocationName(String locationName) {
        if (locationName.contains("_")) {
            String[] template = locationName.split("_");
            String templatee = template[0] + " " + template[1];
            System.out.println(templatee);
            return locationRepository.findByLocationName(templatee);

        } else {
            return locationRepository.findByLocationName(locationName);
        }
    }

    @Override
    public Location findLocationById(Long id) {
        return locationRepository.findLocationById(id);
    }


    private JdbcTemplate jdbcTemp;

    public LocationServiceImpl(DataSource dataSource) {
        jdbcTemp = new JdbcTemplate(dataSource);
    }

    @Transactional
    public Blob getPhotoById(long id) {
        String query = "select l.location_picture from location l where l.id=?";
        Blob photo = jdbcTemp.queryForObject(query, new Object[]{id}, Blob.class);
        return photo;
    }
}
