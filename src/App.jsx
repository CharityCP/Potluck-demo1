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
      
    return (
    <main>
      <h1> Potluck Extraordinaire </h1>
      {loading && <p>Loading Meals...</p>}
      {!loading && !errorMessage && meals.length === 0 &&
       <p> No Meals Found</p>}
       {errorMessage && <p>{errorMessage}</p>}
      {meals.map((meal) => (
      <p key={meal.id}>{meal.name} - 
      {meal.guest} - {meal.servings} servings - Ingredients: 
      {meal.ingredients?.join(',') || 
      'Ingredients not listed'}</p>
    ))}
    </main>
  )
}

export default App