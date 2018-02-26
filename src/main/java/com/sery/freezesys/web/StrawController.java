package com.sery.freezesys.web;

import com.sery.freezesys.model.Straw;
import com.sery.freezesys.model.StrawDTO;
import com.sery.freezesys.service.StrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @RequestMapping(value = "straw",method = RequestMethod.POST)
    public int addStraw(HttpServletRequest request) throws ParseException {
        StrawDTO strawDTO = new StrawDTO();
        strawDTO.setMedicalRecord(request.getParameter("medicalRecord"));
        strawDTO.setFemaleName(request.getParameter("femaleName"));
        strawDTO.setMaleName(request.getParameter("maleName"));
        strawDTO.setSampleType(request.getParameter("sampleType"));
        strawDTO.setSampleAmount(Integer.parseInt(request.getParameter("sampleAmount")));
        strawDTO.setFreezeNum(request.getParameter("freezeNum"));
        //时间的处理
        strawDTO.setFreezeTime(request.getParameter("freezeTime"));
        strawDTO.setExpireTime(request.getParameter("expireTime"));
        strawDTO.setBarcodeNum(request.getParameter("barcodeNum"));
        strawDTO.setNitNum(request.getParameter("nitNum"));
        strawDTO.setTubNum(request.getParameter("tubNum"));
        strawDTO.setDivepipeNum(request.getParameter("divepipeNum"));
        strawDTO.setFreezeStatus(request.getParameter("freezeStatus"));
        strawDTO.setOperator(request.getParameter("operator"));
        strawDTO.setStrawNum(request.getParameter("strawNum"));
        strawDTO.setRemark(request.getParameter("remark"));
        int result = strawService.addStraw(strawDTO);
        return result;

    }

    @RequestMapping(value = "updateFreezeStatus",method = RequestMethod.POST)
    public int updateFreezeStatus(HttpServletRequest request){
        Straw straw = new Straw();
        straw.setStrawId(Integer.parseInt(request.getParameter("strawId")));
        straw.setFreezeStatus(request.getParameter("freezeStatus"));
        straw.setOperator(request.getParameter("operator"));
        int result = strawService.updateFreezeStatus(straw);
        return result;
    }

    @RequestMapping(value = "straws/{strawId}",method = RequestMethod.GET)
    public @ResponseBody Straw getStrawById(@PathVariable("strawId") int strawId){
        Straw straw = strawService.getStrawById(strawId);
        return straw;
    }

    @RequestMapping(value = "strawEdit",method = RequestMethod.POST)
    public int editStraw(HttpServletRequest httpServletRequest){
        StrawDTO strawDTO = new StrawDTO();
        strawDTO.setStrawId(Integer.parseInt(httpServletRequest.getParameter("strawId")));
        strawDTO.setMedicalRecord(httpServletRequest.getParameter("medicalRecord"));
        strawDTO.setFemaleName(httpServletRequest.getParameter("femaleName"));
        strawDTO.setMaleName(httpServletRequest.getParameter("maleName"));
        strawDTO.setSampleType(httpServletRequest.getParameter("sampleType"));
        strawDTO.setSampleAmount(Integer.parseInt(httpServletRequest.getParameter("sampleAmount")));
        strawDTO.setFreezeNum(httpServletRequest.getParameter("freezeNum"));
        //时间的处理
        strawDTO.setFreezeTime(httpServletRequest.getParameter("freezeTime"));
        strawDTO.setExpireTime(httpServletRequest.getParameter("expireTime"));
        strawDTO.setNitNum(httpServletRequest.getParameter("nitNum"));
        strawDTO.setTubNum(httpServletRequest.getParameter("tubNum"));
        strawDTO.setDivepipeNum(httpServletRequest.getParameter("divepipeNum"));
        strawDTO.setStrawNum(httpServletRequest.getParameter("strawNum"));
        int patientId = Integer.parseInt(httpServletRequest.getParameter("patientId"));
        int divepipeId = Integer.parseInt(httpServletRequest.getParameter("divepipeId"));
        //传递参数，调用
        int result = strawService.updateStraw(strawDTO,patientId,divepipeId);
        return result;
    }

    @RequestMapping(value = "getCount",method = RequestMethod.GET)
    public @ResponseBody
    Map getCount(){
        Map map = strawService.getCount();
        return map;
    }
}
