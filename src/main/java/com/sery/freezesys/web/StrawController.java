package com.sery.freezesys.web;

import com.sery.freezesys.model.StrawDTO;
import com.sery.freezesys.service.StrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StrawController {
    @Autowired
    private StrawService strawService;

    @RequestMapping(value = "straws",method = RequestMethod.GET)
    public @ResponseBody
    List<StrawDTO> getStrawList(){
        List<StrawDTO> strawList = strawService.getStrawList();
        return strawList;
    }
}
