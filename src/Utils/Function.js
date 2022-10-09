import VMasker from "vanilla-masker";

//Função para formatar valor em reais. 
export function setValor(valor_total) {
  const valorT = VMasker.toMoney(valor_total, {
    precision: 2,
    separator: ",",
    delimiter: ".",
    unit: "R$"
  });
  return valorT;
};