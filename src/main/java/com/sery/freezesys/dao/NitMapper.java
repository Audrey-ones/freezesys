package com.sery.freezesys.dao;

import com.sery.freezesys.model.Divepipe;
import com.sery.freezesys.model.Nit;
import com.sery.freezesys.model.Tub;

import java.util.List;
import java.util.Map;

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
     * 根据液氮罐编号查询和该液氮罐关联的所有吊桶
     * @param nitId
     * @return
     */
    List<Tub> selectAllTubsByNitId(int nitId);

    /**
     * 根据液氮罐编号，吊桶编号，套管编号查询套管Id
     * @param map
     * @return
     */
    Divepipe selectDivepipeId(Map map);

    /**
     * 插入一条液氮罐记录
     * @param nit
     * @return
     */
    int insertNit(Nit nit);

    /**
     * 插入一条吊桶记录
     * @param tub
     * @return
     */
    int insertTub(Tub tub);

    /**
     * 插入一条套管记录
     * @param divepipe
     * @return
     */
    int insertDivepipe(Divepipe divepipe);

    /**
     * 修改一条液氮罐记录
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
     * 根据液氮罐Id删除该液氮罐下的所有吊桶
     * @param nitId
     * @return
     */
    int deleteTub(int nitId);

    /**
     * 根据吊桶ID删除该吊桶关联的所有套管记录
     * @param tubId
     * @return
     */
    int deleteDivepipe(int tubId);

}
