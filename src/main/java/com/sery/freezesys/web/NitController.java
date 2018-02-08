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

    /**
     * 查询所有的液氮罐
     * @return
     */
    @RequestMapping(value = "nits",method = RequestMethod.GET)
    public @ResponseBody
    List<Nit> getNitList(){
        List<Nit> nitList = nitService.getNitList();
        return nitList;
    }

    /**
     * 根据液氮罐Id删除对应的液氮罐
     * @param nitId
     * @return
     */
    @RequestMapping(value = "nits/{nitId}",method = RequestMethod.POST)
    public int deleteNit(@PathVariable("nitId") int nitId){
        int result = nitService.deleteNit(nitId);
        return result;
    }

    /**
     * 新增一个液氮罐
     * @param request
     * @return
     */
    @RequestMapping(value = "nits",method = RequestMethod.POST)
    public int addNit(HttpServletRequest request){
        Nit nit = new Nit();
        nit.setNitNum(request.getParameter("nitNum"));
        nit.setVersion(request.getParameter("version"));
        nit.setAntibodyType(request.getParameter("antibodyType"));
        nit.setStatus(request.getParameter("status"));
        nit.setTubAmount(Integer.parseInt(request.getParameter("tubAmount")));
        nit.setDivepipeAmount(Integer.parseInt(request.getParameter("divepipeAmount")));
        nit.setStrawAmount(Integer.parseInt(request.getParameter("strawAmount")));
        nit.setRemark(request.getParameter("remark"));
        System.out.println(nit);
        int result = nitService.addNit(nit);
        return result;
    }

    /**
     *根据液氮罐ID查找液氮罐
     * @param nitId
     * @return
     */
    @RequestMapping(value = "nits/{nitId}",method = RequestMethod.GET)
    public @ResponseBody Nit getNitById(@PathVariable("nitId") int nitId){
        Nit nit = nitService.getNitById(nitId);
        return nit;
    }

    @RequestMapping(value = "nitEdit",method = RequestMethod.POST)
    public int editNit(HttpServletRequest httpServletRequest){
        Nit nit = new Nit();
        nit.setNitId(Integer.parseInt(httpServletRequest.getParameter("nitId")));
        nit.setNitNum(httpServletRequest.getParameter("nitNum"));
        nit.setVersion(httpServletRequest.getParameter("version"));
        nit.setAntibodyType(httpServletRequest.getParameter("antibodyType"));
        nit.setStatus(httpServletRequest.getParameter("status"));
        nit.setRemark(httpServletRequest.getParameter("remark"));
        int result = nitService.updateNit(nit);
        return result;
    }
}
