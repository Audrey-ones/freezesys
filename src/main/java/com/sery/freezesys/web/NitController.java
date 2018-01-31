package com.sery.freezesys.web;

import com.sery.freezesys.model.Nit;
import com.sery.freezesys.service.NitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @RequestMapping(value = "nits/{nitId}",method = RequestMethod.POST)
    public int deleteNit(@PathVariable("nitId") int nitId){
        int result = nitService.deleteNit(nitId);
        return result;
    }

    @RequestMapping(value = "nits",method = RequestMethod.POST)
    public int addNit(HttpServletRequest request){
        Nit nit = new Nit();
        nit.setNitNum(request.getParameter("nitNum"));
        nit.setVersion(request.getParameter("version"));
        nit.setAntibodyType(request.getParameter("antibodyType"));
        nit.setTubAmount(Integer.parseInt(request.getParameter("tubAmount")));
        nit.setDivepipeAmount(Integer.parseInt(request.getParameter("divepipeAmount")));
        nit.setStrawAmount(Integer.parseInt(request.getParameter("strawAmount")));
        nit.setStatus(request.getParameter("status"));
        nit.setRemark(request.getParameter("remark"));
        int result = nitService.addNit(nit);
        return result;
    }
}
