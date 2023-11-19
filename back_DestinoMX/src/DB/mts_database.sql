-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mts_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mts_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mts_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mts_database` ;

-- -----------------------------------------------------
-- Table `mts_database`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(20) NOT NULL,
  `ApellidoP` TEXT NOT NULL,
  `ApellidoM` TEXT NULL,
  `CorreoElectronico` TEXT NOT NULL,
  `Usuario` TEXT NOT NULL,
  `contrasena` VARCHAR(32) NOT NULL,
  `codigoValidacion` INT(6) NULL,
  `codigoVencimiento` TIME NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Favoritos` (
  `idPlaceLugar` VARCHAR(500) NOT NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idPlaceLugar`, `idUsuario`),
  INDEX `fk_Favoritos_Usuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Favoritos_Usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mts_database`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Viajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Viajes` (
  `idViajes` INT NOT NULL AUTO_INCREMENT,
  `nombreMiViaje` TEXT NOT NULL,
  `descripcionViaje` TEXT NULL,
  `diaInicio` DATE NOT NULL,
  `diaFinal` DATE NOT NULL,
  `colorPlantilla` VARCHAR(10) NOT NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idViajes`, `idUsuario`),
  INDEX `fk_Viajes_Usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Viajes_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mts_database`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Historial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Historial` (
  `idPlaceLugar` VARCHAR(500) NOT NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idPlaceLugar`, `idUsuario`),
  INDEX `fk_Historial_Usuario_idx` (`idUsuario` ASC) INVISIBLE,
  CONSTRAINT `fk_Historial_Usuario0`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mts_database`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`LugaresDeViajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`LugaresDeViajes` (
  `idPlacesLugar` VARCHAR(500) NOT NULL,
  `idViajes` INT NOT NULL,
  `fechaEspecifica` DATE NOT NULL,
  PRIMARY KEY (`idPlacesLugar`, `idViajes`),
  INDEX `fk_LugaresDeViajes_Viajes1_idx` (`idViajes` ASC) VISIBLE,
  CONSTRAINT `fk_LugaresDeViajes_Viajes1`
    FOREIGN KEY (`idViajes`)
    REFERENCES `mts_database`.`Viajes` (`idViajes`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`catPreferencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`catPreferencias` (
  `idCatPreferencias` VARCHAR(30) NOT NULL,
  `idPlacesTipo` VARCHAR(26) NOT NULL,
  PRIMARY KEY (`idCatPreferencias`, `idPlacesTipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Preferencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Preferencias` (
  `idUsuario` INT NOT NULL,
  `idCatPreferencias` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idUsuario`, `idCatPreferencias`),
  INDEX `fk_Preferencias_Usuario1_idx` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_Preferencias_catPreferencias1_idx` (`idCatPreferencias` ASC) VISIBLE,
  CONSTRAINT `fk_Preferencias_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mts_database`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Preferencias_catPreferencias1`
    FOREIGN KEY (`idCatPreferencias`)
    REFERENCES `mts_database`.`catPreferencias` (`idCatPreferencias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

insert into catPreferencias values 
('parque de atracciones','amusement_park'),
('parque de atracciones','tourist_attraction'),
('lugares religiosos','church'),
('lugares religiosos','hindu_temple'),
('lugares religiosos','mosque'),
('lugares religiosos','synagogue'),
('parque y areas naturales','aquarium'),
('parque y areas naturales','campground'),
('parque y areas naturales','florist'),
('parque y areas naturales','park'),
('parque y areas naturales','zoo'),
('museos y galerias','art_gallery'),
('museos y galerias','museum'),
('museos y galerias','painter'),
('bares y pubs','bar'),
('bares y pubs','liquor_store'),
('parque y areas naturales','night_club'),
('centros de entretenimiento','bowling_alley'),
('centros de entretenimiento','casino'),
('centros de entretenimiento','movie_rental'),
('centros de entretenimiento','movie_theater'),
('centros de entretenimiento','stadium'),
('restaurantes','restaurant'),
('cafeterias','bakery'),
('cafeterias','cafe'),
('gym','gym'),
('plazas','beauty_salon'),
('plazas','clothing_store'),
('plazas','department_store'),
('plazas','electronics_store'),
('plazas','furniture_store'),
('plazas','hair_care'),
('plazas','hardware_store'),
('plazas','home_goods_store'),
('plazas','jewelry_store'),
('plazas','pet_store'),
('plazas','shoe_store'),
('plazas','shopping_mall'),
('plazas','spa'),
('plazas','storage'),
('plazas','store'),
('hoteles','lodging'),
('bibliotecas','book_store'),
('bibliotecas','library'),
('momumentos y lugares publicos','city_hall'),
('momumentos y lugares publicos','local_government_office');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;