package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.LocationService;
import com.zipcompany.gamex.Service.MonsterService;
import com.zipcompany.gamex.domain.Monster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    LocationService locationService;
    @Autowired
    MonsterService monsterService;

    @GetMapping(value="/getAllMonsters/{locationName}")
    List<Monster> getMonstersByLocationName(@PathVariable String locationName)
    {
        return locationService.findByLocationName(locationName).getMonsters();
    }

    @GetMapping(value="/getMonster/{locationName}")
    Monster getOneRandomMonsterForLocation(@PathVariable String locationName)
    {
        return monsterService.getOneRandomMonsterForLocation(locationName);
    }
}
