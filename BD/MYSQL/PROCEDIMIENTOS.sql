use food_pedidos;

-- Procedimiento para verificar si existen los datos de un usuario
DELIMITER //

CREATE PROCEDURE `consultar_usuario` (
    IN _correo_electronico VARCHAR(70),
    IN _contrasena VARCHAR(20)
)  
BEGIN
DECLARE respuesta CHAR(1);

IF ( (SELECT COUNT(*) FROM usuarios u WHERE u.correo_electronico = _correo_electronico AND contrasena = _contrasena) = 1) then
    SELECT * FROM usuarios WHERE correo_electronico = _correo_electronico AND contrasena = _contrasena;    
else
    SET respuesta = 0;
    SELECT respuesta;
end IF;
END//

DELIMITER ;

-- Procedimiento que registra y obtiene los datos de un nuevo usuario

DELIMITER //

CREATE PROCEDURE `registrar_usuario`(
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

END//

DELIMITER ;

-- Procedimiento para cambiar los datos de un usuario
DELIMITER //

CREATE PROCEDURE `modificar_usuario` (
    _id_usuario INT(10),
    _nombre VARCHAR (50),
    _apellido VARCHAR (50),
    _no_telefonico CHAR (10),    
    _correo_electronico VARCHAR (20) 
)  
BEGIN
DECLARE respuesta CHAR(1);

    UPDATE usuarios SET nombre = _nombre, apellido = _apellido, no_telefonico = _no_telefonico, correo_electronico = _correo_electronico
    WHERE id_usuario = _id_usuario;
    SET respuesta = 1;
    SELECT respuesta;
END//

DELIMITER ;

-- Procedimiento para verificar si existe ya un pedido, si no que lo registre
DELIMITER //

CREATE OR REPLACE PROCEDURE `agregar_pedido` (
    IN _id_local INT(10),
    IN _id_usuario INT(10)
)  
BEGIN
DECLARE id_pedido INT(10);
DECLARE nuevo_pedido INT(10);
DECLARE precio_existente DECIMAL(5,2);

IF ( (SELECT COUNT(*) FROM pedidos p WHERE p.id_local = _id_local AND p.id_usuario = _id_usuario AND p.id_estado = 10) = 1) then
    SET id_pedido = (SELECT p.id_pedido FROM pedidos p WHERE p.id_local = _id_local AND p.id_usuario = _id_usuario AND p.id_estado = 10);
    SET precio_existente = (SELECT p.precio FROM pedidos p WHERE p.id_local = _id_local AND p.id_usuario = _id_usuario AND p.id_estado = 10);
    SET nuevo_pedido = 0;
else
    INSERT INTO pedidos (id_local, id_usuario, id_estado)
    VALUES (_id_local, _id_usuario, 8);
    SET id_pedido = (SELECT last_insert_id());
    SET precio_existente = (SELECT p.precio FROM pedidos p WHERE p.id_pedido = id_pedido);
    SET nuevo_pedido = 1;
end IF;
    SELECT id_pedido, nuevo_pedido, precio_existente;
END//

DELIMITER ;

-- Procedimiento que registra el 'Detalle Pedido' y obtiene el id_detalle insertado

DELIMITER //

CREATE OR REPLACE PROCEDURE `registrar_detalle_pedido`(
    _id_platillo INT (10),
    _id_pedido INT (10),
    _precio_subtotal DECIMAL (5, 2),
    _comentarios VARCHAR (80),
    _id_estado INT (10)
)
BEGIN

DECLARE id_detalle_pedido INT(10);

	INSERT INTO detalle_pedido (id_platillo, id_pedido, precio_subtotal, comentarios, id_estado)
    VALUES (_id_platillo, _id_pedido, _precio_subtotal, _comentarios, _id_estado);
    SET id_detalle_pedido = (SELECT last_insert_id());
    SELECT id_detalle_pedido;

END//

DELIMITER ;

-- Procedimiento que registra el 'Detalle Pedido' y obtiene el id_detalle insertado

DELIMITER //

CREATE OR REPLACE PROCEDURE `agregar_detalle_ingrediente`(
    _id_detalle_pedido INT (10),
    _id_ingrediente INT (10)
)
BEGIN

DECLARE id_detalle_ingrediente INT(10);

	INSERT INTO detalle_ingredientes (id_detalle_pedido, id_ingrediente)
    VALUES (_id_detalle_pedido, _id_ingrediente);
    SET id_detalle_ingrediente = (SELECT last_insert_id());
    SELECT id_detalle_ingrediente;

END//

DELIMITER ;