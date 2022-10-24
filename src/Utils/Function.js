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

//Função para formatar data
export function FormataStringData(data) { 
  if (data != null) {
    var dia  = data.split("-")[2];
    var mes  = data.split("-")[1];
    var ano  = data.split("-")[0];
    return dia + '/' + (mes) + '/' + (ano);
  }else{
    return null;
  }
  
}