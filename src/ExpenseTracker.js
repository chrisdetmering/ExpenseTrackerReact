import './ExpenseTracker.css';
import {useState} from "react"; 
import {useEffect} from "react"; 
import {Expense} from "./Expense"; 

export function ExpenseTracker() {
    const [label, setLabel] = useState(""); 
    const [cost, setCost] = useState(""); 
    const [date, setDate] = useState(""); 
    const [expenses, setExpenses] = useState([]);

  useEffect(() => { 
    const savedExpenses = getSavedExpenses(); 
    setExpenses(savedExpenses); 
  }, [])


  function handleLabelChange(e) { 
    setLabel(e.target.value); 
  }

  function handleCostChange(e) { 
    setCost(e.target.value); 
  }

  function handleDateChange(e) { 
    setDate(e.target.value); 
  }

  function getSavedExpenses() { 
    return JSON.parse(localStorage.getItem("expenses")) || []; 
  }

  function saveExpense(expense) { 
    const savedExpenses = getSavedExpenses(); 

    localStorage.setItem("expenses", JSON.stringify([...savedExpenses, expense]))
  }

  function deleteExpense(id) { 
    const savedExpenses = getSavedExpenses(); 
    const newExpenses = savedExpenses.filter(expense => expense.id !== id); 
    setExpenses(newExpenses);
    localStorage.setItem("expenses", JSON.stringify(newExpenses))
  }

  function addExpense() { 
    const newExpense = { 
      id: Math.random(), 
      label, 
      cost, 
      date, 
    } 
    
    setExpenses([...expenses, newExpense]);
    saveExpense(newExpense)
    setLabel(""); 
    setCost("");
    setDate("");
  }


  const displayedExpenses = <ul>{expenses.map(expense => { 
    return ( <Expense 
      key={expense.id} 
      expense={expense}
      deleteExpense={() => deleteExpense(expense.id)}/> )
  })}</ul>

  return (<>
    <label>
      Label
    <input 
      type="text" 
      onChange={handleLabelChange} 
      value={label}
    ></input>
    </label>

    <label>
      Cost
    <input 
      type="number"
      onChange={handleCostChange}
      value={cost}></input>
    </label>

    <label>
      Date
    <input 
      type="date"
      onChange={handleDateChange}
      value={date}></input>
    </label>

    <button onClick={addExpense}>Add Expense</button>
    {displayedExpenses}
  </>);
}


