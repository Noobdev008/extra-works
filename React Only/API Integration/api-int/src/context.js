
import React, { useContext, useEffect, useReducer } from 'react';
import { reducer } from './Reducer';


const Api = "https://hn.algolia.com/api/v1/search?"
const initialState = {
    isLoading: true,
    query: "html",
    nbPages: 0,
    page: 0,
    hits: []
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)


    const fetchAapiData = async (Api) => {

        dispatch({ type: "SET_LOADING" })

        try {
            const res = await fetch(Api)
            const data = await res.json()
            // console.log(data);
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    // remove post 
    const removePost = async (objectID) => {
        const res = await fetch(Api)
        const data = await res.json()
        dispatch({
            type: 'REMOVE_POST',
            payload: {
                objectID,
                nbPages: data.nbPages - 1,
            }
        })
    }


    // search post 

    const searchPost = (searchQuery) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: searchQuery
        })
    }

    // pagination

    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE"
        })
    }

    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE"
        })
    }


    useEffect(() => {
        // fetchAapiData(`${Api}query=${state.query}&page=${state.pages}`)
        fetchAapiData(`${Api}query=${state.query}&page=${state.page}`)
    }, [state.query, state.page])

    return (
        <AppContext.Provider
            value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}>
            {children}
        </AppContext.Provider >
    )


}


// custom hook

const useGlobalContext = () => {
    return useContext(AppContext)
}



export { AppContext, AppProvider, useGlobalContext }