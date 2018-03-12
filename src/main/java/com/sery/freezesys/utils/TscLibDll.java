package com.sery.freezesys.utils;

import com.sun.jna.Library;
import com.sun.jna.Native;

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
