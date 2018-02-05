package com.sery.freezesys.service;

import com.sery.freezesys.dao.StrawMapper;
import com.sery.freezesys.model.Straw;
import com.sery.freezesys.model.StrawDTO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContext.xml"})
public class StrawServiceTest {
    @Autowired
    private StrawService strawService;

    @Test
    public void getStrawList() throws ParseException {
        //List<StrawDTO> strawDTOList = strawService.getStrawList();
        //System.out.println(strawDTOList);
        String str = "2013-04-08 13:54";
        Date d = new Date(str);
        System.out.println(d);
    }

    @Test
    public void addStraw() {
        StrawDTO straw = new StrawDTO();
        straw.setStrawNum("d");
        straw.setFreezeNum("1523");
        straw.setBarcodeNum("dkhsnmcnvsjdj");
        straw.setMedicalRecord("HJSHD-54");
        straw.setFemaleName("张依依");
        straw.setSampleType("胚胎");
        straw.setSampleAmount(2);
        straw.setNitNum("P");
        straw.setTubNum("1");
        straw.setDivepipeNum("31");
        straw.setFreezeTime("2015-04-03 15:00");
        straw.setExpireTime("2018-04-03 15:00");
        straw.setFreezeStatus("未解冻");
        straw.setOperator("无");
        straw.setRemark("无");
        int result = strawService.addStraw(straw);
        System.out.println(result);
    }
}