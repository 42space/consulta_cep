const fieldCep = document.getElementById('cep');
const btnCon   = document.getElementById('btncon');
const btnLim   = document.getElementById('btnLim');

btnLim.addEventListener('click', () => {
    let fields = ["endereco", "bairro", "cidade", "estado", "dd", "ibge", "codcep"];
    for(let i = 0; i < fields.length; i++) {
        document.getElementById(fields[i]).value = "";
    }
});

btnCon.addEventListener('click', () => {
    let cep = document.getElementById('cep').value;
    let codcep = document.getElementById("codcep").value;

    if (cep === "") {
        console.log('preencha o cep');
        return;
    }
    cep = cep.replace(/\D/g, '');

    if (codcep !== "") {
        codcep = codcep.replace(/\D/g, '');
        if (codcep == cep) return;
    }

    getDadosCep(cep);
})

fieldCep.addEventListener('keyup', (e) => {
    let input = e.target;
    input.value = maskCep(input.value);
})

fieldCep.addEventListener('input', (e) => {
    let input = e.target;
    if (input.value.length > 9) {
        input.value = input.value.slice(0, 9);
    }
})

function maskCep(value)
{
    if (!value) return "";
    
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    return value;
}

function getDadosCep(cep)
{   
    let dadosCep;
    let url = "https://viacep.com.br/ws/" + cep + "/json/";
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let  dadosCep = xhr.response;
            setDadosCep(dadosCep);
        }
    }
    xhr.send();
}

function setDadosCep(cep)
{
    document.querySelector("#endereco").value = cep.logradouro ?? "";
    document.querySelector("#bairro").value = cep.bairro ?? "";
    document.querySelector("#cidade").value = cep.localidade ?? "";
    document.querySelector("#estado").value = cep.uf ?? "";
    document.querySelector("#dd").value = cep.ddd ?? "";
    document.querySelector("#ibge").value = cep.ibge ?? "";
    document.querySelector("#codcep").value = cep.cep ?? "";
}
