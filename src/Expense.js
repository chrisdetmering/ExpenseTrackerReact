
export function Expense(props) { 
  const {label, cost, date} = props.expense; 

  function capitalizedLabel() { 
   return label[0].toUpperCase() + label.slice(1).toLowerCase();
  } 

  function handleDeleteExpense() { 
    props.onDeleteExpense(); 
  }

  return (<>
      <li>
        <h3>{capitalizedLabel()}</h3>
        <p>Cost: {cost}$</p>
        <p>Date: {date}</p>
        <button 
        onClick={handleDeleteExpense}
        >DELETE</button>
      </li>
    </>)
}

