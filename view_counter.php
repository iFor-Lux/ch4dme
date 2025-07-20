<?php
// Configuración inicial
$counter_file = __DIR__ . '/view_count.txt';
$lock_file = __DIR__ . '/view_count.lock';

// Función para obtener el lock
function acquireLock($lock_file) {
    $fp = fopen($lock_file, 'w');
    if (flock($fp, LOCK_EX)) {
        return $fp;
    }
    return false;
}

// Función para liberar el lock
function releaseLock($fp) {
    flock($fp, LOCK_UN);
    fclose($fp);
}

// Intentar obtener el lock
$lock = acquireLock($lock_file);
if ($lock) {
    try {
        // Verificar si el archivo existe
        if (!file_exists($counter_file)) {
            file_put_contents($counter_file, '0');
        }
        
        // Leer el contador actual
        $current_count = (int)file_get_contents($counter_file);
        
        // Incrementar el contador
        $current_count++;
        
        // Guardar el nuevo valor
        file_put_contents($counter_file, $current_count);
        
        // Retornar el nuevo valor
        echo $current_count;
    } finally {
        // Liberar el lock
        releaseLock($lock);
    }
} else {
    // Si no se puede obtener el lock, retornar el valor actual
    echo file_exists($counter_file) ? file_get_contents($counter_file) : '0';
}
?>
