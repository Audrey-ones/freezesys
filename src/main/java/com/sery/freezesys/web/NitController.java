package com.sery.freezesys.web;

import com.sery.freezesys.model.Nit;
import com.sery.freezesys.service.NitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NitController {
    @Autowired
    private NitService nitService;

    @RequestMapping(value = "nits",method = RequestMethod.GET)
    public @ResponseBody
    List<Nit> getNitList(){
        List<Nit> nitList = nitService.getNitList();
        return nitList;
    }
}
