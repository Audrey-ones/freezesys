package com.sery.freezesys.service;

import com.sery.freezesys.dao.StrawMapper;
import com.sery.freezesys.model.Straw;
import com.sery.freezesys.model.StrawDTO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContext.xml"})
public class StrawServiceTest {
    @Autowired
    private StrawService strawService;

    @Test
    public void getStrawList() {
        List<StrawDTO> strawDTOList = strawService.getStrawList();
        System.out.println(strawDTOList);
    }
}