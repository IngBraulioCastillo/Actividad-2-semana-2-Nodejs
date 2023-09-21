document.addEventListener("DOMContentLoaded", function () {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let tareas = storedTasks;

    const listaTareas = document.getElementById("tareas");
    const btnCompletadas = document.getElementById("btnCompletadas");
    const btnPorCompletar = document.getElementById("btnPorCompletar");
    const btnAgregar = document.getElementById("btnAgregar");
    const btnGuardar = document.getElementById("btnGuardar");
    const btnAgregarNueva = document.getElementById("btnAgregarNueva");
    const btnBorrarCompletadas = document.getElementById("btnBorrarCompletadas");
    const editarTarea = document.getElementById("editarTarea");
    const agregarTarea = document.getElementById("agregarTarea");
    const editTaskName = document.getElementById("editTaskName");
    const newTaskName = document.getElementById("newTaskName");

    function guardarTareasEnLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tareas));
    }
    
    function mostrarTareas(completadas = false) {
        listaTareas.innerHTML = "";
        for (let i = 0; i < tareas.length; i++) {
          const tarea = tareas[i];
          if ((completadas && tarea.completed) || (!completadas && !tarea.completed)) {
            const li = document.createElement("li");
            li.textContent = tarea.name;
            if (tarea.completed) {
            } else {
              const completarBtn = document.createElement("button");
              completarBtn.textContent = "¿Desea Guardar la Tarea?";
              completarBtn.addEventListener("click", () => {
                tarea.completed = true;
                guardarTareasEnLocalStorage();
                mostrarTareas(completadas);
              });
              li.appendChild(completarBtn);
            }
            li.addEventListener("click", () => {
              editarTarea.style.display = "block";
              editTaskName.value = tarea.name;
              btnGuardar.addEventListener("click", () => {
                tarea.name = editTaskName.value;
                editarTarea.style.display = "none";
                guardarTareasEnLocalStorage();
                mostrarTareas(completadas);
              });
            });
            listaTareas.appendChild(li);
          }
        }
      }
      


    btnCompletadas.addEventListener("click", () => {
        mostrarTareas(true);
        guardarTareasEnLocalStorage();
    });

    btnPorCompletar.addEventListener("click", () => {
        mostrarTareas();
        guardarTareasEnLocalStorage(); 
    });

    btnAgregar.addEventListener("click", () => {
        agregarTarea.style.display = "block";
        btnAgregarNueva.addEventListener("click", () => {
            const nuevaTarea = {
                name: newTaskName.value,
                completed: false,
            };
            tareas.push(nuevaTarea);
            guardarTareasEnLocalStorage();
            agregarTarea.style.display = "none";
            newTaskName.value = "";
            mostrarTareas();
        });
    });

    btnBorrarCompletadas.addEventListener("click", () => {
        tareas = tareas.filter((tarea) => !tarea.completed);
        guardarTareasEnLocalStorage();
        mostrarTareas();
    });

    mostrarTareas();
});


document.addEventListener("DOMContentLoaded", function () {


    let verCompletadasVisible = false; 
    let verPorCompletarVisible = false; 
    let agregarTareaVisible = false; 

    function toggleVerCompletadas() {
        verCompletadasVisible = !verCompletadasVisible;
        if (verCompletadasVisible) {
            mostrarTareas(true); 
        } else if (!verPorCompletarVisible) {
            listaTareas.innerHTML = ""; 
        }
        guardarTareasEnLocalStorage();
    }

    function toggleVerPorCompletar() {
        verPorCompletarVisible = !verPorCompletarVisible;
        if (verPorCompletarVisible) {
            mostrarTareas(); 
        } else if (!verCompletadasVisible) {
            listaTareas.innerHTML = ""; 
        }
        guardarTareasEnLocalStorage();
    }

    function toggleAgregarTarea() {
        agregarTareaVisible = !agregarTareaVisible;
        if (agregarTareaVisible) {
          agregarTarea.style.display = "block";
        } else {
          agregarTarea.style.display = "none";
      
          // Guarda la nueva tarea en el almacenamiento local antes de agregarla a la lista de tareas.
          const nuevaTarea = {
            name: newTaskName.value,
            completed: false,
          };
          tareas.push(nuevaTarea);
          guardarTareasEnLocalStorage();
          newTaskName.value = "";
          mostrarTareas();
        }
      }

    btnCompletadas.addEventListener("click", toggleVerCompletadas);

    btnPorCompletar.addEventListener("click", toggleVerPorCompletar);

    btnAgregar.addEventListener("click", () => {
        toggleAgregarTarea();
        if (!agregarTareaVisible) {
            const nuevaTarea = {
                name: newTaskName.value,
                completed: false,
            };
            tareas.push(nuevaTarea);
            guardarTareasEnLocalStorage(); 
            newTaskName.value = "";
            mostrarTareas(verCompletadasVisible); 
        }
    });
});

   