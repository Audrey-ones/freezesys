package com.sery.freezesys.service;

import com.sery.freezesys.model.Straw;
import com.sery.freezesys.model.StrawDTO;

import java.util.List;
import java.util.Map;

public interface StrawService {

    /**
     * 获取所有的麦管记录
     * @return
     */
    List<StrawDTO> getStrawList();

    /**
     * 新增一条麦管记录
     * @param strawDTO
     * @return
     */
    int addStraw(StrawDTO strawDTO,int addType);

    /**
     * 修改解冻状态
     * @param straws
     * @return
     */
    int updateFreezeStatus(Straw straws) throws Exception;

    /**
     * 根据麦管Id查找麦管信息
     * @param strawId
     * @return
     */
    Straw getStrawById(int strawId);

    /**
     * 更新麦管信息
     * @param strawDTO
     * @param patientId
     * @param divepipeId
     * @return
     */
    int updateStraw(StrawDTO strawDTO,int patientId,int divepipeId);

    /**
     * 获取主页的参数
     * @return
     */
    Map getCount();
}
