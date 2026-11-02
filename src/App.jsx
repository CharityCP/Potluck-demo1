import { supabase } from './supabaseClient';
import MealCard from './MealCard';
import {useTable} from './useTable';

function App() {
  const {
    rows,
    setRows,
    loading: tableLoading,
    errorMessage: tableError,
  } = useTable('meals');


      
      async function addMeal (event) {
        event.preventDefault();
        const form= event.target;
        const formData = new FormData(form);
        const name = formData.get('name');
        const guest = formData.get('guest');
        const servings = Number(formData.get('servings'));
        const newMeal = {
          name,guest,servings
             };
        const {error} = await supabase
        .from('meals')
        .insert([newMeal]);

        if (error) {
          console.error('Error adding meal:', error);
          alert('Unable to add meal. Please try again.');
          return;
        }
        form.reset();
        window.location.reload();  
      }

      async function removeMeal(id) {
        const {error} = await supabase
             .from('meals')
             .delete()
             .eq('id', id);
        if (error) {
          console.error('Error removing meal:', error);
          alert('Unable to add remove meal. Please try again.');
          return;
           }
            setRows((currentRows) =>
            currentRows.filter((meal) => meal.id !==id)
          );
        }
      
    return (
    <main>
      <h1> Potluck Extraordinaire </h1>
      {tableLoading && <p>Loading Meals...</p>}
      {!tableLoading && !tableError && rows.length === 0 &&
       <p> No Meals Found</p>}
       {tableError && <p>{tableError}</p>}
       <div className="meal-grid">
      {rows.map((meal) => (
        <MealCard
        key={meal.id}
        meal={meal}
        removeMeal={removeMeal}
        />
    ))}
    </div>
    <form onSubmit={addMeal}>
      <label htmlFor="mealName">Meal Name</label>
      <input
      type="text"
      id="mealName"
      name="name"
      placeholder="Enter a dish name..."
      required/>

       <label htmlFor="guestName">Guest Name</label>
      <input
      type="text"
      id="guestName"
      name="guest"
      placeholder="Enter guest name..."
      required/>

       <label htmlFor="servings">Number of Servings</label>
      <input
      type="number"
      id="servings"
      name="servings"
      placeholder="Enter Servings amount here..."
      min="1"
      required/>
      <button type="submit"> Add Meal</button>

    </form>
    </main>
  )
}

export default App