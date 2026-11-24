@echo off
title SkillBridge GIDA - 3D Platform Launcher
cd /d "%~dp0"
echo ========================================================
echo  SkillBridge GIDA (Kausal Setu GIDA)
echo  Project Lead: Utkarsh Vishwakarma
echo  GIDA DIVAS HACKATHON 2026 - Theme 11
echo ========================================================
echo.
echo Starting local web server...
start http://localhost:3000
npm run preview -- --port 3000 --host
pause
