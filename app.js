function dados() {
    const ds = [
        { id: 1, login: "eduardo", password: "1234@", email: "eduardo@gmail.com" },
        { id: 2, login: "bobby", password: "1234@", email: "bobby@gmail.com" },
        { id: 3, login: "endrick", password: "1234@", email: "endrick@gmail.com" },
        { id: 4, login: "plinio", password: "1234@", email: "plinio@gmail.com" },
        { id: 5, login: "pedro", password: "1234@", email: "pedro@gmail.com" }
    ]

    const json = JSON.stringify(ds)

    localStorage.setItem("usuario", json)

    const dss = [{ id: "", produto: "", valor: "", qtd: "" }]

    const jsonn = JSON.stringify(dss)

    localStorage.setItem("compra", jsonn)

}

const usuarios = dados()

function login() {

    let usuarios = JSON.parse(sessionStorage.getItem("usuario"))

    let log = document.querySelector('#login').value
    let senha = document.querySelector('#password').value


    let eCorreto = false;

    for (let i = 0; i < usuarios.length; i++) {
        if (log == usuarios[i].login && senha == usuarios[i].password) {
            window.location.href = "index.html";
            eCorreto = true;
            alert('Seja bem-vindo ' + usuarios[i].login)
            break;
        }
    }

    if (!eCorreto) {
        alert('Login incorreto!')
    }

}

function cadastrar() {
    let dados = JSON.parse(localStorage.getItem("usuario"));
    let login = document.querySelector("#cadastroId").value;
    let senha = document.querySelector("#senha1").value;
    let user = { id: Date.now(), login: login, password: senha };
    dados.push(user);
    sessionStorage.setItem("usuario", JSON.stringify(dados));
    alert("Registro adicionado.");

}



// Aguardar o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    
    // Adicionar evento de clique em todos os botões de "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Prevent default action (in case of <a> tags)
            event.preventDefault();
            
            // Capturar dados do produto do botão
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            // Obter o carrinho do localStorage ou criar um novo se não existir
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Verificar se o produto já está no carrinho
            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex > -1) {
                // Se o produto já está no carrinho, apenas incrementar a quantidade
                cart[existingProductIndex].quantity++;
            } else {
                // Se não está no carrinho, adicionar novo item
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Salvar o carrinho atualizado no localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Mostrar uma mensagem de sucesso ou feedback
            alert(`Produto "${productName}" adicionado ao carrinho!`);
        });
    });
});

// Função para carregar e exibir o carrinho
document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let totalPrice = 0;

    // Se o carrinho estiver vazio, exibe uma mensagem
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>O carrinho está vazio!</p>';
    } else {
        cartItemsContainer.innerHTML = ''; // Limpa o carrinho antes de adicionar os itens
        cart.forEach(item => {
            // Criar o elemento de item no carrinho
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p><strong>${item.name}</strong></p>
                <p>Quantidade: ${item.quantity}</p>
                <p>Preço: R$ ${item.price.toFixed(2)}</p>
                <p>Total: R$ ${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item btn btn-danger" data-id="${item.id}">Remover</button>
                <hr>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }

    // Função para remover um item do carrinho
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const productId = this.getAttribute('data-id');
            removeItemFromCart(productId);
        });
    });
});

// Função para remover um item do carrinho e atualizar o localStorage
function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtra o carrinho para remover o produto pelo ID
    cart = cart.filter(item => item.id !== productId);

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza a página após a remoção
    location.reload();
}
// Função para adicionar um produto ao carrinho
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // Se o produto já existir, apenas incrementa a quantidade
        cart[existingProductIndex].quantity++;
    } else {
        // Se o produto não existir, adiciona ao carrinho
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Função para exibir os itens no carrinho
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    cartItems.innerHTML = ''; // Limpa o carrinho

    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `    
            <p>${item.name} - R$ ${item.price} x ${item.quantity}</p>
            <!-- Usar data-attribute para passar o ID do produto -->
            <button class="btn btn-danger btn-sm btn-remove" data-product-id="${item.id}">Remover</button>
        `;
        cartItems.appendChild(div);
        total += item.price * item.quantity;
    });

    totalPrice.innerHTML = `Total: R$ ${total.toFixed(2)}`;
    
    // Adiciona o evento de remover aos botões "Remover"
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            removeFromCart(productId);  // Passa o ID do produto para a função
        });
    });
}

// Função para remover um item do carrinho
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);  // Remove o item com o id fornecido

    localStorage.setItem('cart', JSON.stringify(cart));  // Atualiza o carrinho no localStorage
    displayCart();  // Atualiza a exibição do carrinho
}

// Função para mostrar a imagem do cartão quando o método de pagamento for selecionado
document.getElementById('payment-method').addEventListener('change', function () {
    const selectedMethod = this.value;
    const paymentImageContainer = document.getElementById('payment-image-container');
    
    // Esconde todas as imagens
    document.getElementById('credit-card-image').style.display = 'none';
    document.getElementById('debit-card-image').style.display = 'none';
    document.getElementById('pix-image').style.display = 'none';

    // Exibe a imagem correspondente ao método de pagamento
    if (selectedMethod === 'cartao') {
        document.getElementById('credit-card-image').style.display = 'block';  // Exibe imagem do cartão de crédito
    } else if (selectedMethod === 'boleto') {
        paymentImageContainer.style.display = 'none';  // Não exibe imagem para boleto
    } else if (selectedMethod === 'pix') {
        document.getElementById('pix-image').style.display = 'block';  // Exibe imagem do Pix
    } else if (selectedMethod === 'debito') {
        document.getElementById('debit-card-image').style.display = 'block';  // Exibe imagem do cartão de débito
    }

    paymentImageContainer.style.display = 'block';  // Garante que o container de imagem seja mostrado
});

// Função para finalizar a compra
document.getElementById('confirm-payment').addEventListener('click', function() {
    const paymentMethod = document.getElementById('payment-method').value;
    const paymentConfirmation = document.getElementById('payment-method-confirmation');
    const finalMessage = document.getElementById('final-purchase-message');
    const cartContainer = document.querySelector('.cart');

    // Esconde o carrinho e exibe a confirmação de pagamento
    cartContainer.style.display = 'none';
    finalMessage.style.display = 'block';
    paymentConfirmation.textContent = `Método de pagamento selecionado: ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`;

    // Armazenando a finalização da compra no localStorage (opcional)
    localStorage.removeItem('cart');

    // Fecha o modal de pagamento
    $('#paymentModal').modal('hide');  // Fecha o modal
});

// Chama a função para exibir o carrinho ao carregar a página
window.onload = displayCart;

