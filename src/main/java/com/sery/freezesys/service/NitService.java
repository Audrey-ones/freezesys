package com.sery.freezesys.service;

import com.sery.freezesys.model.Nit;
import com.sery.freezesys.model.NitDTO;

import java.util.List;

public interface NitService {
    /**
     * 获取所有的液氮罐
     * @return list
     */
    List<Nit> getNitList();

    /**
     * 新增一个液氮罐
     * @param nit
     * @return
     */
    int addNit(Nit nit);

    /**
     * 根据一个液氮罐初始化新增吊桶
     * @param nitId
     * @param tubAmount
     * @param divepipeAmount
     * @param strawAmount
     */
    void addTub(int nitId,int tubAmount, int divepipeAmount, int strawAmount);

    /**
     * 根据每个套管初始化新增麦管
     * @param divepipeAmount
     * @param strawAmount
     * @param tubId
     */
    void addDivepipe(int divepipeAmount, int strawAmount, int tubId);

    /**
     * 根据ID编辑液氮罐
     * @param nit
     * @return
     */
    int updateNit(Nit nit);

    /**
     * 根据液氮罐Id删除一条液氮罐信息
     * @param nitId
     * @return
     */
    int deleteNit(int nitId);

    /**
     * 根据液氮罐Id获取液氮罐
     * @param nitId
     * @return
     */
    Nit getNitById(int nitId);

    /**
     * 根据套管ID获取液氮罐编号，吊桶编号，套管编号
     * @param divepipeId
     * @return
     */
    NitDTO getNumByDivepipeId(int divepipeId);

    /**
     * 查找所有的套管
     * @return
     */
    List<NitDTO> getAllDivepipe();

    List<NitDTO> getDivepipesByFlagNum(int flagNum);

}
