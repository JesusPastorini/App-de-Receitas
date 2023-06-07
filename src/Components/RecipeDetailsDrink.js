import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../styles/RecipeDetails.module.css';
import Loading from './Loading';
import PlayerYoutube from './PlayerYoutube';
import { getDrinkRecipeWithId,
  getFoodsRecomendatios } from '../services/fetchFunctions';
import { extractIngredientsFunction } from '../services/extractIngredientsFunction';

function RecipeDetailsDrink() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const [recomendations, setRecomendations] = useState([]);
  // idFood = 52977
  // idDrink = 15997

  useEffect(() => {
    const getRecipe = async () => {
      const drinkRecipe = await getDrinkRecipeWithId(id);
      setRecipe(drinkRecipe);

      const recomendationsRecipes = await getFoodsRecomendatios();
      setRecomendations(recomendationsRecipes);

      setIsLoading(false);
    };
    getRecipe();
  }, [history, id]);

  console.log(recipe);

  return isLoading ? (<Loading />) : (
    <main>
      <img
        className={ styles.imgRecipe }
        src={ recipe.strDrinkThumb }
        alt="Recipe Preview"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { recipe.strDrink}
      </h1>
      <h2
        data-testid="recipe-category"
      >
        { recipe.strAlcoholic}

      </h2>
      <section>
        { extractIngredientsFunction(recipe)
          .map(({ ingredient, measure }, index) => (
            <div key={ index }>
              <span
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {measure ? (`${measure} ${ingredient}`) : (ingredient)}
              </span>
            </div>
          ))}
      </section>
      <section
        data-testid="instructions"
      >
        {recipe.strInstructions}
      </section>
      {recipe.strYoutube && (
        <section
          data-testid="video"
        >
          <PlayerYoutube
            linkVideo={ recipe.strYoutube }
          />
        </section>
      )}
      <section
        className={ styles.divRecomendations }
      >
        <h2>Recomendations</h2>
        {recomendations.map(({ strMealThumb, strMeal }, index) => {
          const numberMinRecipes = 6;
          if (index < numberMinRecipes) {
            return (
              <div
                key={ index }
                className={ styles.imgRecipeRecomendation }
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  src={ strMealThumb }
                  alt="Recommended Recipe Preview"
                  className={ styles.imgRecipe }
                />
                <h2
                  data-testid={ `${index}-recommendation-title` }
                >
                  {strMeal}
                </h2>
              </div>
            );
          }
          return null;
        })}
      </section>
    </main>
  );
}

export default RecipeDetailsDrink;
