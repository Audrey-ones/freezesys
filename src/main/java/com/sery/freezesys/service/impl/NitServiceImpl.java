package com.sery.freezesys.service.impl;

import com.sery.freezesys.dao.NitMapper;
import com.sery.freezesys.model.Divepipe;
import com.sery.freezesys.model.Nit;
import com.sery.freezesys.model.NitDTO;
import com.sery.freezesys.model.Tub;
import com.sery.freezesys.service.NitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NitServiceImpl implements NitService {
    @Autowired
    private NitMapper nitMapper;

    @Override
    public List<Nit> getNitList() {
        List<Nit> nitList = nitMapper.selectAllNits();
        return nitList;
    }


    @Override
    public int addNit(Nit nit) {
        int result = nitMapper.insertNit(nit);
        addTub(nit.getNitId(),nit.getTubAmount(),nit.getDivepipeAmount(),nit.getStrawAmount());
        return result;
    }

    @Override
    public void addTub(int nitId, int tubAmount, int divepipeAmount, int strawAmount) {
        //根据液氮罐中的吊桶总数，初始化在每一个液氮罐下添加吊桶
        for (int i=0; i<tubAmount; i++){
            Tub tub = new Tub();
            int tubNum = i + 1;
            tub.setTubNum(Integer.toString(tubNum));
            tub.setNitId(nitId);
            nitMapper.insertTub(tub);
            addDivepipe(divepipeAmount,strawAmount,tub.getTubId());
        }
    }

    @Override
    public void addDivepipe(int divepipeAmount, int strawAmount, int tubId) {
        //根据液氮罐中的套管总数，初始化生成吊桶后，再每一个吊桶下再初始化添加对应的套管
        for (int i=0; i<divepipeAmount; i++){
            Divepipe divepipe = new Divepipe();
            int divepipeNum = i + 1;
            divepipe.setDivepipeNum(Integer.toString(divepipeNum));
            divepipe.setFlagNum(strawAmount);
            divepipe.setTubId(tubId);
            nitMapper.insertDivepipe(divepipe);
        }
    }

    @Override
    public int updateNit(Nit nit) {
        int result = nitMapper.updateNit(nit);
        return result;
    }

    @Override
    public int deleteNit(int nitId) {
        //根据液氮罐ID查找该液氮罐下的吊桶
        List<Tub> tubList = nitMapper.selectAllTubsByNitId(nitId);
        for (Tub tub : tubList){
            //删除每一个吊桶下的所有套管
            nitMapper.deleteDivepipe(tub.getTubId());
        }
        //根据液氮罐编号删除该液氮罐下的所有吊桶
        nitMapper.deleteTub(nitId);
        //删除液氮罐
        int result = nitMapper.deleteNit(nitId);
        return result;
    }

    @Override
    public Nit getNitById(int nitId) {
        Nit nit = nitMapper.selectNitById(nitId);
        return nit;
    }

    @Override
    public NitDTO getNumByDivepipeId(int divepipeId) {
        NitDTO nitDTO = nitMapper.selectNumByDivepipeId(divepipeId);
        return nitDTO;
    }

    @Override
    public List<NitDTO> getAllDivepipe() {
        List<NitDTO> nitDTOList = nitMapper.selectAllDivepipe();
        return nitDTOList;
    }

    @Override
    public List<NitDTO> getDivepipesByFlagNum(int flagNum) {
        List<NitDTO> nitDTOList = nitMapper.selectDivepipeByFlagNum(flagNum);
        return nitDTOList;
    }

    @Override
    public List getTubs() {
        List tubs = new ArrayList();
        List<Nit> nitList = nitMapper.selectNitsByStatus();
        for (Nit nit : nitList){
            Map map = new HashMap();
            List<Tub> tubList = nitMapper.selectAllTubsByNitId(nit.getNitId());
            map.put("nit",nit);
            map.put("tubList",tubList);
            tubs.add(map);
        }
        return tubs;
    }

    @Override
    public List<NitDTO> getDivepipeByTubId(int tubId) {
        List<NitDTO> nitDTOList = nitMapper.selectDivepipeByTubId(tubId);
        return nitDTOList;
    }

    @Override
    public List<Nit> getNitsLike(String keyword) {
        List<Nit> nitList = nitMapper.selectNitsLike(keyword);
        return nitList;
    }

}
