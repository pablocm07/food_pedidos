-- Vista para obtener la lista de los platillos
CREATE OR REPLACE VIEW lista_platillos AS 
SELECT platillos.id_platillo, platillos.id_local, platillos.nombre_platillo, platillos.precio, platillos.tiempo_preparacion,
platillos.cantidad, platillos.descripcion, platillos.id_estado, 
IFNULL (imagen_platillo.ubicacion_imagen, 'No existe imagen') AS ubicacion_imagen
FROM platillos
INNER JOIN imagen_platillo ON platillos.id_platillo = imagen_platillo.id_platillo GROUP BY id_platillo;



--VISTA PARA VER LOS DETALLES DEL PEDIDO
CREATE OR REPLACE VIEW Detalle_Pedidos AS
SELECT estados.estado,detalle_pedido.id_pedido, COUNT(detalle_pedido.id_detalle_pedido) AS no_platillos, 
pedidos.id_local, 
(select DATE_ADD(NOW(),INTERVAL SUM(platillos.tiempo_preparacion) MINUTE)) AS finalizacion_pedido,
usuarios.nombre, usuarios.apellido
FROM detalle_pedido 
INNER JOIN platillos ON detalle_pedido.id_platillo = platillos.id_platillo
INNER JOIN pedidos ON detalle_pedido.id_pedido = pedidos.id_pedido
INNER JOIN estados ON pedidos.id_estado = estados.id_estado
INNER JOIN usuarios ON usuarios.id_usuario = pedidos.id_usuario
WHERE pedidos.id_estado = 5 AND pedidos.id_local = '1'
GROUP BY detalle_pedido.id_pedido;