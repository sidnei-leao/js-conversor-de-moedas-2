// ----------------------------
// Seleção de elementos do DOM
// ----------------------------
const convertButton = document.querySelector(".convert-button")   // botão de converter
const currencySelect = document.querySelector(".currency-select") // select de moedas de destino
const form = document.getElementById("form")                      // formulário que envolve o input e botão
const input = document.querySelector(".input-currency")           // input de valor do usuário

// ----------------------------
// Função para converter valores
// ----------------------------
function convertValues() {

    const rawValue = document.querySelector(".input-currency").value

    const cleanedValue = rawValue
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()

        // converte string limpa em número
    const inputCurrencyvalue = Number(cleanedValue)

    //NÃO É NECESSÁRIO UTILIZAR ESSE CONST:
    // const inputCurrencyvalue = Number(document.querySelector(".input-currency").value)


    // valida se o número é válido e maior que zero
    if (isNaN(inputCurrencyvalue) || inputCurrencyvalue <= 0) {
        alert("Digite um valor válido maior que zero")
        return
    }

    // seleciona elementos do DOM para mostrar os resultados
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")  // valor em BRL
    const currencyValueConverted = document.querySelector(".currency-value")             // valor convertido

    // taxas de câmbio fixas (simulação)
    const dolarToday = 5.2
    const euroToday = 6.2
    const libraToday = 6.98
    const francoSuico = 6.59

    // ----------------------------
    // Converte e formata o valor para a moeda selecionada
    // ----------------------------
    if (currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyvalue / dolarToday)
    }
    else if (currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyvalue / euroToday)
    }
    else if (currencySelect.value == "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(inputCurrencyvalue / libraToday)
    }
    else if (currencySelect.value == "francoSuico") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-CH", {
            style: "currency",
            currency: "CHF"
        }).format(inputCurrencyvalue / francoSuico)
    }


    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyvalue)

}
// ----------------------------
// Função para atualizar nome e imagem da moeda selecionada
// ----------------------------
function changeFunction() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")



    if (currencySelect.value == "dolar") {
        currencyName.innerHTML = "Dólar americano"
        currencyImage.src = "./assets/usa.png"
    }
    if (currencySelect.value == "euro") {
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"
    }
    if (currencySelect.value == "libra") {
        currencyName.innerHTML = "Libra"
        currencyImage.src = "./assets/libra.png"
    }
    if (currencySelect.value == "francoSuico") {
        currencyName.innerHTML = "CHF"
        currencyImage.src = "./assets/CHF.png"
    }
    if (currencySelect.value == "real") {
        currencyName.innerHTML = "Real brasileiro"
        currencyImage.src = "./assets/real.png"
    }

}

// ----------------------------
// Eventos
// ----------------------------
currencySelect.addEventListener("change", () => {
    convertValues()
    changeFunction()
})

// quando o usuário clica no botão, converte os valores
convertButton.addEventListener("click", convertValues)

// quando o usuário aperta Enter no input (submit do form), converte valores sem recarregar a página
form.addEventListener("submit", function (event) {
    event.preventDefault()  // evita recarregar a página
    convertValues()
})

// ----------------------------
// Máscara de dinheiro (formato BRL) enquanto o usuário digita
// ----------------------------
input.addEventListener("input", function (event) {
    let value = event.target.value

    // remove tudo que não é número
    value = value.replace(/\D/g, "")

    // transforma em número e divide por 100
    value = Number(value) / 100

    // formata como moeda BR
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    event.target.value = value
})