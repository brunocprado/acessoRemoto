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

      response.setContentType("application/octet-stream");
      response.setHeader("Content-Disposition","attachment;filename=" + filename);
      
      File file = new File(filename);
      FileInputStream in = new FileInputStream(file);
     // response.setContentLength((int)file.length());
      OutputStream saida = response.getOutputStream();

      byte[] outputByte = new byte[4096];
        //copy binary contect to output stream
        while(in.read(outputByte, 0, 4096) != -1)
        {
                saida.write(outputByte, 0, 4096);
        }
        in.close();
        saida.flush();
        saida.close();     
        
    } 
%> 
