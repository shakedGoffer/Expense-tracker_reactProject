import React, { useEffect, useRef, useState } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 function --> uniq id (for the list items)
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddPage({ list, setList, setPage }) {

    const formRef = useRef(null);

    // item state
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [selectedOption, setSelectedOption] = useState("");
    const handleOptionChange = event => {
        setSelectedOption(event.target.value);
    };

    // return current date (day,month,year)
    const getCurrentDate = () => {
        const currentDate = new Date();
        // Extract individual date components
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const date = { day: day, month: month, year: year };
        return date;
    }

    // date state
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(getCurrentDate());

    // when date picker date changes, update startDate and date (state)
    const onDatePickerChange = (PDate) => {
        setStartDate(PDate); // Update the DatePicker state
        // Update the date object
        const updatedDate = {
            day: PDate.getDate(),
            month: PDate.getMonth() + 1,
            year: PDate.getFullYear()
        };
        setDate(updatedDate);
    };

    // clear form (e)
    const resetForm = (e) => {
        e.target.reset();
        setSelectedOption("");
        setAmount(0);
        setDescription("");
        setCategory("");
        setStartDate(new Date());
        setDate(getCurrentDate());
        formRef.current.reset();
    }

    // handle submit click --> check form + pushes item (id, amount, selectedOption, category, description, dat) to list
    const handleSubmit = async (e) => {
        e.preventDefault();
        /* only if the user select a radio option and add many amount --> submit */
        if ((selectedOption == "income" || selectedOption == "expense") && amount > 0) {

            const uniqueId = uuidv4(); // Generate a unique ID using uuidv4
            let item = {
                id: uniqueId,
                amount: amount,
                selectedOption: selectedOption,
                category: category,
                description: description,
                date: date
            };

            // update list
            let tempList = [...list];
            tempList.push(item);
            setList(tempList);

            /* show success toast */
            toast("✏️ " +selectedOption + ' added successfully', {
                toastId: "toastAdd",// prevents duplications
                className: "text-capitalize",
                closeButton: false,
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            /* return to home page after submit */
            setPage("HomePage");

            /* formRef.current.reset(); resetForm(e); // clare form after submitting 
            window.location.reload(false); // reload window (back to home page)*/
        }
    }

    useEffect(() => {
        // Update local storage whenever the list state changes
        localStorage.setItem("list", JSON.stringify(list));
    }, [list]);


    return (
        <div className="addPage container py-3">
            <form ref={formRef} className='px-1' onReset={(e) => resetForm(e)} onSubmit={(e) => { handleSubmit(e) }} >
                <h2 className='text-capitalize '>Add {selectedOption}</h2>

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
                </div>

                <div className={`form-group selectDiv p-0 ${selectedOption == "expense" ? 'showExpense_Categories' : ''}`}>
                    <label htmlFor="Categories">Category<RequiredInput /></label>
                    <select className="form-select text-capitalize" id="Categories" required={selectedOption === "expense"} onChange={(e) => { setCategory(e.target.value) }}>
                        <option defaultValue value="">Select a category</option>
                        <option value="Fun">Fun</option>
                        <option value="Sports & Gym">Sports & Gym</option>
                        <option value="Food & Drinks">Food & Drinks</option>
                        <option value="Clothing & Shoes">Clothing & Shoes</option>
                        <option value="Medical & Healthcare">Medical & Healthcare</option>
                        <option value="Home & Utilities">Home & Utilities</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Gifts">Gifts</option>
                        <option value="Other">Other</option>
                        <option value="No Category">No Category</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="Amount">Amount<RequiredInput /></label>
                    <input type="number" className="form-control" id="Amount" onChange={(e) => { setAmount(e.target.value) }} required></input>
                </div>

                <div className="form-group row">
                    <label >Date<RequiredInput /></label>
                    <div>
                        <DatePicker className='form-control' required closeOnScroll={true} selected={startDate}
                            onChange={(PDate) => { onDatePickerChange(PDate) }} maxDate={addDays(new Date(), 0)} placeholderText="Select a date"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="Description">Description</label>
                    <textarea className="form-control" id="Description" rows="3" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                </div>

                <button type="submit" className="btn btn-lg btn-primary my-3 mr-2 p-1 px-3" >Submit</button>
                <button type="reset" className="btn btn-lg btn-primary m-3 p-1 px-3">Clear</button>
            </form>
        </div>
    );
}

function RequiredInput() {
    return (
        <span className='text-danger p-0 m-1'>*</span>
    );
}

export default AddPage;