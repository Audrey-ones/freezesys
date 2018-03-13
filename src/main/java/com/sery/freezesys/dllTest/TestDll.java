package com.sery.freezesys.dllTest;

import com.sun.jna.Library;
import com.sun.jna.Native;

import java.io.UnsupportedEncodingException;

/**
 * @class:PrintBarcodeUtil
 *@descript:java使用编程接口打印条形码
 *@version:V1.0
 */
public class TestDll {
    //加载库文件
    private static final String LOAD_LIBRARY="TSCLIB";
    //打印机型号
    private static final String print_model="Brady BBP12 #2";

    /**
     * @class:TscLibDll
     *@descript:创建TSCLIB.dll编程接口
     *动态链接库TSCLIB.dll，支持大部分佳博打印机，和其他品牌的TSC系列的打印机
     *@date:2016年12月8日 下午2:03:55
     *@version:V1.0
     */
    public interface TscLibDll extends Library {
        TscLibDll INSTANCE = (TscLibDll) Native.loadLibrary ("TSCLIB", TscLibDll.class);
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
        TscLibDll.INSTANCE.openport(print_model);
        //TscLibDll.INSTANCE.downloadpcx("C:\\UL.PCX", "UL.PCX");
        //TscLibDll.INSTANCE.sendcommand("REM ***** This is a test by JAVA. *****");
        //TscLibDll.INSTANCE.setup("100", "60", "5", "8", "0", "0", "0");
        TscLibDll.INSTANCE.setup("25.34", "9.5", "5", "8", "0", "3.1", "0");
        TscLibDll.INSTANCE.clearbuffer();
        //TscLibDll.INSTANCE.printerfont ("100", "10", "3", "0", "1", "1", text);
        TscLibDll.INSTANCE.barcode("100", "55", "128", "40", "0", "0", "2", "2", message);
        //TscLibDll.INSTANCE.windowsfont(100, 10, 28, 0, 3, 0, "Arial", text);
        TscLibDll.INSTANCE.windowsfont(100, 5, 30, 0, 3, 0, "Arial", text1);
        TscLibDll.INSTANCE.windowsfont(100, 30, 28, 0, 3, 0, "Arial", text2);
        TscLibDll.INSTANCE.printlabel("1", "1");
        TscLibDll.INSTANCE.closeport();

        /*//加载驱动
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
        TestDll.TscLibDll.INSTANCE.barcode("100", "40", "128", "50", "1", "0", "2", "2", message);
        TestDll.TscLibDll.INSTANCE.windowsfont(100, 10, 28, 0, 3, 0, "Arial", text);
        TestDll.TscLibDll.INSTANCE.printlabel("1", "1");
        TestDll.TscLibDll.INSTANCE.closeport();*/
    }

    //测试
    public static void main(String[] args) {
        /*List<String> list=new ArrayList<String>();
        list.add("KJ4.1-0127-0001(001)");
        list.add("KJ4.1-0128-0001(001)");
        list.add("KJ4.1-0129-0001(001)");
        list.add("KJ4.1-0130-0001(001)");
        if(list!=null && list.size()>0){
            for(String message:list){
                printBarcode(message,"苏交科");
            }
        }*/
        String text1 = "F1964-2 苏交科";
        String time = "a管2枚2018-03-13 15:01:34";
        String[] text2 = time.split(" ");
        String message = String.valueOf(System.currentTimeMillis());
        printBarcode(message,text1,text2[0]);
        System.out.println("打印成功");
        System.out.println(text2[0]);
    }
}

/*public class TestDll {
    public interface TscLibDll extends Library {
        TscLibDll INSTANCE = (TscLibDll) Native.loadLibrary ("TSCLIB", TscLibDll.class);
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

    public static void main(String[] args) {
        //解决中文乱码
        System.setProperty("jna.encoding", "GBK");
        String a = "F1254";
        String b = "李先生";
        String c = "DD123";
        String timestamp = String.valueOf(System.currentTimeMillis());
        //TscLibDll.INSTANCE.about();
        TscLibDll.INSTANCE.openport("Brady BBP12 #2");
        //TscLibDll.INSTANCE.downloadpcx("C:\\UL.PCX", "UL.PCX");
        TscLibDll.INSTANCE.sendcommand("REM ***** This is a test by JAVA. *****");
        TscLibDll.INSTANCE.setup("25.34", "9.5", "5", "8", "0", "3.1", "0");
        TscLibDll.INSTANCE.clearbuffer();
        //TscLibDll.INSTANCE.sendcommand("PUTPCX 550,10,\"UL.PCX\"");
        TscLibDll.INSTANCE.printerfont ("100", "10", "3", "0", "1", "1", a+""+b+""+c);
        TscLibDll.INSTANCE.barcode("100", "40", "128", "50", "0", "0", "2", "2", timestamp);
        TscLibDll.INSTANCE.windowsfont(10, 500, 60, 0, 0,0, "arial", "标楷体字型");
        TscLibDll.INSTANCE.windowsfont(10, 500, 60, 90, 0,0, "arial", "标楷体字型");
        TscLibDll.INSTANCE.windowsfont(400, 200, 48, 0, 3, 0, "arial", "DEG 0");
        TscLibDll.INSTANCE.windowsfont(400, 200, 48, 90, 3, 0, "arial", "DEG 90");
        TscLibDll.INSTANCE.windowsfont(400, 200, 48, 180, 3, 0, "arial", "DEG 180");
        TscLibDll.INSTANCE.windowsfont(400, 200, 48, 270, 3, 0, "arial", "DEG 270");
        TscLibDll.INSTANCE.printlabel("1", "1");
        TscLibDll.INSTANCE.closeport();

    }

}*/
