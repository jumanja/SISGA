CREATE SCHEMA `sisga` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `frat` text NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` text NOT NULL,
  `apellidos` text NOT NULL,
  `nombres` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `servicio` text NOT NULL,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `tokens` (
  `idusuario` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `expira` datetime NOT NULL,
  `estado` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


INSERT INTO `usuarios` (`frat`, `id`, `usuario`, `apellidos`, `nombres`, `password`,
										  `email`, `servicio`, `estado`) VALUES
('LS', 1, 'admin', 'Del Sistema', 'Administrador',
'$2y$10$8DE3bZoIRFYZbvngidLgauMvUQ4I0uuiG/QaA4Uji33rlrUUX1idC',
'jumanja@gmail.com', 'A',  'A');
