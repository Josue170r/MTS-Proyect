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
DROP SCHEMA IF EXISTS `mts_database` ;

-- -----------------------------------------------------
-- Schema mts_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mts_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mts_database` ;

-- -----------------------------------------------------
-- Table `mts_database`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Usuario` (
  `idUsuario` VARCHAR(10) NOT NULL,
  `Nombre` VARCHAR(20) NULL,
  `Apellidos` TEXT NULL,
  `CorreoElectronico` TEXT NULL,
  `Usuario` TEXT NULL,
  `contrasena` TEXT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Favoritos` (
  `idFavoritos` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` VARCHAR(10) NOT NULL,
  `idLugar` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idFavoritos`, `idUsuario`),
  INDEX `fk_Favoritos_Usuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Favoritos_Usuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mts_database`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Planeacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Planeacion` (
  `idPlaneacion` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idPlaneacion`, `idUsuario`),
  INDEX `fk_Itinerario_Usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Itinerario_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mts_database`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Viajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Viajes` (
  `idViajes` VARCHAR(100) NOT NULL,
  `nombreMiViaje` TEXT NOT NULL,
  `descripcionViaje` TEXT NULL,
  `diaInicio` DATE NOT NULL,
  `diaFinal` DATE NOT NULL,
  `colorPlantilla` TEXT NULL,
  `idPlaneacion` INT NOT NULL,
  PRIMARY KEY (`idViajes`, `idPlaneacion`),
  INDEX `fk_Viajes_Planeacion1_idx` (`idPlaneacion` ASC) VISIBLE,
  CONSTRAINT `fk_Viajes_Planeacion1`
    FOREIGN KEY (`idPlaneacion`)
    REFERENCES `mts_database`.`Planeacion` (`idPlaneacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Historial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Historial` (
  `idHistorial` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` VARCHAR(10) NOT NULL,
  `idLugar` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idHistorial`, `idUsuario`),
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
  `idViajesLugar` INT NOT NULL,
  `Viajes_idViajes` VARCHAR(100) NOT NULL,
  `idLugares` VARCHAR(45) NOT NULL,
  `OrdenPriorizacion` INT NOT NULL,
  PRIMARY KEY (`idViajesLugar`, `Viajes_idViajes`),
  INDEX `fk_LugaresDeViajes_Viajes1_idx` (`Viajes_idViajes` ASC) VISIBLE,
  CONSTRAINT `fk_LugaresDeViajes_Viajes1`
    FOREIGN KEY (`Viajes_idViajes`)
    REFERENCES `mts_database`.`Viajes` (`idViajes`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
