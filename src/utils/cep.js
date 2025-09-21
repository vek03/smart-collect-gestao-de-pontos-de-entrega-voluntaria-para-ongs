export const formatCEP = (value) => {
  // Remove qualquer caractere que não seja número
  const digits = value.replace(/\D/g, "");
  
  // Adiciona o hífen após os 5 primeiros dígitos
  if (digits.length > 5) {
    return digits.slice(0, 5) + "-" + digits.slice(5, 8);
  }
  
  return digits;
};
