import './GlobalFilterStyle.css'
/* eslint-disable react/prop-types */
const GlobalFilter = ({filter, setfilter})=>{
return (
    <span className='text-green-900 font-bold'>
        Search:{' '}
        <input value={filter || ''} onChange={(e)=>setfilter(e.target.value)}/>
    </span>
)
}
export default GlobalFilter