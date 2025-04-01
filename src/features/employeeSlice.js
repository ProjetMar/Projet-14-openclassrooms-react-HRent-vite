import {createSlice} from '@reduxjs/toolkit' ; 
const initialEmployees = JSON.parse(localStorage.getItem('employees')) || []; // Récupération au démarrage

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: initialEmployees, // On charge les employés stockés
    },
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
            localStorage.setItem('employees', JSON.stringify(state.employees)); // Sauvegarde
        },
    },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;