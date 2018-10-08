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

    /**
     * 获取所有已存储的麦管记录
     * @return
     */
    @RequestMapping(value = "straws",method = RequestMethod.GET)
    public @ResponseBody
    List<StrawDTO> getStrawList(){
        List<StrawDTO> strawList = strawService.getStrawByPage();
        return strawList;
    }

    /**
     * 新增一条麦管存储记录
     * @param request
     * @return
     * @throws ParseException
     */
    @RequestMapping(value = "straw",method = RequestMethod.POST)
    public int addStraw(HttpServletRequest request) throws ParseException {
        Straw straw = new Straw();
        String medicalRecord=request.getParameter("medicalRecord");
        String femaleName=request.getParameter("femaleName");
        String maleName=request.getParameter("maleName");
        straw.setSampleType(request.getParameter("sampleType"));
        straw.setSampleAmount(Integer.parseInt(request.getParameter("sampleAmount")));
        straw.setSampleNum(request.getParameter("sampleNum"));
        straw.setFreezeNum(request.getParameter("freezeNum"));
        //时间的处理
        straw.setFreezeTime(request.getParameter("freezeTime"));
        straw.setExpireTime(request.getParameter("expireTime"));
        straw.setBarcodeNum(request.getParameter("barcodeNum"));
        String nitNum=request.getParameter("nitNum");
        String tubNum=request.getParameter("tubNum");
        String divepipeNum=request.getParameter("divepipeNum");
        straw.setThawTime(request.getParameter("thawTime"));
        straw.setFreezeStatus(request.getParameter("freezeStatus"));
        straw.setOperator(request.getParameter("operator"));
        straw.setStrawNum(request.getParameter("strawNum"));
        straw.setRemark(request.getParameter("remark"));
        int addType = Integer.parseInt(request.getParameter("addType"));
        int result = strawService.addStraw(straw,medicalRecord,femaleName,maleName,nitNum,tubNum,divepipeNum,addType);
        return result;

    }
    /*@RequestMapping(value = "straw",method = RequestMethod.POST)
    public int addStraw(HttpServletRequest request) throws ParseException {
        StrawDTO strawDTO = new StrawDTO();
        strawDTO.setMedicalRecord(request.getParameter("medicalRecord"));
        strawDTO.setFemaleName(request.getParameter("femaleName"));
        strawDTO.setMaleName(request.getParameter("maleName"));
        strawDTO.setSampleType(request.getParameter("sampleType"));
        strawDTO.setSampleAmount(Integer.parseInt(request.getParameter("sampleAmount")));
        strawDTO.setSampleNum(request.getParameter("sampleNum"));
        strawDTO.setFreezeNum(request.getParameter("freezeNum"));
        //时间的处理
        strawDTO.setFreezeTime(request.getParameter("freezeTime"));
        strawDTO.setExpireTime(request.getParameter("expireTime"));
        strawDTO.setBarcodeNum(request.getParameter("barcodeNum"));
        strawDTO.setNitNum(request.getParameter("nitNum"));
        strawDTO.setTubNum(request.getParameter("tubNum"));
        strawDTO.setDivepipeNum(request.getParameter("divepipeNum"));
        strawDTO.setThawTime(request.getParameter("thawTime"));
        strawDTO.setFreezeStatus(request.getParameter("freezeStatus"));
        strawDTO.setOperator(request.getParameter("operator"));
        strawDTO.setStrawNum(request.getParameter("strawNum"));
        strawDTO.setRemark(request.getParameter("remark"));
        int addType = Integer.parseInt(request.getParameter("addType"));
        int result = strawService.addStraw(strawDTO,addType);
        return result;

    }*/

    /**
     * 解冻一条麦管记录
     * @param request
     * @return
     */
    @RequestMapping(value = "updateFreezeStatus",method = RequestMethod.POST)
    public int updateFreezeStatus(HttpServletRequest request) throws Exception {
        Straw straw = new Straw();
        straw.setStrawId(Integer.parseInt(request.getParameter("strawId")));
        straw.setFreezeStatus(request.getParameter("freezeStatus"));
        //straw.setThawTime(request.getParameter("thawTime"));
        straw.setOperator(request.getParameter("operator"));
        int result = strawService.updateFreezeStatus(straw);
        return result;
    }

    /**
     * 根据麦管ID获取一条麦管记录
     * @param strawId
     * @return
     */
    @RequestMapping(value = "straws/{strawId}",method = RequestMethod.GET)
    public @ResponseBody Straw getStrawById(@PathVariable("strawId") int strawId){
        Straw straw = strawService.getStrawById(strawId);
        return straw;
    }

    /**
     * 编辑一条麦管记录
     * @param httpServletRequest
     * @return
     */
    @RequestMapping(value = "strawEdit",method = RequestMethod.POST)
    public int editStraw(HttpServletRequest httpServletRequest){
        StrawDTO strawDTO = new StrawDTO();
        strawDTO.setStrawId(Integer.parseInt(httpServletRequest.getParameter("strawId")));
        strawDTO.setMedicalRecord(httpServletRequest.getParameter("medicalRecord"));
        strawDTO.setFemaleName(httpServletRequest.getParameter("femaleName"));
        strawDTO.setMaleName(httpServletRequest.getParameter("maleName"));
        strawDTO.setSampleType(httpServletRequest.getParameter("sampleType"));
        strawDTO.setSampleAmount(Integer.parseInt(httpServletRequest.getParameter("sampleAmount")));
        strawDTO.setSampleNum(httpServletRequest.getParameter("sampleNum"));
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

    /**
     * 获取首页麦管总数、液氮罐总数、病人总数等参数
     * @return
     */
    @RequestMapping(value = "getCount",method = RequestMethod.GET)
    public @ResponseBody
    Map getCount(){
        Map map = strawService.getCount();
        return map;
    }

    /**
     * 根据条形码获取麦管记录
     * @param request
     * @return
     */
    @RequestMapping(value = "strawByBarcodeNum",method = RequestMethod.POST)
    public @ResponseBody Map getStrawByBarcodeNum(HttpServletRequest request){
        String barcodeNum = request.getParameter("barcodeNum");
        Map map = strawService.getStrawByBarcodeNum(barcodeNum);
        return map;
    }

    /**
     * 扫描解冻，并返回解冻后的信息
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "scanningThawing",method = RequestMethod.POST)
    public @ResponseBody StrawDTO getStrawByScanningThawing(HttpServletRequest request) throws Exception {
        int strawId = Integer.parseInt(request.getParameter("strawId"));
        String operator = request.getParameter("operator");
        //String thawTime = request.getParameter("thawTime");
        StrawDTO strawDTO = strawService.getStrawBySanningThawing(strawId,operator);
        return strawDTO;
    }

    /**
     * 获取所有解冻记录
     * @return
     */
    @RequestMapping(value = "allThawRecord",method = RequestMethod.GET)
    public @ResponseBody List<StrawDTO> getAllThawRecord(){
        List<StrawDTO> strawDTOList = strawService.getAllThawRecord();
        return strawDTOList;
    }

    @RequestMapping(value = "straws/like",method = RequestMethod.GET)
    public @ResponseBody List<StrawDTO> getAllStraws(@RequestParam("keyword") String keyword){
        List<StrawDTO> strawList = strawService.selectStrawsLike(keyword);
        return strawList;
    }
}
