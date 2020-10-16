import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { isAuthenticated } from '../auth/index';
import { createCategory } from './apiAdmin'
import Layout from '../core/Layout';


const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // destructors user and token from localstorage

    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // make request to api create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(true)
            }
            else {
                setError('');
                setSuccess(true);
            }
        })
    }

    const newCategory = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-success">
                Create Category
                </button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">Category {name} is created</h3>
        }
    }
    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique.</h3>
        }
    }
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning" >Back to Dashboard</Link>
        </div>
    )


    return (
        <Layout
            title="Add a New Category"
            description={`Hello ${user.name} , ready to add new category ?`}
        >

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategory()}
                    {goBack()}
                </div>

            </div>

        </Layout>
    )

}

export default AddCategory;