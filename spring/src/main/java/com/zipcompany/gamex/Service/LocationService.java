package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Location;

public interface LocationService {
    Location findByLocationName(String locationName);
}
