import React, { createContext, useContext, useEffect, useState } from 'react';

// creamos un contexto para compartir datos(notas y talleres) en toda la app.
const DataContext = createContext();

// lo hacemos con DataProvider:
// componente que genera datos aleatorios 
// y los guarda en estados (notas, talleres) al cargar la app.
export const DataProvider = ({ children }) => {
    const [notas, setNotas] = useState([]);
    const [talleres, setTalleres] = useState([]);


    // useEffect con generarDatosAleatorios()
    // se ejecuta una función que simula datos aleatorios de materias y los guarda en estado.
    // mas especificamente hacemos que genere
    // 3 notas con valores entre 0 y 5, marcadas como Aprobado o Reprobado según la nota.
    // 5 talleres con progreso fijo (33%) y estado que varía: los primeros 2 son Completado, los demás son aleatorios entre En progreso y Pendiente.

    useEffect(() => {
        generarDatosAleatorios();
    }, []);

    const generarDatosAleatorios = () => {
        const materias = ['Matemáticas', 'Programación', 'Bases de Datos', 'Física', 'Química'];
        const estados = ['Completado', 'En progreso'];

        // Generar notas
        const notasGeneradas = materias.slice(0, 3).map((materia) => {
        const valor = parseFloat((Math.random() * 5).toFixed(1));
        return {
            materia,
            nota: valor,
            estado: valor >= 4 ? 'Aprobado' : 'Reprobado',
        };
        });

        // Generar talleres
        const talleresGenerados = materias.slice(0, 5).map((materia, index) => {
            const valor = '33%';
        let estado;
        if (index < 2) estado = 'Completado';
        else estado = Math.random() > 0.5 ? 'En progreso' : 'Pendiente';

        return {
            materia,
            valor,
            estado,
        };
        });

        setNotas(notasGeneradas);
        setTalleres(talleresGenerados);
    };

    return (
        <DataContext.Provider value={{ notas, talleres }}>
            {children}
        </DataContext.Provider>
    );
};

// y usamos useData()
// que es un Hook personalizado para acceder fácilmente 
// a notas y talleres desde cualquier componente.
export const useData = () => useContext(DataContext);
