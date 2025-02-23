import React , {useState, useEffect} from "react";
import "./ExpenseTracker.css";
import ExpenseDisplay from "./ExpenseDisplay";
import ExpensePieChart from "./ExpensePieChart";
import ExpenseAddBalance from "./ExpenseAddBalance";
import ExpenseAddEdit from "./ExpenseAddEdit";
import ExpenseTxnList from "./ExpenseTxnList";
import ExpenseBarChart from "./ExpenseBarChart";

const ExpenseTracker = () => {

    const [walletBalance, setWalletBalance] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [expenseList, setExpenseList] = useState([]);

    const [showBalanceModal, setShowBalanceModal] = useState(false);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [currentExpense, setCurrentExpense] = useState(null);
    const [isMounted,setIsMounted] = useState(false);


    const [categorySpends, setCategorySpends] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
      });
      const [categoryCount, setCategoryCount] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
      });

    // 1st useEffect for initial render useEffect(() => {code/logic to be performed} , [] (blank array signifying only one time render of useEffect))
    useEffect(() => {
        const savedWalletBalance = localStorage.getItem("walletBalance");
        const savedExpenseList = localStorage.getItem("expenseList");

        if (savedWalletBalance){
            setWalletBalance(JSON.parse(savedWalletBalance));
        }else{
            setWalletBalance(5000);
            localStorage.setItem("walletBalance",5000);
        }

        if (savedExpenseList){
            setExpenseList(JSON.parse(savedExpenseList));
        }

        setIsMounted(true);

    }, []);

    useEffect(() => {
        if (isMounted) {
          localStorage.setItem("walletBalance", walletBalance);
        }
    }, [walletBalance]);


    useEffect(()=>{
        if (expenseList.length > 0 || isMounted) {
            localStorage.setItem("expenseList", JSON.stringify(expenseList));
        }

        let foodSpends = 0,
            entertainmentSpends = 0,
            travelSpends = 0;

        let foodCount = 0,
            entertainmentCount = 0,
            travelCount = 0;

        expenseList.forEach((item) => {
        if (item.category == "food") {
            foodSpends += Number(item.price);
            foodCount++;
        } else if (item.category == "entertainment") {
            entertainmentSpends += Number(item.price);
            entertainmentCount++;
        } else if (item.category == "travel") {
            travelSpends += Number(item.price);
            travelCount++;
        }
        });

        setCategorySpends({
        food: foodSpends,
        travel: travelSpends,
        entertainment: entertainmentSpends,
        });

        setCategoryCount({
        food: foodCount,
        travel: travelCount,
        entertainment: entertainmentCount,
        });

    },[expenseList]);

    return(
        <div className="main-container">
            <h1 className="heading-title" style={{color:"white", textAlign:"left", marginTop:"10px", margin:"10px"}}>Expense Tracker</h1> 
            <div className="card-container">
                <div className="card">
                    <h3><span style={{ color: "white", fontSize: "28px" }}>
                            Wallet Balance: 
                        <span style={{color:"#adf802"}}>
                            ₹{walletBalance}
                        </span>
                        </span>
                    </h3>
                    <button className="button success" onClick={()=>{setShowBalanceModal(true)}}> 
                        + Add Income 
                    </button>
                    {showBalanceModal?
                        (<ExpenseAddBalance setWalletBalance = {setWalletBalance}
                            showBalanceModal = {showBalanceModal}
                            setShowBalanceModal = {setShowBalanceModal}
                        />):null}
                </div>
                <div className="card">
                    <h3>
                        <ExpenseDisplay expenseList={expenseList} />
                    </h3>
                    <button className="button failure" onClick={()=>setShowExpenseModal(true)}> 
                        + Add Expense 
                    </button>                            
                    {showExpenseModal?
                        (<ExpenseAddEdit
                            showExpenseModal = {showExpenseModal}
                                setShowExpenseModal = {setShowExpenseModal} 
                                expenseList = {expenseList} 
                                setExpenseList = {setExpenseList}
                                walletBalance = {walletBalance} 
                                setWalletBalance = {setWalletBalance}                            
                        />)
                        :null}
                </div>
                <div className="card pieChart-container">
                    
                    <ExpensePieChart
                        data={[
                        { name: "Food", value: categorySpends.food },
                        { name: "Entertainment", value: categorySpends.entertainment },
                        { name: "Travel", value: categorySpends.travel },
                        ]}
                    />
                    
                </div>

            </div>

            <div className="transaction-container">
                <div className="recent_txns_main">
                    <h2 className="txn-sec-heading">Recent Transactions</h2>
                    <div className="txn-display">
                    <ExpenseTxnList 
                        showExpenseModal = {showExpenseModal} 
                        setShowExpenseModal = {setShowExpenseModal} 
                        expenseList = {expenseList} 
                        setExpenseList = {setExpenseList}
                        walletBalance = {walletBalance} 
                        setWalletBalance = {setWalletBalance}
                    />
                    </div>
                </div>
                <div className="top_expenses_main">
                    <h2 className="txn-sec-heading">Top Expenses</h2>
                    <div className="txn-display">
                        <ExpenseBarChart
                            data={[
                            { name: "Food", value: categorySpends.food },
                            { name: "Entertainment", value: categorySpends.entertainment },
                            { name: "Travel", value: categorySpends.travel },
                            ]}
                        />
                    </div>
                </div>
            </div>

        </div>
    )

}

export default ExpenseTracker;