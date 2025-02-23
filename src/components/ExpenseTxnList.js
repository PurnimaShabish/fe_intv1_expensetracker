import React , {useState, useEffect} from "react";
import "./ExpenseTracker.css";

import ExpenseCard from "./ExpenseCard";
import ExpensePagination from "./ExpensePagination";
import ReactModal from 'react-modal';
import ExpenseAddEdit from "./ExpenseAddEdit";

const ExpenseTxnList = (
        {showExpenseModal, 
        setShowExpenseModal, 
        expenseList, 
        setExpenseList,
        walletBalance, 
        setWalletBalance,
        }
    ) => {

    const [editId, setEditId] = useState(0);
    // const [isDisplayEditor, setIsDisplayEditor] = useState(false)
    const [currentTransactions, setCurrentTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const maxRecords = 3;
    const [totalPages, setTotalPages] = useState(0)

    const handleDelete = (id) => {
        const transaction = expenseList.find(txn => txn.id == id);
        const cost = Number(transaction.amount);
        setWalletBalance((prev) => prev + cost);

        setExpenseList((prev) => (
            prev.filter(i => i.id != id)
        ));
    }

    const handleEdit = (id) => {
        setEditId(id);
        setShowExpenseModal(true);
    }

    useEffect(() => {
        const startIdx = (currentPage - 1) * maxRecords;
        const endIdx = Math.min(currentPage*maxRecords , expenseList.length);

        setCurrentTransactions([...expenseList].slice(startIdx,endIdx));
        setTotalPages(Math.ceil(expenseList.length / maxRecords));
    },[currentPage, expenseList]);

    //if all txns in a single page are deleted then we need to update the currentPage and totalPages data
    useEffect(() => {
        if((totalPages < currentPage) && (currentPage > 1)){
            setCurrentPage((prev) => prev-1);
        }
    },[totalPages]);

    return (
        <>
            {expenseList.length> 0 ? 
                (<>
                    <div>
                        {currentTransactions.map(transaction => (
                            <ExpenseCard
                                details={transaction}
                                key={transaction.id}
                                handleDelete={() => handleDelete(transaction.id)}
                                handleEdit={() => handleEdit(transaction.id)}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && 
                    (<ExpensePagination 
                        updatePage={setCurrentPage} 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                    />)}
                </>):
                (
                <>
                    <p>No transactions!</p>
                </>
                ) 
            }  
            
            {showExpenseModal?
            (<ExpenseAddEdit
                showExpenseModal = {showExpenseModal}
                setShowExpenseModal = {setShowExpenseModal} 
                expenseList = {expenseList} 
                setExpenseList = {setExpenseList}
                walletBalance = {walletBalance} 
                setWalletBalance = {setWalletBalance}    
                editId={editId}                        
            />)
            :null}
        </>
    )
}

export default ExpenseTxnList;