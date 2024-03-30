import React from 'react'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books')
        .then((res) => {
            setBooks(res.data.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);
  return (
    <div className='p-4'>
        <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Book List</h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl'/>
            </Link>

            {loading ? <Spinner /> : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                        <th className='border p-2'>No.</th>
                            <th className='border p-2'>Title</th>
                            <th className='border p-2'>Author</th>
                            <th className='border p-2'>Publish Year</th>
                            <th className='border p-2'>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book,index) => (
                            <tr key={book._id} className='h-8'>
                                <td className='border p-2'>{index + 1}</td>
                                <td className='border p-2'>{book.title}</td>
                                <td className='border p-2'>{book.author}</td>
                                <td className='border p-2'>{book.publishYear}</td>
                                <td className='border p-2'>
                                    <Link to={`/books/details/${book._id}`}>
                                        <BsInfoCircle className='text-sky-800 text-2xl mx-2'/>
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`}>
                                        <AiOutlineEdit className='text-sky-800 text-2xl mx-2'/>
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`}>
                                        <MdOutlineDelete className='text-sky-800 text-2xl mx-2'/>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
      
    </div>
  )
}

export default Home
