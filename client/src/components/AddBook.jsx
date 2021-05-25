import {useQuery,useMutation} from "@apollo/client"
import { useState } from "react";
import {getAuthorsQuery,addBookMutation,getBooksQuery} from "../queries/queries"

function AddBook() {
    const {loading,data}=useQuery(getAuthorsQuery);
    const [addBook]=useMutation(addBookMutation)
    const [formState,setFormState]=useState({
        name:"",
        genre:"",
        authorId:""
    })

    const handleChange=(event)=>{
       setFormState({
            ...formState,
            [event.target.id]:event.target.value
        })
    }

    const getAuthors=()=>{
        if(loading)
        return (<option disabled>Loading...</option>)
        else
        return (data.authors.map(({id,name})=>(
            <option key={id} value={id}>{name}</option>
        )))
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
      if(vaildation(formState))
         addBook({variables:{
            name:formState.name,
            genre:formState.genre,
            authorId:formState.authorId
        },
        refetchQueries:[{query:getBooksQuery}]
        })

    }

    const vaildation=({name,genre,authorId})=>{
        if(name.trim()&&genre.trim()&&authorId.trim())
        return true;
        else
        return false;
    }

    return (
        <form id="add-book">
            <div className="field">
                <label>
                    Book Name:
                </label>
                <input value={formState.name} type="text" id="name" onChange={handleChange}/>
            </div>
            <div className="field">
                <label>
                    Genre :
                </label>
                <input value={formState.genre} type="text" id="genre" onChange={handleChange}/>
            </div>
            <div className="field">
                <label>
                    Author:
                </label>
                <select id="authorId" onChange={handleChange}>
                    <option>Select Auhtor</option>
                    {getAuthors()}
                </select>
            </div>
            <button onClick={handleSubmit}>+</button>
        </form>
    )
}

export default AddBook
