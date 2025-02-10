import {createSlice} from '@reduxjs/toolkit' ; 
const employeeSlice = createSlice ({
    name: "employee",
    initialState: {
        employees: [], // Liste des employés
    },
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload); // Ajoute l'employé
        },
    },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;