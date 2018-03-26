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

    /**
     * 更新麦管信息
     * @param straw
     * @return
     */
    int updateStrawInfo(Straw straw);

    /**
     * 查询麦管记录总数
     * @return
     */
    int selectStrawCount();

    /**
     * 根据病人Id删除该病人ID的所有麦管记录
     * @param patientId
     * @return
     */
    int deleteStrawByPatientId(int patientId);

    /**
     * 根据病人Id获取该病人的所有麦管记录
     * @param patientId
     * @return
     */
    List<Straw> getStrawByPatientId(int patientId);

    /**
     * 根据条形码查找麦管记录
     * @param barcodeNum
     * @return
     */
    StrawDTO getStrawByBarcodeNum(String barcodeNum);

    /**
     * 根据麦管记录获取麦管记录
     * @param strawId
     * @return
     */
    StrawDTO getStrawByStrawId(int strawId);
}
