package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Location;

import java.sql.Blob;

public interface LocationService {
    Location findByLocationName(String locationName);
    Location findLocationById (Long id);
    public Blob getPhotoById(long id);
}
