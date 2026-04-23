function EstudianteTabla({ students, handleEdit, handleDelete }) {
  return (
    <div className="table-wrap">
      <table className="tabla-estudiantes">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6">No hay estudiantes registrados</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.nombre}</td>
                <td>{student.apellido}</td>
                <td>{student.correo}</td>
                <td>{student.carrera}</td>
                <td>{student.fecha || ""}</td>
                <td>
                  <button className="btnEditar" onClick={() => handleEdit(student)}>
                    Editar
                  </button>
                  {" "}
                  <button className="btnEliminar" onClick={() => handleDelete(student.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EstudianteTabla;