package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Location;
import com.zipcompany.gamex.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LocationServiceImpl implements LocationService {

    @Autowired
    LocationRepository locationRepository;

    @Override
    public Location findByLocationName(String locationName) {
        return locationRepository.findByLocationName(locationName);
    }
}
