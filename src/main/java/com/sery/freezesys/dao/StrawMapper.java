package com.sery.freezesys.dao;

import com.sery.freezesys.model.StrawDTO;

import java.util.List;

public interface StrawMapper{

    /**
     * 查询所有的麦管记录
     * @return
     */
    List<StrawDTO> selectAllStraw();

}
