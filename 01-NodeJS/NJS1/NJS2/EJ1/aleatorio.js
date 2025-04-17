//esta funcion genera un numero minimo y maximo que vos quieras
export function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  