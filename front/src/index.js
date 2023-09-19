import joke from "./joke.js";
import './styles/main.scss';

window.addEventListener('load', () => {
  joke().then((jokeResult) => {
    console.log('hola ss' + jokeResult);
  }).catch((error) => {
    console.error('Error:', error);
  });
});
