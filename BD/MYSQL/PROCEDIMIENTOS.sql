DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `consultar_usuario` (
    IN _correo_electronico VARCHAR(70),
    IN _contrasena VARCHAR(20)
)  
BEGIN
DECLARE respuesta CHAR(1);

IF ( (SELECT COUNT(*) FROM usuarios u WHERE u.correo_electronico = _correo_electronico) = 1) then
    SELECT * FROM usuarios WHERE correo_electronico = _correo_electronico AND contrasena = _contrasena;    
else
    SET respuesta = 0;
    SELECT respuesta;
end IF;
END

DELIMITER ;

DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `registrar_usuario`(
    _nombre VARCHAR (50),
    _apellido VARCHAR (50),
    _no_telefonico CHAR (10),
    _tipo_usuario CHAR (1),
    _correo_electronico VARCHAR (20),
    _contrasena VARCHAR (20)
)
BEGIN
DECLARE id_usuario INT(10);
DECLARE nombre VARCHAR(50);
DECLARE apellido VARCHAR(50);
DECLARE no_telefonico CHAR(10);
DECLARE tipo_usuario CHAR(1);
DECLARE correo_electronico VARCHAR(70);
DECLARE contrasena VARCHAR(20);

	INSERT INTO usuarios (nombre, apellido, no_telefonico, tipo_usuario, correo_electronico, contrasena)
    VALUES (_nombre, _apellido, _no_telefonico, _tipo_usuario, _correo_electronico, _contrasena);
    SET id_usuario = (SELECT last_insert_id());
    SET nombre = _nombre;
    SET apellido = _apellido;
    SET no_telefonico = _no_telefonico;
    SET tipo_usuario = _tipo_usuario;
    SET correo_electronico = _correo_electronico;
    SET contrasena = _contrasena;
    SELECT id_usuario, nombre, apellido, no_telefonico, tipo_usuario,correo_electronico, contrasena;

END

DELIMITER ;

INSERT INTO platillos (id_local, nombre_platillo, precio, tiempo_preparacion, cantidad, descripcion, id_estado)
VALUES
(1, 'Guajolotes', 10.00, 10, 1, 'Freido con manteca, incluye lechuga', 3),
(2, 'Guajolotes', 16.00, 10, 1, 'Freido con aceite, incluye lechuga', 3),
(3, 'Guajolotes', 12.00, 10, 1, 'Freido con manteca', 3),
(1, 'Tacos', 10.00, 8, 5, 'Solo se venden por ordenIncluyen lechuga, queso y crema', 3),
(2, 'Tacos', 15.00, 8, 5, 'Incluyen lechuga, queso y crema', 3),
(3, 'Tacos', 10.00, 8, 3, 'Incluyen lechuga, queso y crema', 3),
(1, 'Quesadillas', 10.00, 5, 1, 'Incluye lechuga y crema', 3),
(2, 'Quesadillas', 8.00, 10, 1, 'Incluye lechuga y crema', 3),
(3, 'Quesadillas', 8.00, 6, 1, 'Incluye lechuga y crema', 3);

INSERT INTO ingredientes (nombre, precio, id_local, id_estado)
VALUES
('Chorizo', 3.00, 1, 1),
('Queso de hebra', 3.00, 1, 1),
('Jamon', 3.00, 1, 1),
('Pollo', 3.00, 1, 1),
('Huevo', 3.00, 1, 1),
('Milanesa', 3.00, 1, 1),
('Bistec', 3.00, 1, 1),
('Pierna', 3.00, 1, 1),
('Salchicha', 3.00, 1, 1),
('Chorizo', 3.00, 2, 1),
('Queso de hebra', 3.00, 2, 1),
('Jamon', 3.00, 2, 1),
('Pollo', 3.00, 2, 1),
('Huevo', 3.00, 2, 1),
('Milanesa', 3.00, 2, 1),
('Bistec', 3.00, 2, 1),
('Pierna', 3.00, 2, 1),
('Salchicha', 3.00, 2, 1),
('Chorizo', 3.00, 3, 1),
('Queso de hebra', 3.00, 3, 1),
('Jamon', 3.00, 3, 1),
('Pollo', 3.00, 3, 1),
('Huevo', 3.00, 3, 1),
('Milanesa', 3.00, 3, 1),
('Bistec', 3.00, 3, 1),
('Pierna', 3.00, 3, 1),
('Salchicha', 3.00, 3, 1);

INSERT INTO detalle_platillo (id_platillo, id_ingrediente)
VALUES
(1, 1),(1, 2),(1, 3),(1, 4),(1, 5),(1, 6),(1, 7),(1, 8),(1, 9),
(4, 2),(4, 3),(4, 4),(4, 9),
(7, 7),(7, 9),(7, 2),(7, 3),
(2, 10),(2, 11),(2, 12),(2, 13),(2, 14),(2, 15),(2, 16),(2, 17),(2, 18),
(5, 11),(5, 12),(5, 13),(5, 18),
(8, 16),(8, 18),(8, 11),(8, 12),
(3, 19),(3, 20),(3, 21),(3, 22),(3, 23),(3, 24),(3, 25),(3, 26),(3, 27),
(6, 20),(6, 21),(6, 22),(6, 27),
(9, 25),(9, 27),(9, 20),(9, 21);

INSERT INTO `usuarios` 
(`id_usuario`, `nombre`, `apellido`, `no_telefonico`, `tipo_usuario`, `correo_electronico`, `contrasena`, `foto_perfil`) 
VALUES 
(NULL, 'locatario', 's/a', '7750180023', '2', 'locatario@', '123', NULL), 
(NULL, 'consumidor', 's/a', '7751698675', '3', 'consumidor@', '123', NULL);

SELECT p.nombre_platillo, p.precio, p.tiempo_preparacion, p.cantidad, p.descripcion FROM platillos p
WHERE p.id_local = 1 AND p.id_estado = 3;