package com.sery.freezesys.service;

import com.sery.freezesys.model.StrawDTO;

import java.util.List;

public interface StrawService {

    /**
     * 获取所有的麦管记录
     * @return
     */
    List<StrawDTO> getStrawList();
}
