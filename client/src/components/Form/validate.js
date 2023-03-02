// const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validate = (form) => {
  const error = {};
  if (!form.title) {
    error.titleError = "The title is empty";
  } else if (form.title.trim().length > 30) {
    error.titleError = "The title is very long";
  }

  if (!form.overview) {
    error.overviewError = "The description is empty";
  } else if (form.overview.trim().length > 150) {
    error.overviewError = "The description is very long";
  }

  if (!form.release_date) {
    error.release_dateError = "The date is empty";
  } 

  if (!form.genres) {
    error.genresError = "The genre is empty";
  } 

  if (!form.popularity) {
    error.popularityError = "The popularity is empty";
  } else if (form.popularity.trim().length > 8) {
    error.popularityError = "The popularity is very long";
  }
  else if(isNaN((form.popularity.trim()))){
    error.popularityError = "Enter numbers only";
  }
  return error;
};

export default validate;
