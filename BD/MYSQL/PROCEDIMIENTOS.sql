-- Procedimiento para verificar si existen los datos de un usuario
DELIMITER //

CREATE PROCEDURE `consultar_usuario` (
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

-- Procedimiento para insertar unu nuevo ingrediente
DELIMITER //

CREATE PROCEDURE `insertar_nuevo_ingrediente` (    
    _nombre_ingrediente VARCHAR (30),
    _precio_ingrediente FLOAT,
    _id_local INT (10)
)  
BEGIN
DECLARE respuesta VARCHAR(10);

    INSERT INTO ingredientes (id_ingrediente, nombre, precio, id_local, id_estado) VALUES (NULL, _nombre_ingrediente, _precio_ingrediente, _id_local, '1');
    SET respuesta = 'Registrado';
    SELECT respuesta;
END//

DELIMITER ;