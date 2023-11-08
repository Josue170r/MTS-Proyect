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
  `Apellidos` TEXT NOT NULL,
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
  `idPlaceLugar` TEXT NOT NULL,
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
  `idUsuario` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idViajes`, `idUsuario`),
  INDEX `fk_Viajes_Usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_Viajes_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mts_database`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mts_database`.`Historial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mts_database`.`Historial` (
  `idPlaceLugar` TEXT NOT NULL,
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
  `idPlacesLugar` TEXT NOT NULL,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
