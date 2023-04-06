import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../../actions/userAction';
import { Table } from 'react-bootstrap'
import Loader from './../Loader'
import Error from './../Loader'
import { AiFillDelete } from 'react-icons/ai'

const UserList = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.getAllUsersReducer)
    const { loading, error, users } = userState;
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])
    return (
        <>
            <h1>UserList</h1>
            {loading && <Loader></Loader>}
            {error && <Error error="user fetch error!"></Error>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><AiFillDelete style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => { dispatch(deleteUser(user._id)) }}></AiFillDelete></td>

                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </>
    )
}

export default UserList
