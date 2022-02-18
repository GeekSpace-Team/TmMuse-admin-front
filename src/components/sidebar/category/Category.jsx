import React from 'react'
import './Category.css'
import CategoryTable from './categoryTable/CategoryTable'

const Category = () => {
    return (
        <div className='content'>
            <div className="categoryTitle">
                <p>Category</p>
            </div>
            <CategoryTable/>
        </div>
    )
}

export default Category
