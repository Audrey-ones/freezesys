package com.sery.freezesys.web;

import com.sery.freezesys.model.StrawDTO;
import com.sery.freezesys.service.StrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.Date;
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
}
