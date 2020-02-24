package com.zipcompany.gamex;

import com.zipcompany.gamex.Service.ItemService;
import com.zipcompany.gamex.Service.MonsterItemService;
import com.zipcompany.gamex.Service.MonsterService;
import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.domain.ItemType;
import com.zipcompany.gamex.domain.Monster;
import com.zipcompany.gamex.domain.MonsterItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@SpringBootApplication
@Configuration
public class GamexApplication {


    public static void main(String[] args) {
        SpringApplication.run(GamexApplication.class, args);



    }

    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver getCommonsMultipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(20971520);   // 20MB
        multipartResolver.setMaxInMemorySize(1048576);  // 1MB
        return multipartResolver;
    }


}
