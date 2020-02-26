package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.MonsterService;
import com.zipcompany.gamex.domain.Monster;
import com.zipcompany.gamex.domain.MonsterItem;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.util.List;

@RestController
@RequestMapping("/monster")
public class MonsterController {

    private MonsterService monsterService;

    @Autowired
    public MonsterController(MonsterService monsterService) {
        this.monsterService = monsterService;
    }


    @PostMapping("/addmonster")
    Monster saveMonster(@RequestBody Monster monster) {
        return monsterService.saveMonster(monster);
    }

    @GetMapping("/getmonsters")
    List<Monster> getAllMonsters() {
        return monsterService.getAllMonsters();
    }



    @GetMapping("/monsterdrop/{id}")
    List<MonsterItem> whatItemsDropThisMonster(@PathVariable(value = "id") Long monsterId){
        Monster monster = monsterService.getMonsterById(monsterId);

        return  monster.getMonsterItems();
    }

    @RequestMapping(value = "getMonsterImage/{id}")
    public void getMonsterPhoto(HttpServletResponse response, @PathVariable("id") long id) throws Exception {
        response.setContentType("image/jpeg");
        Blob ph = monsterService.getPhotoById(id);
        byte[] bytes = ph.getBytes(1, (int) ph.length());
        InputStream inputStream = new ByteArrayInputStream(bytes);
        IOUtils.copy(inputStream, response.getOutputStream());
    }

}
