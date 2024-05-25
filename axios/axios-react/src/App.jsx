import { useEffect, useState } from "react";
import "./App.css";
import UseAxiosSecure from "./Axios/UseAxiosScoure";


function App() {
  const axiosSecure = UseAxiosSecure();
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [short, setShort]=useState('');
  const [search, setSearch]=useState('');

  useEffect(() => {
    axiosSecure
      .get(`/all-rooms?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&short=${short}&search=${search}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [axiosSecure, currentPage, itemsPerPage, filter, search]);

  useEffect(() => {
    axiosSecure
      .get(`/rooms-count?filter=${filter}`)
      .then((res) => {
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [axiosSecure, filter]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationBtn = (value) => {
    setCurrentPage(value);
  };

  const handleSearch=e=>{
    e.preventDefault()
    const text =e.target.search.value
    setSearch(text);
  }

  const handleReset=()=>{
    setFilter('')
    setShort('')
    search('')
  }
  return (
    <>
      <div>this axios</div>
      <section className="mb-10">
        <div className='flex flex-col md:flex-row justify-center items-center gap-5'>
          <div>
            <select
              onChange={e => setFilter(e.target.value)}
              name='category'
              id='category'
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value='Countryside'>Countryside</option>
              <option value='Desert'>Desert</option>
              <option value='Beach'>Beach</option>
            </select>
          </div>
          <form onSubmit={handleSearch}>
            <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />
              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          <div>
            <select
            onChange={e=>{
              setShort(e.target.value)
              setCurrentPage(1)
            }}
            value={short}
              name='sort'
              id='sort'
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button onClick={handleReset} className='btn'>
            Reset
          </button>
        </div>
      </section>
      <ul className="grid grid-cols-3 gap-3">
        {data.map((item, index) => (
          <div key={index} className="border shadow-md rounded-lg p-3">
            <div>
              <h1>{item.title}</h1>
              <h1>
                <span className="font-bold">Category: </span> {item.category}
              </h1>
              <img className="rounded-md" src={item?.image} alt="" />
              <h1><span className="font-bold">Price:</span> ${item?.price}</h1>
              <h1>{item?.description}</h1>
            </div>
          </div>
        ))}
      </ul>
      <div className='flex justify-center mt-12'>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationBtn(currentPage - 1)}
          className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white'
        >
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>
            <span className='mx-1'>previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map(btnNum => (
          <button
            key={btnNum}
            onClick={() => handlePaginationBtn(btnNum)}
            className={`hidden ${currentPage === btnNum ? "bg-blue-500 text-white" : ""} px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationBtn(currentPage + 1)}
          className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
        >
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}

export default App;
