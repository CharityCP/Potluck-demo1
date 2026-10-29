import 
{ useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [meals, setMeals] = useState([]);
      useEffect(() => {
        async function fetchMeals(){
        const { data, error } = await supabase
        .from('meals')
        .select('*');  

        if (error) {
          console.error('Error fetching meals: ', error);
          return;
        }       

        setMeals(data);
      }
       fetchMeals();
      }, []);
      
    return (
    <main>
      <h1> Potluck Extrodinaire 

      </h1>
    </main>
  )
}

export default App