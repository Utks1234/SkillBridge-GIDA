@echo off
title Push SkillBridge GIDA to GitHub
cd /d "%~dp0"
echo ========================================================
echo  SkillBridge GIDA (Kausal Setu GIDA)
echo  Deploy to GitHub: https://github.com/Utks1234/SkillBridge-GIDA
echo ========================================================
echo.
echo Pushing commits to GitHub branch: main...
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Project successfully pushed to GitHub!
    echo URL: https://github.com/Utks1234/SkillBridge-GIDA
) else (
    echo [ERROR] Failed to push to GitHub.
)
echo.
pause
