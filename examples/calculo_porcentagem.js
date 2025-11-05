function calculateAverageCm(valor1, valor2, valor3, height) {
  if (height <= 0) return 0;

  if(valor1 < 25) {
    valor1 = valor2;
  }

  if(valor3 < 25) {
    valor3 = valor2;
  }

  console.log('Adjusted Values:', valor1, valor2, valor3);
  valor1 = height - valor1;
  valor2 = height - valor2;
  valor3 = height - valor3;

  const sum = zeroIfNegative(valor1) + zeroIfNegative(valor2) + zeroIfNegative(valor3);

  if (sum == 0) return 0;
  else return sum / 3;
}

function zeroIfNegative(value) {
    return value < 0 ? 0 : value;
}

function calculatePercentage(fill, height) {
  if (fill <= 0 || height <= 0) return 0;

  const percentage = (fill / height) * 100
  
  if (percentage > 99.5) return 100;
  else return percentage;
}

const distA = 20;
const distB = 56;
const distC = 20;

const averageCm = calculateAverageCm(distA, distB, distC, 62);
console.log('Average CM:', averageCm); // Example usage

const percentage = calculatePercentage(averageCm, 62);
console.log('Percentage:', percentage); // Example usage