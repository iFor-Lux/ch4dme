<?php
// Verificar que PHP está funcionando
header('Content-Type: text/html');

// Leer archivos
$css = @file_get_contents('styles.css');
$js = @file_get_contents('script.js');
$html = @file_get_contents('index.html');

// Si hay algún error leyendo los archivos, usar valores por defecto
if (!$css) $css = '';
if (!$js) $js = '';
if (!$html) $html = '<div class="error">Error al cargar la página</div>';

// Codificar el HTML para que no se vea en el inspector
$protected_html = base64_encode($html);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Metadatos básicos -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lux._ez - @Luxuryregedit</title>
    <meta name="description" content="✅ Somos @Luxuryregedit, una empresa con más de 5 años de experiencia en el mercado, entregando el mejor producto al menor precio posible.">
    <meta name="keywords" content="Luxury, regedit, gaming, Free Fire, hacks, modmenu">
    <meta name="author" content="Luxury">
    <!-- Open Graph (Facebook, WhatsApp, Discord) -->
    <meta property="og:title" content="Lux._ez - @Luxuryregedit">
    <meta property="og:description" content="✅ Somos @Luxuryregedit, una empresa con más de 5 años de experiencia en el mercado, entregando el mejor producto al menor precio posible.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ch4d.me/">
    <meta property="og:image" content="https://r2.guns.lol/a686098f-fa5e-4041-995b-4299d6e5b99d.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Lux._ez - @Luxuryregedit">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Lux._ez - @Luxuryregedit">
    <meta name="twitter:description" content="✅ Somos @Luxuryregedit, una empresa con más de 5 años de experiencia en el mercado, entregando el mejor producto al menor precio posible.">
    <meta name="twitter:image" content="https://r2.guns.lol/a686098f-fa5e-4041-995b-4299d6e5b99d.jpg">
    <meta name="twitter:site" content="@Lux._ez">
    <style><?php echo $css; ?></style>
    <script><?php echo $js; ?></script>
    <script src="block.js"></script>
</head>
<body>
    <!-- NO RATAS LLAMADAS ANDREZIM ZZZ - BY @Lux._ez -->
    <div id="protected-content"></div>
    <script>
        // BY @Lux._ez
        document.getElementById('protected-content').innerHTML = atob('<?php echo $protected_html; ?>');
    </script>
</body>
</html>