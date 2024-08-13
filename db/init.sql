-- init.sql

CREATE DATABASE IF NOT EXISTS celsia_pruebas;

USE celsia_pruebas;

CREATE TABLE clientes (
  identificacion VARCHAR(20) NOT NULL PRIMARY KEY,
  nombres VARCHAR(80) NOT NULL,
  apellidos VARCHAR(80) NOT NULL,
  tipoIdentificacion VARCHAR(2) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  numeroCelular VARCHAR(20) NOT NULL,
  correoElectronico VARCHAR(80) NOT NULL
);

CREATE TABLE servicios (
  identificacion VARCHAR(20) NOT NULL,
  servicio VARCHAR(80) NOT NULL,
  fechaInicio DATE NOT NULL,
  ultimaFacturacion DATE NOT NULL,
  ultimoPago INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (identificacion, servicio),
  CONSTRAINT servicios_FK1 FOREIGN KEY (identificacion) 
  REFERENCES clientes(identificacion) ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE users (
  email VARCHAR(20) NOT NULL PRIMARY KEY,
  password VARCHAR(20) NOT NULL
);  