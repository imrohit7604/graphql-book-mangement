import {useQuery} from "@apollo/client"
import { useState } from "react"
import {getBooksQuery}  from "../queries/queries"
import BookDetails from "./BookDetails";
function BookList() {
    const [selectedBook,setSelectedBook]=useState(null);
    const {loading,data}=useQuery(getBooksQuery)

    if(loading)
    return <div>Loading</div>
    return (
        <div >
            <ul id="book-list">
                {
                    data.books.map(({id,name})=><li key={id} onClick={()=>setSelectedBook(id)}>{name}</li>)
                }
            </ul>
            <BookDetails bookId={selectedBook}/>
        </div>
    )
}

export default BookList
