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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContext.xml"})
public class StrawServiceTest {
    @Autowired
    private StrawService strawService;

    @Autowired
    private StrawMapper strawMapper;

    @Test
    public void getStrawList() throws ParseException {
        //List<StrawDTO> strawDTOList = strawService.getStrawList();
        //System.out.println(strawDTOList);
        List<StrawDTO> strawDTOList = strawMapper.selectAllStraw();
        System.out.println(strawDTOList);
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
        int result = strawService.addStraw(straw,0);
        System.out.println(result);
    }

    @Test
    public void getStrawById() {
        Straw straw = strawService.getStrawById(17);
        System.out.println(straw);
    }

    @Test
    public void updateStraw() {
        StrawDTO strawDTO = new StrawDTO();
        strawDTO.setStrawId(17);
        strawDTO.setMedicalRecord("F2018-01");
        strawDTO.setFemaleName("张艺馨");
        strawDTO.setMaleName("白净123");
        strawDTO.setSampleType("胚胎");
        strawDTO.setSampleAmount(3);
        strawDTO.setFreezeNum("201802");
        //时间的处理
        strawDTO.setFreezeTime("2018-02-24 12:59:12");
        strawDTO.setExpireTime("2019-02-28 00:15:00");
        strawDTO.setNitNum("A");
        strawDTO.setTubNum("1");
        strawDTO.setDivepipeNum("1");
        int result = strawService.updateStraw(strawDTO,32,4031);
       /*Straw straw = new Straw();
       straw.setStrawId(17);
       straw.setSampleAmount(3);
       int result = strawMapper.updateStrawInfo(straw);*/
        System.out.println(result);
    }

    @Test
    public void getStrawByBarcodeNum() {
        StrawDTO strawDTO = strawService.getStrawByBarcodeNum("1521018798605");
        System.out.println(strawDTO);
    }
}