function MealCard({ meal, removeMeal}) {
    return(
        <article>
            <h3>{meal.name}</h3>
            <p>Guest: {meal.guest}</p>
            <p>Servings: {meal.servings}</p>
            <p>
                Ingredients: {meal.ingredients?.join(', ') || 'Not Listed'}
            </p>
            <button onClick={()  => removeMeal(meal.id)}>REMOVE</button>
        </article>
    );
}

export default MealCard