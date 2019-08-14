-- Vista para obtener la lista de los platillos
CREATE OR REPLACE VIEW lista_platillos AS 
SELECT platillos.id_platillo, platillos.id_local, platillos.nombre_platillo, platillos.precio, platillos.tiempo_preparacion,
platillos.cantidad, platillos.descripcion, platillos.id_estado, 
IFNULL (imagen_platillo.ubicacion_imagen, 'No existe imagen') AS ubicacion_imagen
FROM platillos
INNER JOIN imagen_platillo ON platillos.id_platillo = imagen_platillo.id_platillo GROUP BY id_platillo;