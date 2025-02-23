import React from "react";
import "./ExpenseTracker.css"

const ExpenseDisplay = ({expenseList}) => {

    const totalExpense = expenseList.reduce((acc,expense) => {
        return acc+ parseFloat(expense.price);
    },0);

    // setExpenses(totalExpense);

    return(
        <>
            <span style={{ color: "white", fontSize: "28px" }}>
                Expenses: <span style={{color:"orange"}}> ₹{totalExpense} </span>
            </span>
        </>
    )
}

export default ExpenseDisplay;