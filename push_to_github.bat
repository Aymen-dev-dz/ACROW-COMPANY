@echo off
title Publication vers GitHub Aymen-dev-dz/ACROW-COMPANY
cd /d "C:\Users\a.stock\Desktop\COMPANY ACROW"
echo =======================================================
echo Envoi du site vers https://github.com/Aymen-dev-dz/ACROW-COMPANY
echo =======================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo =======================================================
    echo [SUCCES] Votre site est en ligne sur GitHub !
    echo https://github.com/Aymen-dev-dz/ACROW-COMPANY
    echo =======================================================
) else (
    echo [ATTENTION] Verifiez vos identifiants GitHub ci-dessus.
)
echo.
pause
