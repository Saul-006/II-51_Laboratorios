// src/services/cursoService.js

import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CursosTabla from "../components/cursos/CursosTabla";

/*
  ------------------------------------------------------------
  Configuración general
  ------------------------------------------------------------
*/
const TABLA_NOMBRE = "cursos";
const ENTIDAD_NOMBRE = "curso";
const COLUMNAS_MOSTRAR = "id, nombre, creditos, codigo";

/*
  ------------------------------------------------------------
  mapCursoPayload
  ------------------------------------------------------------
  Prepara únicamente los campos que se enviarán a la BD.
*/
const mapCursoPayload = (curso) => ({
  nombre: curso.nombre?.trim() || "",
  creditos: curso.creditos?.toString().trim() || "",
  codigo: curso.codigo?.trim() || "",
});

/*
  ------------------------------------------------------------
  Obtener todos los cursos
  ------------------------------------------------------------
  Permite filtrar por nombre o código.
*/
export const obtenerTodos = async (search = "") => {
  let query = supabase
    .from(TABLA_NOMBRE)
    .select(COLUMNAS_MOSTRAR)
    .order("id", { ascending: true });

  const term = search.trim();

  if (term) {
    query = query.or(`nombre.ilike.%${term}%,codigo.ilike.%${term}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error al cargar ${ENTIDAD_NOMBRE}s:`, error);
    throw new Error(`No se pudieron cargar los ${ENTIDAD_NOMBRE}s`);
  }

  return data;
};

/*
  ------------------------------------------------------------
  Obtener curso por ID
  ------------------------------------------------------------
*/
export const obtener = async (id) => {
  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .select(COLUMNAS_MOSTRAR)
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error al obtener ${ENTIDAD_NOMBRE}:`, error);
    throw new Error(`No se pudo obtener el ${ENTIDAD_NOMBRE}`);
  }

  return data;
};

/*
  ------------------------------------------------------------
  Crear curso
  ------------------------------------------------------------
*/
export const crear = async (curso) => {
  const payload = mapCursoPayload(curso);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .insert([payload])
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error(`Error al crear ${ENTIDAD_NOMBRE}:`, error);
    throw new Error(`No se pudo crear el ${ENTIDAD_NOMBRE}`);
  }

  return data;
};

/*
  ------------------------------------------------------------
  Actualizar curso
  ------------------------------------------------------------
*/
export const actualizar = async (id, curso) => {
  const payload = mapCursoPayload(curso);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .update(payload)
    .eq("id", id)
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error(`Error al actualizar ${ENTIDAD_NOMBRE}:`, error);
    throw new Error(`No se pudo actualizar el ${ENTIDAD_NOMBRE}`);
  }

  return data;
};

/*
  ------------------------------------------------------------
  Eliminar curso
  ------------------------------------------------------------
*/
export const eliminar = async (id) => {
  const { error } = await supabase
    .from(TABLA_NOMBRE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error al eliminar ${ENTIDAD_NOMBRE}:`, error);
    throw new Error(`No se pudo eliminar el ${ENTIDAD_NOMBRE}`);
  }

  return true;
};

/*
  ------------------------------------------------------------
  Guardar curso
  ------------------------------------------------------------
  Si tiene id, actualiza.
  Si no tiene id, crea.
*/
export const guardar = async (curso) => {
  if (curso.id) {
    return await actualizar(curso.id, curso);
  }

  return await crear(curso);
};