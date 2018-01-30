package com.sery.freezesys.dao;

import com.sery.freezesys.model.Nit;

import java.util.List;

public interface NitMapper{

    /**
     * 查询所有的液氮罐
     * @return
     */
    List<Nit> selectAllNits();

    /**
     * 根据ID查询一条液氮罐记录
     * @param id
     * @return
     */
    Nit selectNitById(int id);

    /**
     * 插入一条液氮罐记录
     * @param nit
     * @return
     */
    int insertNit(Nit nit);

    /**
     * 修改一条液氮罐记录
     * @param nit
     * @return
     */
    int updateNit(Nit nit);

}
