INSERT INTO tipo_usuarios (`id_tipo_usuario`, `tipo_usuario`) 
VALUES (NULL, 'Administrador Global'), (NULL, 'Vendedor'), (NULL, 'Cliente');

Insert into estados (estado) 
values
('En existencia'),
('Agotado'),
('Activado'),
('Desactivado'),
('En espera'),
('En proceso'),
('Terminado'),
('Abierto'),
('Cerrado');

INSERT INTO usuarios (nombre, apellido, no_telefonico, id_tipo_usuario, correo_electronico, contrasena, foto_perfil)
VALUES 
('Pablo', 'Cruz', '7751463878', '3', 'pablocm1747@gmail.com', '12345678', './Assets/img/foto_perfil_pablo.JPG'),
('Miguel', 'Ortega', '7758765433', '1', 'miguelortega@gmail.com', '87654321', NULL),
('locatario', 's/a', '7750180023', '2', 'locatario@', '123', NULL), 
('consumidor', 's/a', '7751698675', '3', 'consumidor@', '123', NULL);


INSERT INTO locales (nombre_local, tipo_local, foto_logo, descripcion, horario_abrir, horario_cerrar, id_estado, id_usuario)
VALUES 
('Don andre', 'Cocina Económica', './Assets/img/comida_1.jpg', 'Los mejores desayunos y comidas, antojitos mexicanos y otros ricos alimntos', '08:00', '18:00', 8, 2),
('Doña Queta', 'Cocina Económica', './Assets/img/comida_2.jpg', 'Los mejores desayunos y comidas, antojitos mexicanos y otros ricos alimntos', '08:00', '18:00', 8, 1),
('Cafeteria UTEC', 'Cafeteria', './Assets/img/comida_3.jpg', 'Los mejores desayunos y comidas, antojitos mexicanos y otros ricos alimntos', '08:00', '18:00', 8, 1);

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


INSERT INTO imagen_platillo
(ubicacion_imagen, id_platillo)
VALUES
('./Assets/img/platillos/guajolote1.jpg', 1),
('./Assets/img/platillos/guajolote2.jpg', 1),
('./Assets/img/platillos/guajolote3.jpg', 1),
('./Assets/img/platillos/guajolote2.jpg', 2),
('./Assets/img/platillos/guajolote1.jpg', 2),
('./Assets/img/platillos/guajolote3.jpg', 2),
('./Assets/img/platillos/guajolote3.jpg', 3),
('./Assets/img/platillos/guajolote2.jpg', 3),
('./Assets/img/platillos/guajolote1.jpg', 3),
('./Assets/img/platillos/tacos1.jpg', 4),
('./Assets/img/platillos/tacos2.jpg', 4),
('./Assets/img/platillos/tacos3.jpg', 4),
('./Assets/img/platillos/tacos2.jpg', 5),
('./Assets/img/platillos/tacos1.jpg', 5),
('./Assets/img/platillos/tacos3.jpg', 5),
('./Assets/img/platillos/tacos3.jpg', 6),
('./Assets/img/platillos/tacos2.jpg', 6),
('./Assets/img/platillos/tacos1.jpg', 6),
('./Assets/img/platillos/quesadillas1.jpg', 7),
('./Assets/img/platillos/quesadillas2.jpg', 7),
('./Assets/img/platillos/quesadillas3.jpg', 7),
('./Assets/img/platillos/quesadillas2.jpg', 8),
('./Assets/img/platillos/quesadillas1.jpg', 8),
('./Assets/img/platillos/quesadillas3.jpg', 8),
('./Assets/img/platillos/quesadillas3.jpg', 9),
('./Assets/img/platillos/quesadillas2.jpg', 9),
('./Assets/img/platillos/quesadillas1.jpg', 9);