package com.sery.freezesys.service.impl;

import com.sery.freezesys.dao.NitMapper;
import com.sery.freezesys.model.Nit;
import com.sery.freezesys.service.NitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return result;
    }

    @Override
    public int updateNit(Nit nit) {
        //Nit updateNit = nitMapper.selectNitById(nit.getNitId());
        int result = nitMapper.updateNit(nit);
        return result;
    }
}
