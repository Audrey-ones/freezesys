package com.sery.freezesys.dao;

import com.sery.freezesys.model.Straw;
import com.sery.freezesys.model.StrawDTO;

import java.util.List;
import java.util.Map;

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

    /**
     * 更新解冻状态
     * @param map
     * @return
     */
    int updataFreezeStatus(Map map);

    /**
     * 根据麦管ID查找麦管记录
     * @param strawId
     * @return
     */
    Straw getStrawById(int strawId);

}
