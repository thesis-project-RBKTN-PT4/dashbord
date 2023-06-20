-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema easymed
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema easymed
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `easymed` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `easymed` ;

-- -----------------------------------------------------
-- Table `easymed`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `easymed`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('patient', 'doctor') NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isAdmin` VARCHAR(10) NULL DEFAULT 'false',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` USING BTREE (`email`) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `easymed`.`patients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `easymed`.`patients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `phone_number` VARCHAR(20) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `easymed`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `easymed`.`doctors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `easymed`.`doctors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `specialization` VARCHAR(255) NULL DEFAULT NULL,
  `experience` INT NULL DEFAULT NULL,
  `rating` DECIMAL(3,2) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `about` VARCHAR(255) NULL DEFAULT NULL,
  `x_coordinate` DECIMAL(10,6) NULL DEFAULT NULL,
  `y_coordinate` DECIMAL(10,6) NULL DEFAULT NULL,
  `picture` BLOB NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `doctors_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `easymed`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `easymed`.`appointments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `easymed`.`appointments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patient_id` INT NULL DEFAULT NULL,
  `doctor_id` INT NULL DEFAULT NULL,
  `appointment_date` DATE NULL DEFAULT NULL,
  `appointment_time` TIME NULL DEFAULT NULL,
  `status` ENUM('Available', 'Booked', 'Canceled', 'Rescheduled') NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `patient_id` (`patient_id` ASC) VISIBLE,
  INDEX `doctor_id` (`doctor_id` ASC) VISIBLE,
  CONSTRAINT `appointments_ibfk_1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `easymed`.`patients` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `appointments_ibfk_2`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `easymed`.`doctors` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `easymed`.`licence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `easymed`.`licence` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(45) NOT NULL,
  `doctor_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `number_UNIQUE` (`number` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `easymed`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `easymed`.`reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patient_id` INT NULL DEFAULT NULL,
  `doctor_id` INT NULL DEFAULT NULL,
  `rating` DECIMAL(3,2) NULL DEFAULT NULL,
  `comment` TEXT NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `patient_id` (`patient_id` ASC) VISIBLE,
  INDEX `doctor_id` (`doctor_id` ASC) VISIBLE,
  CONSTRAINT `reviews_ibfk_1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `easymed`.`patients` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_2`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `easymed`.`doctors` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `easymed`.`workingdays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `easymed`.`workingdays` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `doctor_id` INT NULL DEFAULT NULL,
  `day_of_week` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `doctor_id` (`doctor_id` ASC) VISIBLE,
  CONSTRAINT `workingdays_ibfk_1`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `easymed`.`doctors` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `easymed`.`workinghours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `easymed`.`workinghours` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `doctor_id` INT NULL DEFAULT NULL,
  `day_id` INT NULL DEFAULT NULL,
  `start_time` TIME NULL DEFAULT NULL,
  `end_time` TIME NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `doctor_id` (`doctor_id` ASC) VISIBLE,
  INDEX `day_id` (`day_id` ASC) VISIBLE,
  CONSTRAINT `workinghours_ibfk_1`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `easymed`.`doctors` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `workinghours_ibfk_2`
    FOREIGN KEY (`day_id`)
    REFERENCES `easymed`.`workingdays` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
