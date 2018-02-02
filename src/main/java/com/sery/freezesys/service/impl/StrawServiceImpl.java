package com.sery.freezesys.service.impl;

import com.sery.freezesys.dao.StrawMapper;
import com.sery.freezesys.model.StrawDTO;
import com.sery.freezesys.service.StrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StrawServiceImpl implements StrawService {
    @Autowired
    private StrawMapper strawMapper;
    @Override
    public List<StrawDTO> getStrawList() {
        List<StrawDTO> strawList = strawMapper.selectAllStraw();
        return strawList;
    }
}
