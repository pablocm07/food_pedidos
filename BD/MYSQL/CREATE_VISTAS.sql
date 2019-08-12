-- Vista para obtener la lista de los platillos
CREATE OR REPLACE VIEW 
lista_platillos AS 
SELECT id_platillo, id_local, nombre_platillo, precio, tiempo_preparacion, cantidad, descripcion, id_estado, 
IFNULL (ubicacion_imagen, 'No existe imagen') AS ubicacion_imagen
FROM platillos pla
INNER JOIN imagen_platillo imp ON pla.id_platillo = imp.id_platillo_img GROUP BY id_platillo;