// Importamos el cliente de Supabase para interactuar con la base de datos
// este cliente ya está configurado con la URL y la clave de acceso a nuestra instancia de Supabase
import { supabase } from "./supabase.js";

// obtenemos referencias a los elementos del DOM que vamos a usar
// ********************************************************************
// Referencias a elementos del DOM
// ********************************************************************
const txtSearch = document.getElementById("txtSearch");
const btnLoad = document.getElementById("btnLoad");
const tbody = document.getElementById("tbodyStudents");

btnLoad.addEventListener("click", async () => consultarEstudiantes());

// function de flecha (es una forma de definir funciones anónimas y asignarlas a una variable)
// const consultarEstudiantes = async () => {};

// function tradicional
// function consultarEstudiantes() {}

// let y const
// let x = 10; 
// x = 20; 
// const y = 30;
// y = 40;   // error, no se puede reasignar una constante
// var z = 50;
// z = 60;   // no error, var permite redeclarar la misma variable

const consultarEstudiantes = async () => {
    // usamos el cliente de Supabase para hacer una consulta a la tabla "estudiantes"
    // json: { "data": [...], "error": null }
    const search = txtSearch.value.trim() || ""; // si el valor es vacío, se asigna una cadena vacía
    const query = supabase.from("estudiantes").select("id,nombre,apellido,correo,carrera");

    // SEBASTIAN JESUS
    if (search.length > 0) {
        // query.ilike("nombre", `%${search}%`); 
        query.or(`nombre.ilike.%${search}%,apellido.ilike.%${search}%`); 
    }
    const { data, error } = await query;

  if (error) {
    console.error(error);
    alert("Error cargando estudiantes");
    return;
  }

  tbody.innerHTML = "";

  // data es un arreglo de objetos, cada objeto representa un estudiante
  data.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${r.id ?? ""}</td>
        <td>${r.nombre ?? ""}</td>
        <td>${r.apellido ?? ""}</td>
        <td>${r.correo ?? ""}</td>
        <td>${r.carrera ?? ""}</td>
      `;
    tbody.appendChild(tr);
  });
};