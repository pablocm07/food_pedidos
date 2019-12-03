DROP DATABASE food_pedidos;

CREATE DATABASE food_pedidos;

USE food_pedidos;

CREATE TABLE tipo_usuarios(
    id_tipo_usuario INT(2) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    tipo_usuario varchar (20)    
);

CREATE TABLE usuarios (
    id_usuario INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(50) NULL,
    apellido VARCHAR(50) NULL,
    no_telefonico CHAR(10) NULL,
    id_tipo_usuario INT(2) ZEROFILL NULL,
    correo_electronico VARCHAR(70) NULL,
    contrasena VARCHAR(20) NULL,
    foto_perfil VARCHAR(100) NULL,
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuarios(id_tipo_usuario)
);

CREATE TABLE estados (
    id_estado int (10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    estado varchar (20)    
);

CREATE TABLE locales (
    id_local INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre_local VARCHAR(50),
    tipo_local VARCHAR(50),
    foto_logo VARCHAR(80),
    descripcion VARCHAR(80),
    horario_abrir CHAR(5),
    horario_cerrar CHAR(5),  
    id_estado INT(10) ZEROFILL NOT NULL, 
    id_usuario INT(10) ZEROFILL NOT NULL,    
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE ingredientes (
    id_ingrediente INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(30),
    precio DECIMAL(5,2),
    id_local INT(10) ZEROFILL NULL,    
    FOREIGN KEY (id_local) REFERENCES locales (id_local),
);

CREATE TABLE platillos ( 
    id_platillo INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre_platillo VARCHAR(60),
    precio DECIMAL(5,2),
    precio_ing_extra DECIMAL(5,2),
    tiempo_preparacion SMALLINT(4),
    cantidad TINYINT(2),
    descripcion VARCHAR(80),
    id_local INT(10) ZEROFILL NULL,
    id_estado INT(10) ZEROFILL NULL,    
    FOREIGN KEY (id_local) REFERENCES locales (id_local),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE imagen_platillo (
    id_img_platillo INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    ubicacion_imagen VARCHAR(80),
    id_platillo INT(10) ZEROFILL NULL,
    FOREIGN KEY (id_platillo) REFERENCES platillos (id_platillo)
);

CREATE TABLE detalle_platillo (
    id_detalle_platillo INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_platillo INT(10) ZEROFILL NULL,
    id_ingrediente INT(10) ZEROFILL NULL,  
    id_estado INT(10) ZEROFILL NULL,
    FOREIGN KEY (id_platillo) REFERENCES platillos (id_platillo),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes (id_ingrediente),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE pedidos (
    id_pedido INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    precio_total DECIMAL(5,2),
    fecha_hora DATETIME,
    id_local INT(10) ZEROFILL NULL,
    id_usuario INT(10) ZEROFILL NULL,
    id_estado INT(10) ZEROFILL NULL,    
    FOREIGN KEY (id_local) REFERENCES locales (id_local),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE detalle_pedido (
	id_detalle_pedido INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_platillo INT(10) ZEROFILL NULL,
    id_pedido INT(10) ZEROFILL NULL,    
    precio_subtotal DECIMAL(5,2),
    comentarios VARCHAR(80),
    id_estado INT(10) ZEROFILL NULL,    
    FOREIGN KEY (id_platillo) REFERENCES platillos (id_platillo),
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE detalle_ingredientes (
	id_detalle_ingrediente INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_detalle_pedido INT(10) ZEROFILL NULL,
    id_ingrediente int (10) ZEROFILL NULL,    
    FOREIGN KEY (id_detalle_pedido) REFERENCES detalle_pedido (id_detalle_pedido),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes (id_ingrediente)
);

CREATE TABLE valoracion_platillo (
    id_valoracion INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    puntuacion TINYINT(1) NOT NULL,
    comentarios VARCHAR(80) NULL,
    id_platillo INT(10) ZEROFILL NULL,
    id_usuario INT(10) ZEROFILL NULL,    
    FOREIGN KEY (id_platillo) REFERENCES platillos (id_platillo),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

CREATE TABLE valoracion_local (
    id_valoracion INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    puntuacion TINYINT(1) NOT NULL,
    comentarios VARCHAR(80) NOT NULL,
    id_local INT(10) ZEROFILL NOT NULL,
    id_usuario INT(10) ZEROFILL NOT NULL,    
    FOREIGN KEY (id_local) REFERENCES locales (id_local),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

CREATE TABLE errores (
	id_error INT(10) ZEROFILL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    descripcion VARCHAR(150) null,
    fecha DATETIME,
    vista VARCHAR(30),
    sentencia VARCHAR(80),
    ubicacion VARCHAR(80),
    linea_codigo SMALLINT(4),
    id_usuario INT(10) ZEROFILL NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

