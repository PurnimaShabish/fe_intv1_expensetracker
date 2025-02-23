import React, {useState, useEffect} from "react";
import ReactModal from 'react-modal';
import "./ExpenseTracker.css";
import { enqueueSnackbar } from "notistack";

export default function ExpenseAddEdit(
                        {showExpenseModal, 
                        setShowExpenseModal, 
                        expenseList, 
                        setExpenseList,
                        walletBalance, 
                        setWalletBalance,
                        editId}
                    ){

    const [formData, setFormData] = useState({title: '', price: '', category: '', date: '' });

    const handleChange = (e) => {
        const name = e.target.name;
        setFormData(prev => ({...prev,[name]:e.target.value}))
    }

    const handleEdit = (e) => {
        e.preventDefault();

        //finding the record from the expenseList that needs to be updated
        const updated = expenseList.map(item => {
            if (item.id == editId) {

                const priceDifference = item.price - Number(formData.price)

                if (priceDifference < 0 && Math.abs(priceDifference) > walletBalance) {
                    enqueueSnackbar("Price should not exceed the wallet balance", { variant: "warning" });
                    setShowExpenseModal(false);
                    return { ...item }
                }

                setWalletBalance(prev => prev + Number(priceDifference));
                return { ...formData, id: editId }
            }
            else {
                return item
            }
        })

        setExpenseList(updated);

        setShowExpenseModal(false);
    }

    const handleAdd = (e) => {
        e.preventDefault();

        if(walletBalance < Number(formData.price)){
            enqueueSnackbar("Price should be less than the wallet balance", { variant: "warning" });
            setShowExpenseModal(false);
            return;
        }

        setWalletBalance(prev => prev - Number(formData.price));

        //generating the id for each of the expenses added to the local storage
        const lastID = expenseList.length > 0? expenseList[0].id : 0;

        //creating an array of the expenses to form the expenseList
        setExpenseList(prev => [{...formData,id:lastID+1}, ...prev]);

        //reset the formData:
        setFormData({
            title: '',
            category: '',
            price: '',
            date: '',
        })

        //close the modal
        setShowExpenseModal(false);
    }

    useEffect(() => {

        if (editId) {
            const expenseData = expenseList.find(item => item.id == editId)

            setFormData({
                title: expenseData.title,
                category: expenseData.category,
                price: expenseData.price,
                date: expenseData.date
            })

        }

    }, [editId])

    return(
        <ReactModal className="form-container" 
                    isOpen={showExpenseModal} 
                    onRequestClose={()=>setShowExpenseModal(false)}
        >
            <h3>{editId ? 'Edit Expense' : 'Add Expenses'}</h3>
            <form className="formWrapper" onSubmit={editId? handleEdit: handleAdd}>

                <div style={{gap:"20px", width:"100%"}}>
                <label  className="sr-only">Title:</label>
                <input  className="input-txt" type="text" 
                        name="title" placeholder="Title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                />

                <label  className="sr-only">Price:</label>
                <input  className="input-txt" type="number" 
                        name="price" placeholder="Price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        required 
                />
                </div>

                <div style={{width:"100%"}}>
                <label  className="sr-only">Category:</label>
                <select className="input-txt" name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        required
                > 
                        <option value='' disabled>Select category</option>
                        <option value='food'>Food</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="travel">Travel</option>
                </select>

                <label  className="sr-only">Date:</label>
                <input  className="input-txt" type="date" name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                />

                </div>

                <div style={{width:"100%"}}>
                <button className="button" 
                        style={{
                            backgroundColor:"orange",
                            width:"35%",
                            height:"40px",
                            margin: "5px 20px",
                            borderRadius:"15px",
                            border:"none",
                            }} 
                        type="submit"
                >
                    {editId ? 'Edit Expense' : 'Add Expense'}
                </button>

                <button className="button" 
                        style={{
                            backgroundColor:"grey",
                            width:"30%",
                            height:"40px",
                            margin: "5px 20px",
                            borderRadius:"15px",
                            border:"none",
                            }} 
                        onClick={()=>setShowExpenseModal(false)}
                >
                    Cancel
                </button>
                </div>
            </form>
        </ReactModal>

    )
}