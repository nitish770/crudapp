import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Table from './components/table/Table';
import axios from 'axios';

function App() {
  const [inputs, setInputs]= useState('')
  const [dataUser, setDataUser] = useState([]);
  const [filters, setFilters]=useState([]);
  const [search,setSearch] = useState(false);


  function getData() {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      console.log(res.data);
      setDataUser(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);


  const filterData = () => {
    setSearch(true);
    if (inputs.length > 0) {
      const data = dataUser.filter((item) => item.category.toLowerCase().includes(inputs.toLowerCase()));
      setFilters(data);
    } else if (inputs.length === 0) {
      setFilters(dataUser);
    } else {
      setInputs('');
    }
  }
  return (
    <div className="App">
      <Navbar setInputs={setInputs} searchData={filterData}/>
      {
        search ?<Table inputs={inputs} setData={setFilters} data={filters}/>:<Table inputs={inputs} setData={setDataUser} data={dataUser} />
      }
    </div>
  );
}

export default App;
