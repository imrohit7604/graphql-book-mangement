import {useQuery,gql} from "@apollo/client"
import { useEffect } from "react";

const BOOKS_DETAILS=gql`
{
 books{
      name,
      id,
      genre
    }
  }
`;
function BookList() {
    const {loading,error,data}=useQuery(BOOKS_DETAILS)
    useEffect(()=>{
        console.log("data",data)
        console.log("loading",loading)
        console.log("error",error)
    },[loading,error,data])
    if(loading)
    return <div>Loading</div>
    return (
        <div >
            <ul id="book-list">
                {
                    data.books.map(({id,name})=><li key={id}>{name}</li>)
                }
              
            </ul>
        </div>
    )
}

export default BookList
