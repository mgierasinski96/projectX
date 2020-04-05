package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.LocationService;
import com.zipcompany.gamex.Service.MonsterService;
import com.zipcompany.gamex.domain.Location;
import com.zipcompany.gamex.domain.Monster;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    LocationService locationService;
    @Autowired
    MonsterService monsterService;

    @GetMapping(value = "/locationDescription/{locationID}")
    Location showLocationDescription(@PathVariable("locationID") String locationID) {
        System.out.println("co jest kurwa?");
        return locationService.findByLocationName(locationID);
    }

    @GetMapping(value = "/locationDescriptionByID/{locationID}")
    Location getLocationDescription(@PathVariable("locationID") Long locationID){
        return  locationService.findLocationById(locationID);
    }

    @GetMapping(value = "/getAllMonsters/{locationName}")
    List<Monster> getMonstersByLocationName(@PathVariable String locationName) {
        return locationService.findByLocationName(locationName).getMonsters();
    }

    @GetMapping(value = "/getMonster/{locationName}")
    Monster getOneRandomMonsterForLocation(@PathVariable String locationName) {
        return monsterService.getOneRandomMonsterForLocation(locationName);
    }
    @RequestMapping(value = "getLocationImage/{id}")
    public void getItemPhoto(HttpServletResponse response, @PathVariable("id") long id) throws Exception {
        response.setContentType("image/jpeg");
        Blob ph = locationService.getPhotoById(id);
        byte[] bytes = ph.getBytes(1, (int) ph.length());
        InputStream inputStream = new ByteArrayInputStream(bytes);
        IOUtils.copy(inputStream, response.getOutputStream());

        // System.out.println(itemService.getItemById(id).getItemName());
    }
}
