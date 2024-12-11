let itemPedido = document.getElementById('item2')
let qtdPedida = document.getElementById('qtd2')
let itemDevolvido = document.getElementById('item3')
let qtdDevolvida = document.getElementById ('qtd3')



document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Documento carregado e pronto.');
    const form = document.getElementById('cadForm');
    form.addEventListener('submit', function(event) {
        let modal = document.getElementById("cadModal");
        event.preventDefault();
        const item = document.getElementById('item').value;
        const quantidade = document.getElementById('qtd').value;
        let listaAtual = JSON.parse(localStorage.getItem('listaAtual')) || [];
        let id = listaAtual.length ? listaAtual[listaAtual.length - 1].id + 1 : 1;
        let emprestimo = '0';
        while (listaAtual.some(usuario => usuario.id === id)) {
            id++;
        }
        const usuario = { id, item, quantidade, emprestimo  };
        for(let usuario of listaAtual){
            if(usuario.item.toUpperCase() == item.toUpperCase()){
                
                let update = Number(usuario.quantidade) + Number(quantidade)
                usuario.quantidade = update
                localStorage.setItem('listaAtual', JSON.stringify(listaAtual));
                modal.style.display = "block";
        form.reset();
                return
            }
        }
        
        listaAtual.push(usuario);
        localStorage.setItem('listaAtual', JSON.stringify(listaAtual));      
        
        
        
        modal.style.display = "none";
        form.reset();
        carregarTabela();
    });
});



function retirada() { 
    let modal = document.getElementById("empModal");
    let listaAtual = JSON.parse(localStorage.getItem('listaAtual')) || []; 
    let novaLista = listaAtual 
    console.log('ESTOU AQUI', itemPedido.value) 
    for(let i=0; i<novaLista.length; i++){
        
        const itemObject = novaLista[i]
        if(itemObject.item.toUpperCase() == itemPedido.value.toUpperCase()){
            let novoItem = itemObject
            
            //novoItem.quantidade = novaQuantidade
            let novaQuantidade = Number(document.getElementById('qtd2').value)
            let existente = Number(novoItem.quantidade)
            let update= existente-novaQuantidade
            let empUpdate = Number(novoItem.emprestimo + novaQuantidade)
            novoItem.quantidade = update
           novoItem.emprestimo = empUpdate
            novaLista[i] = novoItem
            break
          
        }
    }
    console.log("listaAtual", novaLista)

        localStorage.setItem('listaAtual', JSON.stringify(novaLista));
        modal.style.display = "none";
        carregarTabela();     
}

function devolver(){
    let modal = document.getElementById("devModal");
    let listaAtual = JSON.parse(localStorage.getItem('listaAtual')) || [];
    let novaLista= listaAtual
    console.log('ESTOU AQUI',itemDevolvido.value )
    for(let i=0; i<novaLista.length; i++){
        const itemObject = novaLista[i]
        if(itemObject.item.toUpperCase() == itemPedido.value.toUpperCase()){
            let novoItem = itemObject
            let novaQuantidade = Number(document.getElementById('qtd3').value)
            let existente= Number(novoItem.quantidade)
            let update = existente+novaQuantidade
            let empUpdate = Number(novoItem.emprestimo - novaQuantidade)
            novoItem.quantidade = update
            novoItem.emprestimo = empUpdate
            novaLista[i]= novoItem
            break
        }

    }
    console.log("listaAtual", novaLista)

    localStorage.setItem('listaAtual', JSON.stringify(novaLista));
    modal.style.display = "none";
    carregarTabela();
}

/*-----------------------------------------------------------------------------------------------*/
    function carregarTabela() {
        const tabela = document.getElementById('listageral').getElementsByTagName('tbody')[0];
        tabela.innerHTML = '';
        let listaAtual = JSON.parse(localStorage.getItem('listaAtual')) || [];
        for (let usuario of listaAtual) {
            let linha = tabela.insertRow();
            let celulaItem = linha.insertCell(0);
            let celulaQtd = linha.insertCell(1);
            let celulaEmp = linha.insertCell(2);
            let celulaAcoes = linha.insertCell(3);
            celulaItem.innerHTML = usuario.item;
            celulaQtd.innerHTML = usuario.quantidade;
            celulaEmp.innerHTML = usuario.emprestimo;
            celulaAcoes.innerHTML = `<button class="excluirBtn" data-id="${usuario.id}" data-item="${usuario.item}">Excluir</button>`;
        }
        let botoes = document.querySelectorAll('.excluirBtn');
        	for(let button of botoes){
            button.addEventListener('click', function() {
                let itemUsuario = this.getAttribute('data-item');
                let idUsuario = this.getAttribute('data-id');
                mostrarModal(itemUsuario, idUsuario);
            });
        };
    }
    carregarTabela();
    let modal = document.getElementById("modalExcluir");
    let confirmarExcluir = document.getElementById("confirmarExcluir");
    let cancelarExcluir = document.getElementById("cancelarExcluir");
    let usuarioParaExcluirId = '';
    function mostrarModal(itemUsuario, idUsuario) {
        usuarioParaExcluirId = idUsuario;
        modal.style.display = "block";
    }
    cancelarExcluir.onclick = function() {
        modal.style.display = "none";
    }
    confirmarExcluir.onclick = function() {
    	let listaAtual = JSON.parse(localStorage.getItem('listaAtual')) || [];

    	listaAtual = listaAtual.filter(usuario => usuario.id != usuarioParaExcluirId);
    	localStorage.setItem('listaAtual', JSON.stringify(listaAtual));


    	modal.style.display = "none";
    	carregarTabela();
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

/*-----------------------------------------------------------------------------------------------*/

let spans = document.getElementsByClassName("close");
for (let span of spans) {
    span.onclick = function () {
        document.getElementById("cadModal").style.display = "none"
        document.getElementById("empModal").style.display = "none"
        document.getElementById("devModal").style.display = "none"
        document.getElementById("modalExcluir").style.display = "none"
    }

}
function esconder() {
    document.getElementById("cadModal").style.display = "none"
    document.getElementById("empModal").style.display = "none"
    document.getElementById("devModal").style.display = "none"
}

function mostrarcad() {
    esconder()
    document.getElementById("cadModal").style.display = "block"
    let modal = document.getElementById("cadModal")
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
}

function mostraremp() {
    esconder()
    document.getElementById("empModal").style.display = "block"
    let modal = document.getElementById("empModal")
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
}

function mostrardev() {
    esconder()
    document.getElementById("devModal").style.display = "block"
    let modal = document.getElementById("devModal")
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
}

function mostrarlis() {
    esconder()
    document.getElementById("lisModal").style.display = "block"
}

//------------------------------------------------------------------------------------------
