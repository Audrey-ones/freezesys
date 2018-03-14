package com.sery.freezesys.service.impl;

import com.sery.freezesys.dao.NitMapper;
import com.sery.freezesys.dao.PatientMapper;
import com.sery.freezesys.dao.StrawMapper;
import com.sery.freezesys.model.Divepipe;
import com.sery.freezesys.model.Patient;
import com.sery.freezesys.model.Straw;
import com.sery.freezesys.model.StrawDTO;
import com.sery.freezesys.service.StrawService;
import com.sery.freezesys.utils.TscLibDllUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StrawServiceImpl implements StrawService {
    @Autowired
    private StrawMapper strawMapper;
    @Autowired
    private PatientMapper patientMapper;
    @Autowired
    private NitMapper nitMapper;

    @Override
    public List<StrawDTO> getStrawList() {
        List<StrawDTO> strawList = strawMapper.selectAllStraw();
        return strawList;
    }

    @Override
    public int addStraw(StrawDTO strawDTO,int addType) {
        int result;
        //根据病历号，女方姓名获取病人Id
        Map patientMap = new HashMap();
        patientMap.put("medicalRecord",strawDTO.getMedicalRecord());
        patientMap.put("femaleName",strawDTO.getFemaleName());
        Patient patient = patientMapper.selectPatient(patientMap);
        int patientId;
        //根据病历号，姓名获取病人Id，如果存在，直接把病人Id插入麦管记录
        if (patient != null){
            patientId = patient.getPatientId();
        }else {//否则新增一条病人记录，并返回病人Id
            Patient patientAdd = new Patient();
            patientAdd.setMedicalRecord(strawDTO.getMedicalRecord());
            patientAdd.setFemaleName(strawDTO.getFemaleName());
            patientAdd.setMaleName(strawDTO.getMaleName());
            patientMapper.insertPatient(patientAdd);
            patientId = patientAdd.getPatientId();
        }
        //根据液氮罐编号，吊桶编号，套管编号获取套管ID
        Map nitMap = new HashMap();
        nitMap.put("nitNum",strawDTO.getNitNum());
        nitMap.put("tubNum",strawDTO.getTubNum());
        nitMap.put("divepipeNum",strawDTO.getDivepipeNum());
        Divepipe divepipe = nitMapper.selectDivepipeId(nitMap);
        //查询套管位置是否满了
        if (divepipe.getFlagNum() > 0){
            //每次插入一条麦管信息，套管剩余位置少一个
            Map map = new HashMap();
            map.put("divepipeId",divepipe.getDivepipeId());
            map.put("flagNum",divepipe.getFlagNum()-1);
            nitMapper.updateFlagNum(map);
            //使用时间戳，作为条形码编号
            String barcodeNum = String.valueOf(System.currentTimeMillis());
            Straw straw = new Straw();
            straw.setStrawNum(strawDTO.getStrawNum());
            straw.setFreezeNum(strawDTO.getFreezeNum());
            straw.setBarcodeNum(barcodeNum);
            straw.setPatientId(patientId);
            straw.setDivepipeId(divepipe.getDivepipeId());
            straw.setSampleType(strawDTO.getSampleType());
            straw.setSampleAmount(strawDTO.getSampleAmount());
            straw.setSampleNum(strawDTO.getSampleNum());
            straw.setFreezeTime(strawDTO.getFreezeTime());
            straw.setExpireTime(strawDTO.getExpireTime());
            straw.setThawTime(strawDTO.getThawTime());
            straw.setFreezeStatus(strawDTO.getFreezeStatus());
            straw.setOperator(strawDTO.getOperator());
            straw.setRemark(strawDTO.getRemark());
            result = strawMapper.insertStraw(straw);
            //当addType为0时，为历史录入存储，不打印信息；当addType为1时，为冷冻存储，打印信息
            if (addType == 1){
                //打印信息，调用TscLibDllUtil的方法
                String text1 = strawDTO.getMedicalRecord()+"  "+strawDTO.getFemaleName();
                String text2 = strawDTO.getStrawNum()+"管"+strawDTO.getSampleAmount()+"枚"+strawDTO.getFreezeTime();
                String[] str = text2.split(" ");
                TscLibDllUtil.printBarcode(barcodeNum,text1,str[0]);
            }


        }else {
            result = 0;
        }

        return result;
    }

    @Override
    public int updateFreezeStatus(Straw straw) {
        int result;
        Straw selectStraw = strawMapper.getStrawById(straw.getStrawId());
        if (selectStraw.getFreezeStatus().equals(straw.getFreezeStatus())){
            result = 0;
        }else {
            Divepipe divepipe = nitMapper.selectDivepipeById(selectStraw.getDivepipeId());
            //每次解冻，套管剩余位置+1
            Map map = new HashMap();
            map.put("divepipeId",divepipe.getDivepipeId());
            map.put("flagNum",divepipe.getFlagNum()+1);
            nitMapper.updateFlagNum(map);
            Map updateMap = new HashMap();
            updateMap.put("strawId",straw.getStrawId());
            updateMap.put("freezeStatus",straw.getFreezeStatus());
            updateMap.put("thawTime",straw.getThawTime());
            updateMap.put("operator",straw.getOperator());
            result = strawMapper.updataFreezeStatus(updateMap);
        }

        return result;
    }

    @Override
    public Straw getStrawById(int strawId) {
        Straw straw = strawMapper.getStrawById(strawId);
        return straw;
    }

    @Override
    public int updateStraw(StrawDTO strawDTO, int patientId, int divepipeId) {
        Straw straw = new Straw();
        straw.setStrawId(strawDTO.getStrawId());
        straw.setStrawNum(strawDTO.getStrawNum());
        straw.setFreezeNum(strawDTO.getFreezeNum());
        straw.setSampleType(strawDTO.getSampleType());
        straw.setSampleAmount(strawDTO.getSampleAmount());
        straw.setSampleNum(strawDTO.getSampleNum());
        straw.setFreezeTime(strawDTO.getFreezeTime());
        straw.setExpireTime(strawDTO.getExpireTime());
        //根据液氮罐编号，吊桶编号，套管编号获取套管ID
        Map nitMap = new HashMap();
        nitMap.put("nitNum",strawDTO.getNitNum());
        nitMap.put("tubNum",strawDTO.getTubNum());
        nitMap.put("divepipeNum",strawDTO.getDivepipeNum());
        Divepipe divepipe = nitMapper.selectDivepipeId(nitMap);
        if (divepipeId == divepipe.getDivepipeId()){
            straw.setDivepipeId(divepipeId);
        }else {
            straw.setDivepipeId(divepipe.getDivepipeId());
            //新的套管位置-1
            Map newMap = new HashMap();
            newMap.put("divepipeId",divepipe.getDivepipeId());
            newMap.put("flagNum",divepipe.getFlagNum()-1);
            nitMapper.updateFlagNum(newMap);
            //原来的套管位置+1
            Map oldMap = new HashMap();
            oldMap.put("divepipeId",divepipeId);
            oldMap.put("flagNum",divepipe.getFlagNum()+1);
            nitMapper.updateFlagNum(oldMap);
        }
        //修改病人信息
        Patient patient = new Patient();
        patient.setPatientId(patientId);
        patient.setMedicalRecord(strawDTO.getMedicalRecord());
        patient.setFemaleName(strawDTO.getFemaleName());
        patient.setMaleName(strawDTO.getMaleName());
        patientMapper.updatePatient(patient);
        straw.setPatientId(patientId);
        int result = strawMapper.updateStrawInfo(straw);
        return result;
    }

    @Override
    public Map getCount() {
        int nitCount = nitMapper.selectNitCount();
        int patientCount = patientMapper.selectPatientCount();
        int strawCount = strawMapper.selectStrawCount();
        Map map = new HashMap();
        map.put("nitCount",nitCount);
        map.put("patientCount",patientCount);
        map.put("strawCount",strawCount);
        return map;
    }
}
