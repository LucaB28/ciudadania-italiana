@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================
echo   SUBIR EL SITIO A GITHUB
echo ============================================
echo.
echo Si aparece una ventana pidiendo iniciar sesion
echo en GitHub, autorizala. Solo pasa la primera vez.
echo.

echo [1/3] Guardando los cambios...
git add -A
git diff --cached --quiet && (
  echo       Sin cambios nuevos para guardar.
) || (
  git commit -m "Actualizacion del sitio" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
  echo       Cambios guardados.
)
echo.

echo [2/3] Trayendo lo que haya en GitHub...
git pull --rebase origin main
if errorlevel 1 goto error
echo.

echo [3/3] Subiendo...
git push -u origin main
if errorlevel 1 goto error

echo.
echo ============================================
echo   LISTO. Ya esta en GitHub.
echo   Netlify va a publicar el sitio en 1-2 min.
echo ============================================
goto fin

:error
echo.
echo ============================================
echo   ALGO FALLO. Copia el texto de arriba
echo   y pasaselo a Claude.
echo ============================================

:fin
echo.
pause
