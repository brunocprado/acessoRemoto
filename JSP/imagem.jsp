<%@page import="java.io.OutputStream"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.DataInputStream"%>
<%@ page import="java.io.FileInputStream"%>
<%@ page import="java.io.OutputStream"%>
<%@ page import="java.io.File"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<% 
    response.addHeader("Access-Control-Allow-Origin", "*"); 
    if (request.getParameter("arq") != null) { 
        

      String filename = request.getParameter("arq");

      String mimeType = "image/jpeg";

      response.setContentType(mimeType);

      File file = new File(filename);

      response.setContentLength((int)file.length());


      FileInputStream in  = new FileInputStream(file);

      OutputStream saida = response.getOutputStream();


      byte[]  buf   = new byte[1024];

      int     count = 0;

      while ((count = in.read(buf)) >= 0) {

        saida.write(buf, 0, count);

      }

      in .close();
      saida.close();        
        
    } 
%> 
