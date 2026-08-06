Add-Type -AssemblyName System.Drawing

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'ClearTypeGridFit'

# papel
$carta = [System.Drawing.ColorTranslator]::FromHtml('#FAF9F3')
$g.Clear($carta)

# rayado del formulario
$rayado = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(13, 74, 90, 124)), 1
for ($y = 0; $y -lt $H; $y += 32) { $g.DrawLine($rayado, 0, $y, $W, $y) }

# filete tricolor superior
$verde = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#238B45'))
$blanco = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$rojo  = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#A3352B'))
$g.FillRectangle($verde, 0, 0, [int]($W/3), 10)
$g.FillRectangle($blanco, [int]($W/3), 0, [int]($W/3), 10)
$g.FillRectangle($rojo, [int]($W*2/3), 0, [int]($W/3), 10)

$ink    = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#1B1A15'))
$modulo = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#4A5A7C'))
$muted  = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#5F5C50'))
$timbro = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#4B3A8C'))

$fMarca  = New-Object System.Drawing.Font('Consolas', 17, [System.Drawing.FontStyle]::Bold)
$fTitulo = New-Object System.Drawing.Font('Arial Black', 60, [System.Drawing.FontStyle]::Regular)
$fSub    = New-Object System.Drawing.Font('Segoe UI', 23, [System.Drawing.FontStyle]::Regular)
$fSello  = New-Object System.Drawing.Font('Consolas', 16, [System.Drawing.FontStyle]::Bold)

$g.DrawString('CIUDADANÍA ITALIANA  ·  URUGUAY', $fMarca, $modulo, 72, 62)

$g.DrawString('¿Te corresponde?', $fTitulo, $ink, 64, 118)
$g.DrawString('Averigualo en 2 min.', $fTitulo, $ink, 64, 212)

$g.DrawString('Qué documentos te faltan, cuáles apostillar y cuáles', $fSub, $muted, 72, 330)
$g.DrawString('traducir — con la ley vigente después de la reforma.', $fSub, $muted, 72, 368)

# sellos de estado
$sellos = @('TEST DE ELEGIBILIDAD', 'TRACKER DE DOCUMENTOS', 'GUÍA URUGUAY')
$x = 72
foreach ($s in $sellos) {
  $tam = $g.MeasureString($s, $fSello)
  $ancho = [int]$tam.Width + 26
  $lapiz = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#4B3A8C')), 2
  $g.DrawRectangle($lapiz, $x, 456, $ancho, 44)
  $g.DrawString($s, $fSello, $timbro, ($x + 13), 468)
  $x += $ancho + 18
}

# banderas: Italia y Uruguay, abajo a la derecha
function Draw-Flag($px, $py, $w, $h, $tipo) {
  $borde = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(80, 27, 26, 21)), 1
  if ($tipo -eq 'it') {
    $g.FillRectangle($verde,  $px, $py, [int]($w/3), $h)
    $g.FillRectangle($blanco, ($px + [int]($w/3)), $py, [int]($w/3), $h)
    $g.FillRectangle($rojo,   ($px + [int]($w*2/3)), $py, [int]($w/3), $h)
  } else {
    $azul = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#0038A8'))
    $oro  = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#D9A404'))
    $g.FillRectangle($blanco, $px, $py, $w, $h)
    $franja = [int]($h / 9)
    for ($i = 1; $i -lt 9; $i += 2) { $g.FillRectangle($azul, $px, ($py + $i * $franja), $w, $franja) }
    $cantonW = [int]($w * 10 / 27); $cantonH = [int]($h * 10 / 18)
    $g.FillRectangle($blanco, $px, $py, $cantonW, $cantonH)
    $r = [int]($cantonH / 4)
    $g.FillEllipse($oro, ($px + [int]($cantonW/2) - $r), ($py + [int]($cantonH/2) - $r), (2*$r), (2*$r))
  }
  $g.DrawRectangle($borde, $px, $py, $w, $h)
}
Draw-Flag 960 452 90 60 'it'
Draw-Flag 1064 452 90 60 'uy'

# pie
$fPie = New-Object System.Drawing.Font('Consolas', 14, [System.Drawing.FontStyle]::Regular)
$g.DrawString('Ley 74/2025 al día  ·  gratis  ·  sitio no oficial', $fPie, $muted, 72, 552)

$salida = Join-Path $PSScriptRoot 'og.png'
$bmp.Save($salida, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "OG generada: $salida"


