import FilteringTable from "../../components/Table/FilteringTable";
function EmployeeList (){
    
    const listeEmployee = localStorage.getItem('employees');
    console.log(listeEmployee)
    return(<>
    <FilteringTable/>
    </>)
}
export default EmployeeList