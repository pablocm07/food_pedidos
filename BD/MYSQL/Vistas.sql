-- Vista para obtener la lista de los platillos
CREATE OR REPLACE VIEW lista_platillos AS 
SELECT platillos.id_platillo, platillos.id_local, platillos.nombre_platillo, platillos.precio, platillos.tiempo_preparacion,
platillos.cantidad, platillos.descripcion, platillos.id_estado, 
IFNULL (imagen_platillo.ubicacion_imagen, 'No existe imagen') AS ubicacion_imagen
FROM platillos
INNER JOIN imagen_platillo ON platillos.id_platillo = imagen_platillo.id_platillo GROUP BY id_platillo;



--VISTA PARA VER EL PEDIDO 
CREATE OR REPLACE VIEW pedido_general AS
SELECT estados.estado,detalle_pedido.id_pedido, COUNT(detalle_pedido.id_detalle_pedido) AS no_platillos, 
pedidos.id_local,pedidos.id_estado, pedidos.fecha_hora, SUM(platillos.tiempo_preparacion) AS tiempo_total_preparacion,
Date_format((select DATE_ADD(pedidos.fecha_hora,INTERVAL SUM(platillos.tiempo_preparacion) MINUTE)),'%h:%i %p') AS finalizacion_pedido,
CONCAT(usuarios.nombre, ' ',usuarios.apellido) AS nombre_usuario
FROM detalle_pedido 
INNER JOIN platillos ON detalle_pedido.id_platillo = platillos.id_platillo
INNER JOIN pedidos ON detalle_pedido.id_pedido = pedidos.id_pedido
INNER JOIN estados ON pedidos.id_estado = estados.id_estado
INNER JOIN usuarios ON usuarios.id_usuario = pedidos.id_usuario
WHERE pedidos.id_estado IN (5,6,7)
GROUP BY detalle_pedido.id_pedido;

--VISTA PARA VER LOS INGREDIENTES DE UN PLATILLO 
CREATE OR REPLACE VIEW lista_ingredientes AS
SELECT p.id_platillo, p.id_local, p.nombre_platillo, i.id_ingrediente, i.nombre FROM platillos p 
INNER JOIN detalle_platillo dp ON dp.id_platillo = p.id_platillo 
INNER JOIN ingredientes i ON i.id_ingrediente = dp.id_ingrediente;
-- WHERE p.id_local = 1 AND dp.id_platillo = 1



--VISTA PARA VER LOS DETALLES DEL PEDIDO
CREATE OR REPLACE VIEW pedido_especifico AS
SELECT platillos.nombre_platillo, GROUP_CONCAT(ingredientes.nombre) AS ingredientes,
COUNT(detalle_ingredientes.id_detalle_pedido) AS num_ingredientes, detalle_pedido.comentarios, platillos.tiempo_preparacion,
detalle_ingredientes.id_detalle_ingrediente,detalle_ingredientes.id_ingrediente, pedidos.id_local,
detalle_pedido.id_detalle_pedido, detalle_pedido.id_pedido, detalle_pedido.id_estado,
estados.estado
FROM detalle_ingredientes
INNER JOIN detalle_pedido ON detalle_pedido.id_detalle_pedido = detalle_ingredientes.id_detalle_pedido
INNER JOIN ingredientes ON ingredientes.id_ingrediente = detalle_ingredientes.id_ingrediente
INNER JOIN estados ON estados.id_estado = detalle_pedido.id_estado
INNER JOIN pedidos ON pedidos.id_pedido = detalle_pedido.id_pedido
INNER JOIN platillos ON platillos.id_platillo = detalle_pedido.id_platillo
WHERE pedidos.id_estado IN (5,6,7)
GROUP BY detalle_pedido.id_detalle_pedido;

SELECT * FROM `pedido_general` WHERE id_local = 1 AND DATE(fecha_hora) = DATE('2019-08-16');
