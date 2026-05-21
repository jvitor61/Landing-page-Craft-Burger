// PRODUCTS DATABASE
const PRODUCTS = [
    {
        id: "burger-classic",
        name: "Classic Smash Cheese",
        description: "Dois blends smash de carne Angus de 80g, queijo cheddar americano derretido, pão brioche selado, maionese verde artesanal e picles da casa.",
        price: 26.90,
        category: "burgers",
        image: "images/classic-burger.png",
        tag: "Mais Vendido",
        hasOptions: true
    },
    {
        id: "burger-bacon",
        name: "Craft Bacon Monster",
        description: "Nosso generoso blend Angus de 150g grelhado na brasa, queijo cheddar inglês duplo, fatias de bacon crocante premium, cebola caramelizada e barbecue no pão brioche.",
        price: 34.90,
        category: "burgers",
        image: "images/hero-burger.png",
        tag: "Gourmet",
        hasOptions: true
    },
    {
        id: "burger-chicken",
        name: "Crispy Chicken Swiss",
        description: "Filé de sobrecoxa marinada e empanada na farinha Panko super crocante, queijo suíço derretido, maionese chipotle picante e salada coleslaw no pão de batata.",
        price: 29.90,
        category: "burgers",
        image: "images/chicken-burger.png",
        tag: "Crocante",
        hasOptions: true
    },
    {
        id: "burger-veggie",
        name: "Veggie Green Pesto",
        description: "Blend de grão-de-bico artesanal de 140g, queijo coalho grelhado, tomate seco marinado, rúcula fresca e pesto de manjericão no pão australiano.",
        price: 28.90,
        category: "burgers",
        image: "images/veggie-burger.png",
        tag: "Veggie",
        hasOptions: true
    },
    {
        id: "side-fries",
        name: "Batata Rústica Alecrim",
        description: "Batatas rústicas com casca fritas na hora, salpicadas com flor de sal e alecrim fresco. Acompanha pote de maionese de alho da casa.",
        price: 18.00,
        category: "sides",
        image: "images/fries.png",
        tag: "Favorito",
        hasOptions: false
    },
    {
        id: "side-onion",
        name: "Onion Rings Crocantes",
        description: "Anéis de cebola gigantes empanados na farinha Panko super sequinhos e crocantes. Acompanha barbecue artesanal.",
        price: 16.00,
        category: "sides",
        image: "images/fries.png",
        tag: "Petisco",
        hasOptions: false
    },
    {
        id: "drink-coca",
        name: "Coca-Cola Lata 350ml",
        description: "Refrigerante Coca-Cola original geladinho em lata.",
        price: 6.50,
        category: "drinks",
        image: "images/classic-burger.png", // Fallback, styling will adjust
        tag: "Gelado",
        hasOptions: false
    },
    {
        id: "drink-guarana",
        name: "Guaraná Antarctica 350ml",
        description: "Refrigerante Guaraná Antarctica geladinho em lata.",
        price: 6.50,
        category: "drinks",
        image: "images/fries.png",
        tag: "Gelado",
        hasOptions: false
    },
    {
        id: "drink-juice",
        name: "Suco Natural de Laranja 500ml",
        description: "Suco natural espremido na hora com laranjas doces selecionadas.",
        price: 9.00,
        category: "drinks",
        image: "images/fries.png",
        tag: "Sem Açúcar",
        hasOptions: false
    },
    {
        id: "dessert-brownie",
        name: "Gooey Brownie Fudge",
        description: "Fatia generosa de brownie de chocolate belga morno com centro cremoso. Acompanha calda de chocolate quente.",
        price: 16.00,
        category: "desserts",
        image: "images/brownie.png",
        tag: "Artesanal",
        hasOptions: false
    }
];

// EXTRAS FOR BURGERS
const EXTRAS = [
    { id: "extra-patty", name: "Blend Carne Angus 150g", price: 9.90 },
    { id: "extra-bacon", name: "Bacon Crocante Fatiado", price: 4.50 },
    { id: "extra-cheddar", name: "Cheddar Fatiado Extra", price: 3.50 },
    { id: "extra-sauce", name: "Pote Molho da Casa", price: 2.00 }
];

// APP STATE
let cart = JSON.parse(localStorage.getItem("craft_grill_cart")) || [];
let selectedProduct = null;
let selectedExtras = [];
let modalQuantity = 1;
let deliveryType = "delivery"; // delivery or pickup
const DELIVERY_FEE = 7.00;
const WHATSAPP_NUMBER = "5591988504345";

// DOM ELEMENTS
const menuGrid = document.getElementById("menu-grid");
const tabButtons = document.querySelectorAll(".tab-btn");
const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartEmptyView = document.getElementById("cart-empty-view");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartDeliveryFee = document.getElementById("cart-delivery-fee");
const cartDeliveryRow = document.getElementById("cart-delivery-row");
const cartTotal = document.getElementById("cart-total");
const cartFooterView = document.getElementById("cart-footer-view");
const checkoutFormContainer = document.getElementById("checkout-form-container");

// Delivery Type Elements
const deliveryOptDelivery = document.getElementById("delivery-opt-delivery");
const deliveryOptPickup = document.getElementById("delivery-opt-pickup");
const addressFieldsWrapper = document.getElementById("address-fields-wrapper");

// Checkout Fields
const checkoutName = document.getElementById("checkout-name");
const checkoutPhone = document.getElementById("checkout-phone");
const checkoutStreet = document.getElementById("checkout-street");
const checkoutNumber = document.getElementById("checkout-number");
const checkoutNeighborhood = document.getElementById("checkout-neighborhood");
const checkoutComplement = document.getElementById("checkout-complement");
const checkoutPayment = document.getElementById("checkout-payment");
const changeFieldWrapper = document.getElementById("change-field-wrapper");
const checkoutChange = document.getElementById("checkout-change");
const finishBtn = document.getElementById("finish-btn");

// Modal Elements
const productModal = document.getElementById("product-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");
const modalExtrasSection = document.getElementById("modal-extras-section");
const modalExtrasList = document.getElementById("modal-extras-list");
const modalNotes = document.getElementById("modal-notes");
const modalQtyMinus = document.getElementById("modal-qty-minus");
const modalQtyPlus = document.getElementById("modal-qty-plus");
const modalQtyVal = document.getElementById("modal-qty-val");
const modalAddBtn = document.getElementById("modal-add-btn");

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    renderMenu("all");
    updateCartCount();
    checkStoreStatus();
    
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Category filter tabs
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderMenu(btn.dataset.category);
        });
    });

    // Cart Sidebar toggles
    cartBtn.addEventListener("click", () => openCart());
    cartCloseBtn.addEventListener("click", () => closeCart());
    cartOverlay.addEventListener("click", () => closeCart());

    // Modal Events
    modalClose.addEventListener("click", () => closeModal());
    modalOverlay.addEventListener("click", () => closeModal());
    
    modalQtyMinus.addEventListener("click", () => {
        if (modalQuantity > 1) {
            modalQuantity--;
            updateModalPrice();
        }
    });
    
    modalQtyPlus.addEventListener("click", () => {
        modalQuantity++;
        updateModalPrice();
    });
    
    modalAddBtn.addEventListener("click", () => addModalItemToCart());

    // Delivery Type Toggles
    deliveryOptDelivery.addEventListener("click", () => {
        setDeliveryType("delivery");
    });
    deliveryOptPickup.addEventListener("click", () => {
        setDeliveryType("pickup");
    });

    // Cash payment change field logic
    checkoutPayment.addEventListener("change", () => {
        if (checkoutPayment.value === "dinheiro") {
            changeFieldWrapper.style.display = "block";
        } else {
            changeFieldWrapper.style.display = "none";
            checkoutChange.value = "";
        }
    });

    // Finish Order
    finishBtn.addEventListener("click", () => submitOrder());
});

// RENDERING MENU ITEMS
function renderMenu(category) {
    menuGrid.innerHTML = "";
    
    const filteredProducts = category === "all" 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === category);
        
    if (filteredProducts.length === 0) {
        menuGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-muted); padding: 40px 0;">Nenhum produto cadastrado nesta categoria.</div>`;
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "menu-card";
        
        let veggieBadge = product.isVeggie ? " veggie" : "";
        let tagHtml = product.tag ? `<span class="card-tag${veggieBadge}">${product.tag}</span>` : "";
        
        // Hide standard images for drinks/desserts in UI or show nice graphics if needed, but since they have generated assets/placeholders, we load them
        let imageSrc = product.image;
        if (product.category === "drinks") {
            // drinks use fries or burger placeholder in list but we can style them differently or reuse.
            // Since we generated classic-burger, veggie-burger, fries, brownie and chicken-burger, 
            // We use Fries for Juices/Onions and Classic-burger for sodas, but we can make it look nice.
            imageSrc = product.image;
        }

        card.innerHTML = `
            ${tagHtml}
            <div class="card-image-container">
                <img src="${imageSrc}" alt="${product.name}" class="card-image" loading="lazy">
            </div>
            <div class="card-body">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-desc">${product.description}</p>
                <div class="card-footer">
                    <span class="card-price">R$ ${product.price.toFixed(2).replace(".", ",")}</span>
                    <button class="card-btn" aria-label="Adicionar ${product.name} ao carrinho" onclick="handleCardClick('${product.id}')">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// HANDLE PRODUCT CLICK FROM CARD
window.handleCardClick = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    // Quick checkout for items without customization options (e.g. drinks, desserts, sides)
    if (!product.hasOptions) {
        addToCartDirect(product);
        // Show dynamic toast or small microinteraction
        showCartIndicatorAnimation();
        openCart();
    } else {
        openModal(product);
    }
};

// MODAL CONTROLLERS
function openModal(product) {
    selectedProduct = product;
    selectedExtras = [];
    modalQuantity = 1;
    modalNotes.value = "";
    
    modalImg.src = product.image;
    modalTitle.textContent = product.name;
    modalDesc.textContent = product.description;
    
    // Render extras list
    modalExtrasList.innerHTML = "";
    EXTRAS.forEach(extra => {
        const item = document.createElement("div");
        item.className = "option-item";
        item.innerHTML = `
            <label class="option-label">
                <input type="checkbox" name="extras" value="${extra.id}" onchange="toggleExtra('${extra.id}')">
                <div class="custom-checkbox"></div>
                <span>${extra.name}</span>
            </label>
            <span class="option-price">+ R$ ${extra.price.toFixed(2).replace(".", ",")}</span>
        `;
        modalExtrasList.appendChild(item);
    });
    
    updateModalPrice();
    productModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    productModal.classList.remove("active");
    document.body.style.overflow = "auto";
    selectedProduct = null;
}

window.toggleExtra = function(extraId) {
    const index = selectedExtras.indexOf(extraId);
    if (index > -1) {
        selectedExtras.splice(index, 1);
    } else {
        selectedExtras.push(extraId);
    }
    updateModalPrice();
};

function updateModalPrice() {
    if (!selectedProduct) return;
    
    let singleItemPrice = selectedProduct.price;
    selectedExtras.forEach(extraId => {
        const extra = EXTRAS.find(e => e.id === extraId);
        if (extra) singleItemPrice += extra.price;
    });
    
    const totalPrice = singleItemPrice * modalQuantity;
    modalPrice.textContent = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
    modalQtyVal.textContent = modalQuantity;
    modalAddBtn.textContent = `Adicionar • R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
}

function addModalItemToCart() {
    if (!selectedProduct) return;
    
    let singleItemPrice = selectedProduct.price;
    const extrasObjects = [];
    selectedExtras.forEach(extraId => {
        const extra = EXTRAS.find(e => e.id === extraId);
        if (extra) {
            singleItemPrice += extra.price;
            extrasObjects.push(extra);
        }
    });

    const cartItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        productId: selectedProduct.id,
        name: selectedProduct.name,
        image: selectedProduct.image,
        basePrice: selectedProduct.price,
        singleItemPrice: singleItemPrice,
        price: singleItemPrice * modalQuantity,
        quantity: modalQuantity,
        extras: extrasObjects,
        notes: modalNotes.value.trim()
    };

    cart.push(cartItem);
    saveCart();
    updateCartCount();
    closeModal();
    openCart();
    
    // Animation trigger
    showCartIndicatorAnimation();
}

// DIRECT ADD TO CART (No modal)
function addToCartDirect(product) {
    // Check if product already exists in cart with no options/notes
    const existingItem = cart.find(item => item.productId === product.id && item.extras.length === 0 && !item.notes);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price = existingItem.singleItemPrice * existingItem.quantity;
    } else {
        const cartItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            productId: product.id,
            name: product.name,
            image: product.image,
            basePrice: product.price,
            singleItemPrice: product.price,
            price: product.price,
            quantity: 1,
            extras: [],
            notes: ""
        };
        cart.push(cartItem);
    }
    
    saveCart();
    updateCartCount();
}

// CART DRAWER CONTROLLERS
function openCart() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    renderCart();
}

function closeCart() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

function renderCart() {
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartEmptyView.style.display = "flex";
        checkoutFormContainer.style.display = "none";
        cartFooterView.style.display = "none";
        return;
    }
    
    cartEmptyView.style.display = "none";
    checkoutFormContainer.style.display = "block";
    cartFooterView.style.display = "block";
    
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price;
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        
        let extrasHtml = "";
        if (item.extras.length > 0) {
            const names = item.extras.map(e => `+ ${e.name}`).join("<br>");
            extrasHtml = `<div class="cart-item-options">${names}</div>`;
        }
        
        let notesHtml = item.notes ? `<div class="cart-item-options" style="font-style: italic;">Obs: "${item.notes}"</div>` : "";
        
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                ${extrasHtml}
                ${notesHtml}
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace(".", ",")}</div>
                <div class="cart-item-qty-control">
                    <button class="cart-item-qty-btn" onclick="updateCartItemQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                    <span class="cart-item-qty-val">${item.quantity}</span>
                    <button class="cart-item-qty-btn" onclick="updateCartItemQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" aria-label="Remover item"><i class="fa-solid fa-trash-can"></i></button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
    
    // Calculating totals
    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
    
    let total = subtotal;
    if (deliveryType === "delivery") {
        cartDeliveryRow.style.display = "flex";
        cartDeliveryFee.textContent = `R$ ${DELIVERY_FEE.toFixed(2).replace(".", ",")}`;
        total += DELIVERY_FEE;
    } else {
        cartDeliveryRow.style.display = "none";
    }
    
    cartTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

window.updateCartItemQty = function(cartItemId, amount) {
    const item = cart.find(i => i.id === cartItemId);
    if (!item) return;
    
    item.quantity += amount;
    if (item.quantity <= 0) {
        removeCartItem(cartItemId);
        return;
    }
    
    item.price = item.singleItemPrice * item.quantity;
    saveCart();
    updateCartCount();
    renderCart();
};

window.removeCartItem = function(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    saveCart();
    updateCartCount();
    renderCart();
};

function saveCart() {
    localStorage.setItem("craft_grill_cart", JSON.stringify(cart));
}

function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQty;
    
    // Animate cart button
    if (totalQty > 0) {
        cartBtn.style.transform = "scale(1.1)";
        setTimeout(() => {
            cartBtn.style.transform = "scale(1)";
        }, 150);
    }
}

function showCartIndicatorAnimation() {
    cartCount.style.animation = "none";
    // trigger reflow
    void cartCount.offsetWidth;
    cartCount.style.animation = "float 0.4s ease";
}

// CHECKOUT LOGIC & DELIVERY SYSTEM
function setDeliveryType(type) {
    deliveryType = type;
    
    if (type === "delivery") {
        deliveryOptDelivery.classList.add("active");
        deliveryOptPickup.classList.remove("active");
        addressFieldsWrapper.style.display = "block";
    } else {
        deliveryOptDelivery.classList.remove("active");
        deliveryOptPickup.classList.add("active");
        addressFieldsWrapper.style.display = "none";
        
        // Clear address fields
        checkoutStreet.value = "";
        checkoutNumber.value = "";
        checkoutNeighborhood.value = "";
        checkoutComplement.value = "";
    }
    
    renderCart();
}

function submitOrder() {
    // Validations
    const name = checkoutName.value.trim();
    const phone = checkoutPhone.value.trim();
    const payment = checkoutPayment.value;
    
    if (!name) {
        alert("Por favor, preencha o seu nome completo.");
        checkoutName.focus();
        return;
    }
    
    if (!phone) {
        alert("Por favor, preencha o seu telefone / WhatsApp.");
        checkoutPhone.focus();
        return;
    }
    
    let street = "";
    let number = "";
    let neighborhood = "";
    let complement = "";
    
    if (deliveryType === "delivery") {
        street = checkoutStreet.value.trim();
        number = checkoutNumber.value.trim();
        neighborhood = checkoutNeighborhood.value.trim();
        complement = checkoutComplement.value.trim();
        
        if (!street) {
            alert("Por favor, preencha o nome da sua rua.");
            checkoutStreet.focus();
            return;
        }
        if (!number) {
            alert("Por favor, preencha o número do endereço.");
            checkoutNumber.focus();
            return;
        }
        if (!neighborhood) {
            alert("Por favor, preencha o bairro.");
            checkoutNeighborhood.focus();
            return;
        }
    }
    
    let paymentText = "";
    switch(payment) {
        case "pix":
            paymentText = "Chave PIX (CPF/Celular)";
            break;
        case "credito":
            paymentText = "Cartão de Crédito (Na entrega)";
            break;
        case "debito":
            paymentText = "Cartão de Débito (Na entrega)";
            break;
        case "dinheiro":
            paymentText = "Dinheiro";
            const changeVal = checkoutChange.value.trim();
            if (changeVal) {
                paymentText += ` (Troco para R$ ${parseFloat(changeVal).toFixed(2).replace(".", ",")})`;
            } else {
                paymentText += " (Sem necessidade de troco)";
            }
            break;
    }

    // WhatsApp Message Formatting
    let message = `🍔 *NOVO PEDIDO - CRAFT & GRILL* 🍔\n\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📞 *WhatsApp:* ${phone}\n\n`;
    
    message += `--------------------------------\n`;
    message += `🛒 *ÍTENS DO PEDIDO:*\n\n`;
    
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price;
        message += `${index + 1}x *${item.name}* (R$ ${item.singleItemPrice.toFixed(2).replace(".", ",")})\n`;
        
        if (item.extras.length > 0) {
            const extrasStr = item.extras.map(e => `   • + ${e.name} (+ R$ ${e.price.toFixed(2).replace(".", ",")})`).join("\n");
            message += `${extrasStr}\n`;
        }
        
        if (item.notes) {
            message += `   _Obs: ${item.notes}_\n`;
        }
        message += `   *Subtotal:* R$ ${item.price.toFixed(2).replace(".", ",")}\n\n`;
    });
    
    message += `--------------------------------\n`;
    message += `📍 *TIPO DE ENTREGA:* ${deliveryType === "delivery" ? "📦 Delivery" : "🏪 Retirada no Local"}\n`;
    
    if (deliveryType === "delivery") {
        message += `🏠 *Endereço:* ${street}, Nº ${number}\n`;
        message += `🏙️ *Bairro:* ${neighborhood}\n`;
        if (complement) {
            message += `🏢 *Complemento:* ${complement}\n`;
        }
    }
    message += `\n💳 *Forma de Pagamento:* ${paymentText}\n`;
    
    message += `--------------------------------\n`;
    message += `💵 *Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;
    
    let total = subtotal;
    if (deliveryType === "delivery") {
        message += `🛵 *Taxa de Entrega:* R$ ${DELIVERY_FEE.toFixed(2).replace(".", ",")}\n`;
        total += DELIVERY_FEE;
    }
    
    message += `💰 *TOTAL GERAL: R$ ${total.toFixed(2).replace(".", ",")}*\n\n`;
    message += `⏰ _Pedido enviado em: ${new Date().toLocaleTimeString('pt-BR')} via Cardápio Digital._`;

    // Generate WhatsApp Link API
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`;
    
    // Open in new tab
    window.open(whatsappUrl, "_blank");
    
    // Clear cart and state
    cart = [];
    saveCart();
    updateCartCount();
    closeCart();
    
    // Reset forms
    checkoutName.value = "";
    checkoutPhone.value = "";
    checkoutStreet.value = "";
    checkoutNumber.value = "";
    checkoutNeighborhood.value = "";
    checkoutComplement.value = "";
    checkoutPayment.value = "pix";
    changeFieldWrapper.style.display = "none";
    checkoutChange.value = "";
    
    alert("Pedido enviado com sucesso! Você será redirecionado para o WhatsApp para confirmar com o atendente.");
}

// STORE OPERATIONAL HOURS STATUS (Tue-Sun, 18:00 - 23:30)
function checkStoreStatus() {
    const statusBadge = document.getElementById("store-status");
    if (!statusBadge) return;
    
    const now = new Date();
    const day = now.getDay(); // 0: Sunday, 1: Monday, 2: Tuesday ...
    const hour = now.getHours();
    const minutes = now.getMinutes();
    
    const currentMinutes = hour * 60 + minutes;
    const openTime = 18 * 60; // 18:00 in minutes
    const closeTime = 23 * 60 + 30; // 23:30 in minutes
    
    // Opened Tuesday (2) to Sunday (0) between 18:00 and 23:30
    let isOpen = false;
    if (day !== 1) { // 1 is Monday (closed all day)
        if (currentMinutes >= openTime && currentMinutes <= closeTime) {
            isOpen = true;
        }
    }
    
    if (isOpen) {
        statusBadge.className = "status-badge open";
        statusBadge.querySelector("span").textContent = "Aberto Agora (Faça seu pedido!)";
    } else {
        statusBadge.className = "status-badge closed";
        statusBadge.querySelector("span").textContent = "Fechado Agora (Abrimos às 18h00)";
    }
}
