let nextPage;
let maisProdutos = document.querySelector(".maisprodutos");
let enviar = document.querySelector(".submeter");

const formataPreco = (preco) => {

	let precoString = String(preco).replace(".", ",");

	if(precoString.includes(",")) {
		if (precoString.length <= (precoString.search(",")+2)) precoString += "0";
		return precoString.slice(0,(precoString.search(",")+3));
	} else {
		return precoString + ",00";
	}
}

const listaProdutos = (endpoint) => {

	fetch(endpoint)
	.then(response => response.json())
	.then(response => {

		let product = response.products;
		let imagem = document.querySelectorAll(".imagem");
		let nome = document.querySelectorAll(".nomeproduto");
		let descricao = document.querySelectorAll(".descrição");
		let precoAntigo = document.querySelectorAll(".precoantigo");
		let preco = document.querySelectorAll(".preco");
		let precoParcelado = document.querySelectorAll(".parcelado");

		for(i = 0; i <= 7; i++) {
			imagem[i].src = "http:" + product[i].image;
			nome[i].innerHTML = product[i].name;
			descricao[i].innerHTML = product[i].description;
			precoAntigo[i].innerHTML = "De: R$" + formataPreco(product[i].oldPrice);
			preco[i].innerHTML = "Por: R$" + formataPreco(product[i].price);
			precoParcelado[i].innerHTML = `ou ${product[i].installments.count}x de R$${formataPreco(product[i].installments.value)}`;
		}
		nextPage = "https://" + response.nextPage;
	});
}

listaProdutos("https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1");


function validaNome(nome) { 
	return /^[a-zA-Z ]{2,30}$/.test(nome);
}

function validaEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validaForm = () => { 

	let campoNome = document.querySelector("#name");
	let campoEmail = document.querySelector("#email");

	if(!validaNome(campoNome.value)) {
	    alert('Informe seu nome completo');
	    return false;
	}	
	if(!validaEmail(campoEmail.value)) {
	    alert('Informe um e-mail válido.');
	    return false;
	}
	return true;
}

enviar.addEventListener("click", () => {
	if(validaForm()) alert('Novidade compartilhada com sucesso!');
})

maisProdutos.addEventListener("click", () => {
	listaProdutos(nextPage);
})