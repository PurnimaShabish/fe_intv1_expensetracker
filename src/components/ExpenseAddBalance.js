import React,{ useState } from "react";
import { enqueueSnackbar, useSnackbar } from 'notistack';
import ReactModal from 'react-modal';

export default function ExpenseAddBalance({setWalletBalance,showBalanceModal,setShowBalanceModal}){

    console.log("Entered Form Component for Adding Balance");
    
    const [newIncome,setNewIncome] = useState("");

    const handleChange = (e) => {
        setNewIncome(parseInt(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (parseInt(newIncome) < 0) {
            enqueueSnackbar("Income should be greater than 0", { variant: "warning" });
            setShowBalanceModal(false);
            return;
        }

        setWalletBalance(prev => prev + (parseInt(newIncome)));
        setShowBalanceModal(false);
    }

    return(
        <ReactModal className="form-container" 
                    isOpen={showBalanceModal} 
                    onRequestClose={() => setShowBalanceModal(false)}
        >
            <h3>Add Balance</h3>
            <form className="formWrapper" onSubmit={handleSubmit} style={{display:"flex", flexDirection:"row"}}>
                <label className="sr-only">Income:</label>
                <input className="input-txt" type="number" name="income" 
                    placeholder="Income Amount" value={newIncome} onChange={handleChange} required 
                />

                <button className="button"
                    style={{
                    backgroundColor:"orange",
                    width:"40%",
                    height:"40px",
                    margin: "5px 20px",
                    borderRadius:"15px",
                    border:"none",
                    fontFamily: "var(--font-body)",
                    color:"white",
                    textAlign:"center"
                    }} 
                type="submit">
                    Add Balance
                </button>

                <button className="button" 
                        style={{
                        backgroundColor:"grey",
                        width:"20%",
                        height:"40px",
                        borderRadius:"15px",
                        border:"none",
                        fontFamily: "var(--font-body)",
                        color:"white",
                        textAlign:"center"
                        }} 
                onClick={() => setShowBalanceModal(false)}>
                    Cancel
                </button>    
            </form>
        </ReactModal>
    )
}