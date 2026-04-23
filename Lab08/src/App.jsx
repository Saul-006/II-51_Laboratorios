import { useEffect, useState } from "react";
import { obtenerEstudiantes, eliminarEstudiante } from "./estudianteService";
import BuscarEstudiante from "./components/estudiante/BuscarEstudiante";
import EstudianteTabla from "./components/estudiante/EstudianteTabla";
import FormEstudiante from "./components/estudiante/FormEstudiante";

/*
  ============================================================
  App.jsx
  ============================================================

  Este componente muestra una versión básica de un CRUD
  de estudiantes usando React + un service separado.

  Aquí React se encarga de:
  - manejar estado
  - capturar eventos
  - renderizar la interfaz

  El service se encarga de:
  - consultar la base de datos
  - insertar
  - actualizar
  - eliminar
*/

const initialForm = {
  id: "",
  nombre: "",
  apellido: "",
  correo: "",
  carrera: "",
  fecha: "",
};

function App() {
  // Estado del formulario
  const [form, setForm] = useState(initialForm);

  // Estado de la lista de estudiantes
  const [students, setStudents] = useState([]);

  // Estado del texto de búsqueda
  const [search, setSearch] = useState("");

  // Estado para mostrar carga
  const [loading, setLoading] = useState(false);

  /*
    ------------------------------------------------------------
    Cargar estudiantes
    ------------------------------------------------------------
    Esta función consulta los datos usando el service
    y actualiza el estado students.
  */
  const loadStudents = async (searchText = "") => {
    try {
      setLoading(true);
      const data = await obtenerEstudiantes(searchText);
      setStudents(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  /*
    ------------------------------------------------------------
    useEffect
    ------------------------------------------------------------
    Se ejecuta una vez al cargar el componente.
    Lo usamos para traer los estudiantes al inicio.
  */
  useEffect(() => {
    loadStudents();
  }, []);

  /* 
  useEffect(() => {
    loadStudents(page);
  }, [page]);
  */

  /*
    ------------------------------------------------------------
    Editar estudiante
    ------------------------------------------------------------
    Carga los datos de la fila seleccionada en el formulario.
  */
  const handleEdit = (student) => {
    setForm({
      id: student.id || "",
      nombre: student.nombre || "",
      apellido: student.apellido || "",
      correo: student.correo || "",
      carrera: student.carrera || "",
      fecha: student.fecha || "",
    });
  };

  /*
    ------------------------------------------------------------
    Eliminar estudiante
    ------------------------------------------------------------
    Elimina por id y vuelve a cargar la tabla.
  */
  const handleDelete = async (id) => {
    const ok = confirm("¿Desea eliminar este estudiante?");
    if (!ok) return;

    try {
      await eliminarEstudiante(id);
      await loadStudents(search);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  /*
    ------------------------------------------------------------
    Buscar estudiantes
    ------------------------------------------------------------
    Ejecuta la consulta usando el texto actual de búsqueda.
  */
  const handleSearch = async () => {
    await loadStudents(search);
  };

  /*
    ------------------------------------------------------------
    Limpiar búsqueda
    ------------------------------------------------------------
    Borra el texto y recarga todos los registros.
  */
  const handleClearSearch = async () => {
    setSearch("");
    await loadStudents("");
  };

  return (
    <div className="container">
      <header className="header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            flexwrap: "wrap",
            alignItems: "center",
          }}
        >
        <div>
          <div>II-51 Programación internet</div>
          <h1 className="header-title">Laboratorio 08 - Arquitectura en React</h1>
          <p className="header-subtitle">
            Router + Context + Componentes + Supabase
          </p>
        </div>

        <div className="badge">Laboratorio Final</div>
        </div>
      </header>

      <hr />

      {/* continuar después de clase */}

      <h2>{form.id ? "Editar estudiante" : "Agregar estudiante"}</h2>

      <FormEstudiante form={form} setForm={setForm} initialForm={initialForm} loadStudents={()=>loadStudents(search)} />

      <hr />

      <h2>Consulta de estudiantes</h2>

      <BuscarEstudiante search={search} setSearch={setSearch} handleSearch={handleSearch} handleClearSearch={handleClearSearch} />

      {loading ? (
        <p>Cargando estudiantes...</p>
      ) : (
        <EstudianteTabla students={students} handleEdit={handleEdit} handleDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;