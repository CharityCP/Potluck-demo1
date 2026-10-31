import 
{ useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
      useEffect(() => {
        async function fetchMeals(){
        const { data, error } = await supabase
        .from('meals')
        .select('*');  

        if (error) {
          console.error('Error fetching meals: ', error);
          setErrorMessage('Unable to load meals...');
          setLoading(false);
          return;
        }       

        setMeals(data);
        setLoading(false);
      }
       fetchMeals();
      }, []);
      
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
          return;
        }
        form.reset();
        window.location.reload();  
      }

      async function removeMeal(id) {
        
      }
    return (
    <main>
      <h1> Potluck Extraordinaire </h1>
      {loading && <p>Loading Meals...</p>}
      {!loading && !errorMessage && meals.length === 0 &&
       <p> No Meals Found</p>}
       {errorMessage && <p>{errorMessage}</p>}
       <div className="meal-grid">
      {meals.map((meal) => (
        <article key={meal.id}>
      <p key={meal.id}>{meal.name} - 
      {meal.guest} - {meal.servings} servings - Ingredients: 
      {meal.ingredients?.join(',') || 
      'Ingredients not listed'}</p>
      </article>
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