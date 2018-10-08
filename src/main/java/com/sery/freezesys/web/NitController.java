package com.sery.freezesys.web;

import com.sery.freezesys.model.Nit;
import com.sery.freezesys.model.NitDTO;
import com.sery.freezesys.model.Tub;
import com.sery.freezesys.service.NitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

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

    /**
     * 编辑液氮罐信息
     * @param httpServletRequest
     * @return
     */
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

    /**
     * 根据套管ID查找套管信息
     * @param divepipeId
     * @return
     */
    @RequestMapping(value = "nit/{divepipeId}",method = RequestMethod.GET)
    public @ResponseBody
    NitDTO getNumByDivepipeId(@PathVariable("divepipeId") int divepipeId){
        NitDTO nitDTO = nitService.getNumByDivepipeId(divepipeId);
        return nitDTO;
    }

    /**
     * 查找所有的套管
     * @return
     */
    @RequestMapping(value = "allDivepipe",method = RequestMethod.GET)
    public @ResponseBody List<NitDTO> getAllDivepipe(){
        List<NitDTO> nitDTOList = nitService.getAllDivepipe();
        return nitDTOList;
    }

    /**
     * 根据需要的麦管数量查找符合条件的套管信息
     * @param request
     * @return
     */
    @RequestMapping(value = "getDivepipeByFlagNum",method = RequestMethod.GET)
    public @ResponseBody List<NitDTO> getDivepipeByFlagNum(HttpServletRequest request){
        List<NitDTO> nitDTOList = nitService.getDivepipesByFlagNum(Integer.parseInt(request.getParameter("flagNum")));
        return nitDTOList;
    }

    /**
     * 查询已启动的液氮罐所有的吊桶信息
     * @return
     */
    @RequestMapping(value = "tubInfo",method = RequestMethod.GET)
    public @ResponseBody
    List getTubList(){
        List list = nitService.getTubs();
        return list;
    }

    /**
     * 根据吊桶ID查找该吊桶下的所有套管信息
     * @param tubId
     * @return
     */
    @RequestMapping(value = "divepipeByTubId/{tubId}",method = RequestMethod.GET)
    public @ResponseBody List<NitDTO> getDivepipeByTubId(@PathVariable("tubId") int tubId){
        List<NitDTO> nitDTOList = nitService.getDivepipeByTubId(tubId);
        return nitDTOList;
    }

    /**
     * 根据关键字模糊查询液氮罐信息
     * @param keyword
     * @return
     */
    @RequestMapping(value = "nits/like",method = RequestMethod.GET)
    public @ResponseBody List<Nit> getNitsLike(@RequestParam("keyword")String keyword){
        List<Nit> nitList = nitService.getNitsLike(keyword);
        return nitList;
    }

}
