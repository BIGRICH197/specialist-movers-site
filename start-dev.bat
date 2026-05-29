@echo off
cd /d "%~dp0"
echo Clearing port 3010...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3010 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul
echo Starting dev server on http://localhost:3010
echo Keep this window open. Press Ctrl+C to stop.
call npm run dev:3010
pause
