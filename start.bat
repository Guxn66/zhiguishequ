@echo off
set JAVA_HOME=C:\Users\Guxn\Downloads\jdk-17.0.17+10
set PATH=%JAVA_HOME%\bin;%PATH%
set MAVEN_HOME=C:\Users\Guxn\Downloads\apache-maven-3.9.8
cd /d C:\Users\Guxn\Desktop\新版小程序\backend-springboot
call %MAVEN_HOME%\bin\mvn.cmd spring-boot:run
pause

