package com.sery.freezesys.service;

import com.sery.freezesys.model.Nit;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContext.xml"})
public class NitServiceTest {
    @Autowired
    private NitService nitService;

    @Test
    public void getNitList() {
        List<Nit> nitList=nitService.getNitList();
        System.out.println(nitList);
        for (Nit a:nitList
                ) {
            System.out.println(a);
        }
    }

    @Test
    public void addNit() {
        Nit nit = new Nit();
        nit.setNitNum("D");
        nit.setVersion("MVE47-11-10");
        nit.setAntibodyType("无");
        nit.setStatus("未使用");
        nit.setTubAmount(10);
        nit.setDivepipeAmount(31);
        nit.setStrawAmount(7);
        nit.setRemark("无");
        int result = nitService.addNit(nit);
        System.out.println(result);
    }

    @Test
    public void updateNit() {
        Nit nit = new Nit();
        nit.setNitId(2);
        nit.setRemark("修改过");
        int result = nitService.updateNit(nit);
        System.out.println(result);
    }
}