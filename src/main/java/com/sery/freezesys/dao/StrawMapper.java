package com.sery.freezesys.dao;

import com.sery.freezesys.model.Straw;
import com.sery.freezesys.model.StrawDTO;

import java.util.List;

public interface StrawMapper{

    /**
     * 查询所有的麦管记录
     * @return
     */
    List<StrawDTO> selectAllStraw();

    /**
     * 插入一条麦管记录
     * @param straw
     * @return
     */
    int insertStraw(Straw straw);

}
