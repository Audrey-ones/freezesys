package com.sery.freezesys.utils;

import com.sery.freezesys.dllTest.TestDll;
import com.sun.jna.Library;
import com.sun.jna.Native;

public class TscLibDllUtil {
    //加载库文件
    private static final String LOAD_LIBRARY="TSCLIB";
    //打印机型号
    private static final String print_model="Brady BBP12 #2";

    /**
     * @class:TscLibDll
     *@descript:创建TSCLIB.dll编程接口
     *动态链接库TSCLIB.dll，支持大部分品牌的TSC系列的打印机
     *@version:V1.0
     */
    public interface TscLibDll extends Library {
        TestDll.TscLibDll INSTANCE = (TestDll.TscLibDll) Native.loadLibrary ("TSCLIB", TestDll.TscLibDll.class);
        int about ();
        int openport (String pirnterName);
        int closeport ();
        int sendcommand (String printerCommand);
        int setup (String width,String height,String speed,String density,String sensor,String vertical,String offset);
        int downloadpcx (String filename,String image_name);
        int barcode (String x,String y,String type,String height,String readable,String rotation,String narrow,String wide,String code);
        int printerfont (String x,String y,String fonttype,String rotation,String xmul,String ymul,String text);
        int clearbuffer ();
        int printlabel (String set, String copy);
        int formfeed ();
        int nobackfeed ();
        int windowsfont (int x, int y, int fontheight, int rotation, int fontstyle, int fontunderline, String szFaceName, String content);
    }

    public static void printBarcode(String message,String text1,String text2){
        //加载驱动
        System.loadLibrary(LOAD_LIBRARY);
        //解决中文乱码
        System.setProperty("jna.encoding", "GBK");
        //TscLibDll.INSTANCE.about();
        TestDll.TscLibDll.INSTANCE.openport(print_model);
        //TscLibDll.INSTANCE.downloadpcx("C:\\UL.PCX", "UL.PCX");
        //TscLibDll.INSTANCE.sendcommand("REM ***** This is a test by JAVA. *****");
        //TscLibDll.INSTANCE.setup("100", "60", "5", "8", "0", "0", "0");
        TestDll.TscLibDll.INSTANCE.setup("25.34", "9.5", "5", "8", "0", "3.1", "0");
        TestDll.TscLibDll.INSTANCE.clearbuffer();
        //TscLibDll.INSTANCE.printerfont ("100", "10", "3", "0", "1", "1", text);
        TscLibDll.INSTANCE.barcode("100", "55", "128", "40", "0", "0", "2", "2", message);
        TscLibDll.INSTANCE.windowsfont(100, 5, 30, 0, 3, 0, "Arial", text1);
        TscLibDll.INSTANCE.windowsfont(100, 30, 28, 0, 3, 0, "Arial", text2);
        TestDll.TscLibDll.INSTANCE.printlabel("1", "1");
        TestDll.TscLibDll.INSTANCE.closeport();
    }

    //测试
    /*public static void main(String[] args) {
        String text = "F1964+苏交科+a管";
        String message = String.valueOf(System.currentTimeMillis());
        printBarcode(message,text);
        System.out.println("打印成功");
    }*/
}
