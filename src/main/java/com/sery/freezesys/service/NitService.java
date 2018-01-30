package com.sery.freezesys.service;

import com.sery.freezesys.model.Nit;

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
     * 根据ID编辑液氮罐
     * @param nit
     * @return
     */
    int updateNit(Nit nit);

}
