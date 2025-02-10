import { useState } from "react";
import { Link } from "react-router-dom"
import { useDispatch} from 'react-redux';
import { addEmployee } from "../../features/employeeSlice";
import InputText from "../../components/Form/InputText";
import InputDate from "../../components/Form/InputDate";
import Modal from "../../components/Modal/Modal";
import SelectOption from "../../components/Form/SelectOption";
import {states} from "../../data/states";
import {departments} from "../../data/departments";

function CreateEmployee (){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(''); 
    const [startDate, setStartDate] = useState(''); 
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [department, setDepartment] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const validateForm = () => {
        const fields = [
            { field: firstName, name: "firstName", message: "Le prénom est obligatoire." },
            { field: lastName, name: "lastName", message: "Le nom est obligatoire." },
            { field: dateOfBirth, name: "dateOfBirth", message: "La date de naissance est obligatoire." },
            { field: startDate, name: "startDate", message: "La date de début est obligatoire." },
            { field: street, name: "street", message: "La rue est obligatoire." },
            { field: city, name: "city", message: "La ville est obligatoire." },
            { field: state, name: "state", message: "L'état est obligatoire." },
            { field: zipCode, name: "zipCode", message: "Le code postal est obligatoire." },
            { field: department, name: "department", message: "Le département est obligatoire." },
        ];
    
        const newErrors = fields.reduce((errors, { field, name, message }) => {
            if (!field.trim()) {
                errors[name] = message;
            }
            return errors;
        }, {});
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirm = () => {
        // Enregistre l'employé après confirmation
        const newEmployee = { firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department };
        dispatch(addEmployee(newEmployee));
    
        const currentEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        localStorage.setItem('employees', JSON.stringify([...currentEmployees, newEmployee]));
    
        setOpenModal(false); // Ferme le modal après l'ajout
    };
    
    const handleCancel = () => {
        setOpenModal(false); // Ferme simplement le modal sans enregistrer
    };
    
    const handleSave = () => {
        if (!validateForm()) return;
        setOpenModal(true); // Affiche le modal avant d'enregistrer
    };
    return(
        <>
            <header className="flex items-center justify-between py-4 px-8 bg-gradient-to-r from-green-200 via-green-300 to-green-400 shadow-lg">
                <h1 className="text-3xl font-bold text-green-900 tracking-wide">HRnet</h1>
                <nav>
                    <Link to={`/EmployeeList`} className="text-green-900 font-medium hover:underline hover:text-green-700 transition duration-300">View Current Employees</Link>
                </nav>
            </header>
            <main className="bg-green-800 p-5 flex flex-col justify-between items-center">
                <h2 className="mb-2 text-white text-xl">Create Employee</h2>
                <form className="bg-white p-6 shadow-md rounded-lg">
                    <section className="mb-6">
                        <h3 className="text-lg text-gray-700 border-b pb-2 mb-4">Personal Information</h3>
                        <InputText id="first-name" label="First Name" onChange={setFirstName} error={errors.firstName}/>

                        <InputText id="last-name" label="Last Name" value={lastName} onChange={setLastName} error={errors.lastName}/>

                        <InputDate id="date-of-birth" label="Date of Birth" value={dateOfBirth} onChange={setDateOfBirth} error={errors.dateOfBirth}/>

                        <InputDate id="start-date" label="Start Date" value={startDate} onChange={setStartDate} error={errors.startDate}/>
                    </section>

                    <section className="mb-6">
                        <h3 className="text-lg text-gray-700 border-b pb-2 mb-4">Address</h3>
                        <InputText id="street" label="Street" value={street} onChange={setStreet} error={errors.street}/>

                        <InputText id="city" label="City" value={city} onChange={setCity} error={errors.city}/>

                        <SelectOption id="state" label="State" value={state} options={states} onChange={setState} error={errors.state}/>

                        <div className="mt-5">
                            <label className="block text-gray-700" htmlFor="zip-code">Zip Code</label>
                            <input id="zip-code" className="border border-gray-400 py-1 px-2 w-full" type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                        </div>
                        {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
                    </section>

                    <section className="mb-6">
                        <h3 className="text-lg text-gray-700 border-b pb-2 mb-4">Department</h3>
                        <SelectOption id="department" label="Department" value={department} options={departments} 
                          onChange={setDepartment} error={errors.department}/>
                    </section>
                        <div className="mt-5">
                            <button type="button" className="w-full bg-green-800 py-3 text-center text-white rounded-md hover:bg-green-700 transition" onClick={handleSave}>Save</button>
                        </div>
                    </form>
                </main>

                {openModal && (
                    <Modal closeModal={setOpenModal} title="Confirm Employee Creation" footerButtons={[
                       { label: "Cancel", onClick: handleCancel, className: "bg-gray-300 text-black hover:bg-gray-400" },
                       { label: "Confirm", onClick: handleConfirm, className: "bg-green-800 text-white hover:bg-green-700" }
                    ]}>
                       <p>Do you confirm the creation of this employee?</p>
                    </Modal>
                )}
                {/* <div id="confirmation" className="modal">Employee Created!</div> */}
            </>
        )}
    export default CreateEmployee