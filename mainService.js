

// 1. Construção das variaveis que serão indispensáveis para a criação da aplicação
const elementos = {
    aporteMensal: document.getElementById("aporteMensal"),
    aporteInicial: document.getElementById("aporteInicial"),
    tempo: document.getElementById("tempoInvestido"),
    rendimento: document.getElementById("rendimentoMes"),
    botao: document.getElementById("botaoSimular"), // Relembrando que a utilizando do .document.getElementById é importante para conseguirmos comunicar o JS com o HTML.
    resultado: document.getElementById("textoResultado"),
    canvasGrafico: document.getElementById("graficoRendimento"),
};

let grafico = null;

//2. Criando e devolvendo as listas tanto para Meses quanto para Saldo.
function calcularInvestimento(inicial, mensal, tempo, taxa) {
    let saldo = inicial;
    const listaMeses = [];
    const listaSaldos = [];

//3.Calculo básico de rendimento.
    for (let mes = 1; mes <= tempo; mes++) {
        saldo = (saldo + mensal) * (1 + taxa / 100);
        
        // Empurrando os dados para as prateleiras
        listaMeses.push(mes);
        listaSaldos.push(saldo);
    }

    // Retornamos as três informações de uma vez só!
    return {
        saldoFinal: saldo,
        meses: listaMeses,
        saldos: listaSaldos
    };
}

//4. Funcionamento na pratica do botão.
elementos.botao.addEventListener("click", () => {
    // Recebemos as informações calculadas
    const simulacao = calcularInvestimento(
        Number(elementos.aporteInicial.value),
        Number(elementos.aporteMensal.value),
        Number(elementos.tempo.value),
        Number(elementos.rendimento.value)
    );

    // Mostramos o texto na tela pegando o "saldoFinal" que a função devolveu
    elementos.resultado.innerText = `Resultado: R$ ${simulacao.saldoFinal.toFixed(2)}`;
    
    // Limpeza de segurança do gráfico
    if (grafico !== null) {
        grafico.destroy();
    }

    // Correção 3: O gráfico vem para DENTRO do clique!
    grafico = new Chart(elementos.canvasGrafico, {
        type: 'line',
        data: {
            labels: simulacao.meses, // Pegamos a lista de meses que a função devolveu
            datasets: [{
                label: 'Evolução do Patrimônio (R$)',
                data: simulacao.saldos, // Pegamos a lista de saldos que a função devolveu
                borderColor: '#a855f7',
                borderWidth: 3,
                tension: 0.1 
            }]
        }
    });
});