package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.ItemService;
import com.zipcompany.gamex.Service.UserItemService;
import com.zipcompany.gamex.Service.UserService;
import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.MonsterItem;
import com.zipcompany.gamex.domain.UserItem;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    private ItemService itemService;
    private UserItemService userItemService;
    private UserService userService;

    @Autowired
    public ItemController(ItemService itemService,UserItemService userItemService){
        this.itemService = itemService;
        this.userItemService=userItemService;
    }


    @PostMapping("/additem")
    Item saveItem(@RequestBody Item item){
        return itemService.addItem(item);
    }

    @GetMapping("/getitems")
    List<Item> getItems(){
        return itemService.getAllItems();
    }


    @GetMapping("/getitemnames")
    List<String> getItemNames(){
        List<Item> templateList = itemService.getAllItems();
        List<String> temp = new ArrayList<String>();
        for(int i = 0; i < templateList.size(); i++){
            temp.add(templateList.get(i).getItemName());
        }
        return temp;
    }

    @RequestMapping(value = "getItemImage/{id}")
    public void getItemPhoto(HttpServletResponse response, @PathVariable("id") long id) throws Exception {
        response.setContentType("image/jpeg");
        Blob ph = itemService.getPhotoById(id);
        byte[] bytes = ph.getBytes(1, (int) ph.length());
        InputStream inputStream = new ByteArrayInputStream(bytes);
        IOUtils.copy(inputStream, response.getOutputStream());

        // System.out.println(itemService.getItemById(id).getItemName());
    }


    @GetMapping("/drop/{id}")
    List<MonsterItem> whatMonsterDropsThisItem(@PathVariable(value = "id") Long itemId) {
        Item item = itemService.getItemById(itemId);
        return item.getMonsterItems();
    }

    @GetMapping(value = "/getItem/{itemId}")
    Item getItem(@PathVariable ("itemId") Long itemId){
       Item item = itemService.getItemById(itemId);
       System.out.print(item.getItemName());
       // return itemService.getItemById(itemId);
        return null;
    }

}
