import React, { useEffect, useRef, useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 function --> uniq id (for the list items)

function AddCategoryPage() {

    const formRef = useRef(null);

    //error message (true = if unveiled show)
    const [error, setError] = useState(false);

    // item state + category list
    const [categoryList, setCategoryList] = useState(() => { const storedList = JSON.parse(localStorage.getItem('categoryList')); return Array.isArray(storedList) ? storedList : []; }); // list from local storage or [] as a default
    const [categoryName, setCategoryName] = useState("");
    const [categoryColor, setCategoryColor] = useState("#000000");
    const [selectedOption, setSelectedOption] = useState("");
    const handleOptionChange = event => {
        setSelectedOption(event.target.value);
        setError(false);
    };

    // clear form (e)
    const resetForm = (e) => {
        setCategoryName("");
        setCategoryColor("#000000");
        setError(false);
        formRef.current.reset();
    }

    // handle submit click --> check form + pushes item (id, categoryName, selectedOption, categoryColor) to list
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(true);

        /* only if the user select a radio option and add valid category name & color --> submit */
        if (categoryList.filter(item => item.selectedOption === selectedOption).length < 4 && !categoryList.some(item => item.categoryColor === categoryColor) && !categoryList.some(item => item.categoryName === categoryName)) {

            const uniqueId = uuidv4(); // Generate a unique ID using uuidv4
            let item = {
                id: uniqueId,
                categoryName: categoryName,
                selectedOption: selectedOption,
                categoryColor: categoryColor
            };

            // update list
            let tempList = [...categoryList];
            tempList.push(item);
            setCategoryList(tempList);

            // Reset the form fields
            formRef.current.reset();
        }
    }

    useEffect(() => {
        // Update local storage whenever the list state changes
        localStorage.setItem("categoryList", JSON.stringify(categoryList));
    }, [categoryList]);


    /* delete item (triggers MonthList update + local storage update) */
    const deleteItem = (item) => {
        const updatedList = categoryList.filter((listItem) => listItem !== item); // Use the filter method to create a new list without the item to be deleted
        setCategoryList(updatedList);  // Update the state with the new list
    }

    return (
        <div className='container py-3'>
            <form ref={formRef} className=' px-1' onSubmit={(e) => { handleSubmit(e) }} onReset={(e) => resetForm(e)}>
                <h2 className='text-capitalize'>Add category</h2>

                <div className="form-group">
                    <label className="p-0 m-0">Type<RequiredInput /></label>
                    <div className="buttons d-flex justify-content-between text-center ">
                        <input className='expense rounded col-6  text-center' label="Expense" type="radio" name="selectOption" value="expense" onClick={(e) => handleOptionChange(e)} onKeyDown={(e) => handleOptionChange(e)} onChange={(e) => handleOptionChange(e)} required ></input>
                        <input className='income rounded col-6  text-center' label="Income" type="radio" name="selectOption" value="income" onClick={(e) => handleOptionChange(e)} onKeyDown={(e) => handleOptionChange(e)} onChange={(e) => handleOptionChange(e)} required ></input>

                        {/* 
                    <div className="px-2">
                    <div className="form-check">
                        <label id='btnAddIncome' className={`form-check-label text-success ${selectedOption === 'income' ? 'active' : ''}`}>income
                            <input className='form-check-input text-bg-success' type="radio" name="selectOption" value="income" onChange={handleOptionChange} required ></input>
                        </label>
                    </div>

                    <div className="form-check">
                        <label id='btnAddExpense' className={`form-check-label text-danger ${selectedOption === 'expense' ? 'active' : ''}`}>expense
                            <input className='form-check-input text-bg-danger' type="radio" name="selectOption" value="expense" onChange={handleOptionChange}  ></input>
                        </label>
                    </div> </div> */}

                    </div>

                    {/* show error message if categoryName already exists in categoryList */}
                    {categoryList.filter(item => item.selectedOption === selectedOption).length >= 4 && error ? <div className="text-danger mx-1">You can add up to 4 {selectedOption} categories</div> : null}

                </div>


                <div className="form-group">
                    <label htmlFor="Name">Category Name<RequiredInput /></label>
                    <input type="text" className="form-control text-capitalize" id="Name" onChange={(e) => { setCategoryName(e.target.value); setError(false); }} required></input>

                    {/* show error message if categoryName already exists in categoryList */}
                    {categoryList.some(item => item.categoryName === categoryName) && error ? <div className="text-danger mx-1">Category Name already exists</div> : null}

                </div>


                <div className="form-group">
                    <label className="col-12" htmlFor="Color">Category Color<RequiredInput /></label>
                    <div className="form-control text-capitalize d-inline-flex align-items-center w-auto">
                        <input type="color" className="text-capitalize border-0 p-0 col-auto " id="Color" value={categoryColor} onChange={(e) => { setCategoryColor(e.target.value); setError(false); }} required></input>
                        <span className=" px-2 " >{categoryColor}</span>
                    </div>

                    {/* show error message if category color already exists in categoryList */}
                    {categoryList.some(item => (item.categoryColor === categoryColor)) && error ? <div className="text-danger mx-1">Category Color already exists</div> : null}

                </div>

                <button type="submit" className="btn btn-lg btn-primary my-3 mr-2 p-1 px-3" >Submit</button>
                <button type="reset" className="btn btn-lg btn-primary m-3 p-1 px-3">Clear</button>
            </form>

            <div className='mt-5'>
                <div className='col-10 border-bottom border-2 fs-4 text-success'>Income Categories</div>
                <AllCategories categoryList={categoryList.filter(item => item.selectedOption === 'income').reverse()} deleteItem={deleteItem} />
            </div>

            <div className='mt-5'>
                <div className='col-10 border-bottom border-2 fs-4 text-danger'>Expense Categories</div>
                <AllCategories categoryList={categoryList.filter(item => item.selectedOption === 'expense').reverse()} deleteItem={deleteItem} />
            </div>

        </div>
    );
}

function RequiredInput() {
    return (
        <span className='text-danger p-0 m-1'>*</span>
    );
}

function AllCategories({ categoryList, deleteItem }) {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className='div_historyList'>
            <ul className='list-group mt-3 history'>
                {/* Map over array */}
                {categoryList.map((item, index) => (
                    <CategoryItem key={index} item={item} onItemClick={(item) => { setSelectedItem(item) }} />
                ))}
            </ul>

            {/* Item details box */}
            {selectedItem && (<ItemDetailsBox item={selectedItem} onClose={() => { setSelectedItem(null) }} deleteItem={deleteItem} />)}

        </div>
    );
}

{/* History item (income / expenses) */ }
function CategoryItem({ item, onItemClick }) {
    const { id, selectedOption, categoryName, categoryColor } = item;

    return (
        <li className={` rounded p-3 my-2 bg-white shadow`} style={{ borderColor: categoryColor }} key={id} onClick={() => onItemClick(item)}>
            <div className='row justify-content-between'>
                <div className='col fs-5 text-lowercase prevent-overflow'>{categoryName}</div>
                <div className={`col-auto fs-5 prevent-overflow`} style={{ color: (categoryColor == "#ffffff" ? "#000000" : categoryColor) }} >{categoryColor}</div>
                <div id="Color" style={{ backgroundColor: categoryColor }} className='rounded mx-2 border border-dark ' ></div>
            </div>
        </li>
    );
}


{/* on history item click a pop up box show withe all the item details */ }
function ItemDetailsBox({ item, onClose, deleteItem }) {
    const { id, selectedOption, categoryName, categoryColor } = item;

    // Handle clicking outside the box to close the pop-up
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains('item-details-box-overlay')) {
                onClose();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className='item-details-box-overlay'>
            <div className='item-details-box p-4 col-11 col-sm-5 bg-white mt-5 rounded'>
                <div className='row  fs-3'>
                    {/* box title */}
                    <div className='title col center-vertically'>Item Details</div>
                    {/* box close button */}
                    <button className='btn btn-light text-secondary border-0 col-auto btn-lg ' onClick={onClose}>X</button>
                </div>

                {/* box Details */}
                <div className='details mt-3 fs-6 fw-bold'>
                    <div>Category Type: <ItemDetailsText text={selectedOption} /> </div>
                    <div>Category Name: <ItemDetailsText text={categoryName} /></div>
                    <div>Category Color: <ItemDetailsText text={categoryColor} /></div>
                    <div>ID: <ItemDetailsText text={id} /></div>
                </div>

                <button className='btn btn-danger mt-3 ' onClick={() => { deleteItem(item); onClose(); }}>Delete Item</button>
            </div>
        </div>
    );
}

{/* detail text (style different) */ }
function ItemDetailsText({ text }) {
    return (
        <span className='fw-normal text-break single-line-ellipsis'>{text}</span>
    );
}


export default AddCategoryPage