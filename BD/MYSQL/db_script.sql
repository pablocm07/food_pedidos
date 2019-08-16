DROP DATABASE food_pedidos;

CREATE DATABASE food_pedidos;

USE food_pedidos;

CREATE TABLE usuarios (
    id_usuario int (10) auto_increment,
    nombre varchar (50),
    apellido varchar (50),
    no_telefonico char (10),
    tipo_usuario char (1),
    correo_electronico varchar (70),
    contrasena varchar (20),
    foto_perfil varchar (80),
    PRIMARY KEY (id_usuario)
) ;

CREATE TABLE estados (
    id_estado int (10) auto_increment,
    estado varchar (20),
    PRIMARY KEY (id_estado)
);

CREATE TABLE locales (
    id_local int (10) auto_increment,
    nombre_local varchar (50),
    tipo_local varchar (50),
    foto_logo varchar (80),
    descripcion varchar (80),
    horario_abrir char (5),
    horario_cerrar char (5),  
    id_estado int(10), 
    id_usuario int (10),
    PRIMARY KEY (id_local),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE ingredientes (
    id_ingrediente int (10) auto_increment,
    nombre varchar (30),
    precio decimal (5,2),
    id_local int (10),
    id_estado int (10),
    PRIMARY KEY (id_ingrediente),
    FOREIGN KEY (id_local) REFERENCES locales (id_local),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE platillos ( 
    id_platillo int (10) auto_increment,
    id_local int (10),
    nombre_platillo varchar (60),
    precio decimal (5,2),
    tiempo_preparacion smallint(4),
    cantidad tinyint (2),
    descripcion varchar (80),
    id_estado int (10),
    PRIMARY KEY (id_platillo),
    FOREIGN KEY (id_local) REFERENCES locales (id_local),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE imagen_platillo (
    id_img_platillo int (10) auto_increment,
    ubicacion_imagen VARCHAR (80),
    id_platillo int (10),
    PRIMARY KEY (id_img_platillo),
    FOREIGN KEY (id_platillo) REFERENCES platillos (id_platillo)
);

CREATE TABLE detalle_platillo (
    id_detalle_platillo int (10) auto_increment,
    id_platillo int (10),
    id_ingrediente int(10),
    PRIMARY KEY (id_detalle_platillo),
    FOREIGN KEY (id_platillo) REFERENCES platillos (id_platillo),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes (id_ingrediente)
);

CREATE TABLE pedidos (
    id_pedido int (10) auto_increment,
    id_local int (10),
    id_usuario int (10),
    precio_total decimal (5,2),
    fecha_hora datetime,
    id_estado int (10),
    PRIMARY KEY (id_pedido),
    FOREIGN KEY (id_local) REFERENCES locales (id_local),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE detalle_pedido (
	id_detalle_pedido int (10) auto_increment,
    id_platillo int (10),
    id_pedido int (10),    
    precio_subtotal decimal (5,2),
    comentarios varchar (80),
    id_estado int (10),
    PRIMARY KEY (id_detalle_pedido),
    FOREIGN KEY (id_platillo) REFERENCES platillos (id_platillo),
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido),
    FOREIGN KEY (id_estado) REFERENCES estados (id_estado)
);

CREATE TABLE detalle_ingredientes (
	id_detalle_ingrediente int (10) auto_increment,
    id_detalle_pedido int (10),
    id_ingrediente int (10),
    PRIMARY KEY (id_detalle_ingrediente),
    FOREIGN KEY (id_detalle_pedido) REFERENCES detalle_pedido (id_detalle_pedido),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes (id_ingrediente)
);

CREATE TABLE valoracion_platillo (
    id_valoracion int (10) auto_increment not null,
    puntuacion tinyint (1) not null,
    comentarios varchar (80) null,
    id_platillo int (10) not null,
    id_usuario int (10) not null,
    PRIMARY KEY (id_valoracion),
    FOREIGN KEY (id_platillo) REFERENCES platillos (id_platillo),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

CREATE TABLE valoracion_local (
    id_valoracion int (10) auto_increment not null,
    puntuacion tinyint (1) not null,
    comentarios varchar (80) null,
    id_local int (10) not null,
    id_usuario int (10) not null,
    PRIMARY KEY (id_valoracion),
    FOREIGN KEY (id_local) REFERENCES locales (id_local),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

CREATE TABLE errores (
	id_error int(10) auto_increment not null,
    descripcion varchar (150) null,
    fecha datetime,
    vista varchar(30),
    sentencia varchar(80),
    ubicacion varchar(80),
    linea_codigo smallint(4),
    id_usuario int(10),
    PRIMARY KEY (id_error)
);

