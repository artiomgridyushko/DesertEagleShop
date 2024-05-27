import { test_data } from './index1.js'
const data = test_data
console.log(data)
const basketModl = document.querySelector('#basketModal')
const productMain = document.querySelector('#product__main')
const product__img_menu = document.querySelector('#roduct__img_menu-container')

detailsPorduct.forEach((product) => {
  productMain.innerHTML = `
      <div class="product__img_container">
        <img src="${product.img}" alt="product" class="product__img" />
        <div class="product__img_menu-container" id="roduct__img_menu-container">
          <img src="${product.productOptionImage[0]}" alt="product" class="product__img_manu" />
          <img src="${product.productOptionImage[1]}" alt="product" class="product__img_manu" />
          <img src="${product.productOptionImage[2]}" alt="product" class="product__img_manu" />
        </div>
        <div class="productMobal_add_price-container">
          <div class="product__price_container">${product.price} <span>Р</span></div>
          <button type="button" class="product__add-basket_btn">Добавить в корзину</button>
        </div>
      </div>
      <div class="product__info_container">
        <div class="product__title_contianer">У меня вопрос
          <h1>${product.title}</h1>
          <div class="product__view-quantity_container">
            <div class="product__title_container">
              <div class="product__title">Вид</div>
              <select class="product__options">
                <option value="">13г</option>
                <option value="">10гр</option>
                <option value="">20гр</option>
              </select>
            </div>
            <div class="product__view_title_container">
              <div class="product__title_container">
                <div class="product__title">Кол-во</div>
                <select class="product__options">
                  <option value="">5 коробок</option>
                  <option value="">10 коробок</option>
                  <option value="">20 коробок</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="product__description_container">
        ${product.moreDetails}
      
        </div>
        <div class="product__price_contianer">
          <div class="product__price_container">${product.price} <span>Р</span></div>
          <button type="button" class="product__add-basket_btn" >Добавить в корзину</button>
        </div>
      </div>
`
})

// document.addEventListener('DOMContentLoaded', function() {
//     // Автоматически нажать кнопку "Главная" при загрузке страницы
//     const homeButton = document.querySelector('.nav-item');
//     homeButton.click();
// });

// function openHome() {
//     // Открывает новую страницу с подробной информацией о товаре
//     window.open('website.html', '_blank');
// }

// function changeMainImage(newImagePath) {
//     document.getElementById('mainImage').src = newImagePath;
// }

// function openForm() {
//     document.getElementById("myForm").style.display = "block";
// }

// function closeForm() {
//     document.getElementById("myForm").style.display = "none";
// }

// function submitForm() {
//     var formData = new FormData(document.getElementById("applicationForm"));

//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             // Ваши действия после успешной отправки формы
//             alert("Заявка успешно отправлена!");
//             closeForm(); // Закрываем форму после успешной отправки
//         }
//     };

// }
//     // Функция для обновления счетчика корзины
//     function updateCartCounter() {
//         var cartCounterElement = document.getElementById('cart-counter');
//         var currentCount = parseInt(cartCounterElement.innerText);
//         cartCounterElement.innerText = currentCount + 1;
//     }

//     function addProductToCart(id, name) {
//         const gramsSelect = document.getElementById('grams-select');
//         const boxesSelect = document.getElementById('boxes-select');
//         const priceElement = document.getElementById('price');

//         const grams = gramsSelect.value;
//         const boxes = boxesSelect.value;
//         const price = calculatePrice(grams, boxes);

//         const product = createProduct(id, name, price, grams, boxes);
//         addToCart(product);
//         updateCartCounter(); // Добавляем вызов функции обновления счетчика корзины

//     }

// function createProduct(id, name, price, grams, boxes) {
//     return {
//         id,
//         name,
//         price,
//         grams,
//         boxes
//     };
// }

// let cartItems = [];
// let cartTimeout;

// function addToCart(product) {
//     cartItems.push(product);
//     updateCart();
//     updateTotalPrice();
// }

// function updateCart() {
//     const cartElement = document.getElementById('cart');
//     cartElement.innerHTML = '';

//     let totalPrice = 0;

//     cartItems.forEach(item => {
//         const itemElement = document.createElement('div');
//         itemElement.classList.add('cart-item');
//         itemElement.innerHTML = `
// <div class="cart-item-details">
// <img src="08a0a356-032c-4626-abe3-4b4f5d5ba2a8 (1).jpg" alt="${item.name}">
// <div class="text-details">
//     <p>${item.name} - ${item.grams} гр </p>
//     <p> ${item.boxes} коробок</p>
// </div>
// <span class="remove-button" onclick="removeOneFromCart(this, ${item.id})">✖</span>
// `;

//         cartElement.appendChild(itemElement);
//         totalPrice += item.price;
//     });

//     const totalSection = document.createElement('div');
//     totalSection.classList.add('total-section');
//     totalSection.innerHTML = `
// <h3>Итого:</h3>
// <p id="total-price" class="total-price">${totalPrice} руб.</p>
// <button onclick="openForm()">Оставить Заявку</button>
// `;
//     cartElement.appendChild(totalSection);
//     totalPrice += item.price;

//     totalSection.style.display = 'block';
//     cartElement.style.display = 'block';
// }

// function removeOneFromCart(removeButton, productId) {
//     const itemIndex = cartItems.findIndex(item => item.id === productId);
//     if (itemIndex !== -1) {
//         if (cartItems[itemIndex].boxes > 0) {
//             cartItems[itemIndex].boxes--;
//         } else {
//             cartItems.splice(itemIndex, 1);
//         }
//         console.log("Cart items after removal:", cartItems);
//         updateCart();

//         console.log("Cart count after removal:", cartItems.length);
//     }
// }

// function updatePrice() {
//     const gramsSelect = document.getElementById('grams-select');
//     const boxesSelect = document.getElementById('boxes-select');
//     const priceElement = document.getElementById('price');

//     const grams = gramsSelect.value;
//     const boxes = boxesSelect.value;
//     const price = calculatePrice(grams, boxes);

//     priceElement.textContent = price + ' руб.';
// }

// // Функция для расчета цены на основе граммовки и количества коробок
// function calculatePrice(grams, boxes) {
//     const prices = {
//         13: {
//             1: 300,
//             5: 600,
//             15: 999
//         },
//         16: {
//             1: 500,
//             5: 800,
//             15: 1200
//         },
//         SLIM: {
//             1: 650,
//             5: 900,
//             15: 1350
//         },
//     };

//     return prices[grams][boxes] || 0;
// }

// // Добавляем слушатели события change для автоматического обновления цены
// document.getElementById('grams-select').addEventListener('change', updatePrice);
// document.getElementById('boxes-select').addEventListener('change', updatePrice);

// // Пример функции для отображения корзины
// function showCart() {
//     const cartElement = document.getElementById('cart');
//     clearTimeout(cartTimeout);
//     cartElement.style.display = 'block';
// }

// // Пример функции для скрытия корзины
// function hideCart() {
//     const cartElement = document.getElementById('cart');
//     cartTimeout = setTimeout(() => {
//         cartElement.style.display = 'none';
//     }, 3000);
// }

// document.addEventListener('DOMContentLoaded', function() {
//     const navbarLinks = document.querySelectorAll('.navbar a');
//     const navbarAnimation = document.querySelector('.navbar_animation');

//     navbarLinks.forEach(link => {
//         link.addEventListener('click', function() {
//             // Remove the 'active' class from all links
//             navbarLinks.forEach(link => link.classList.remove('active'));

//             // Add the 'active' class to the clicked link
//             this.classList.add('active');

//             // Update the position of the animation div
//             updateAnimationPosition(this);
//         });
//     });

//     function updateAnimationPosition(clickedLink) {
//         const linkRect = clickedLink.getBoundingClientRect();
//         navbarAnimation.style.width = `${linkRect.width}px`;
//         navbarAnimation.style.left = `${linkRect.left}px`;
//     }
// });

// function saveToFile() {
// // Получаем значения из полей заявки
// var name = document.getElementById('nameInput').value;
// var phone = document.getElementById('phoneInput').value;
// var telegram = document.getElementById('telegramInput').value;

// // Получаем информацию о товарах в корзине
// var cartItemsData = [];
// var totalPrice = 0; // Переменная для хранения итоговой суммы

// cartItems.forEach(item => {
// cartItemsData.push(`${item.name} - ${item.grams} гр, ${item.boxes} коробок`);
// totalPrice += item.price; // Добавляем цену каждого товара к общей сумме
// });

// // Создаем строку для сохранения в файле
// var data = `Заявка:\nИмя: ${name}\nНомер телефона: ${phone}\nТелеграм: ${telegram}\n\nТовары в корзине:\n${cartItemsData.join('\n')}\n\nИтоговая сумма: ${totalPrice} руб.`;

// // Создаем объект Blob с данными
// var blob = new Blob([data], { type: 'text/plain' });

// // Создаем URL для объекта Blob
// var url = URL.createObjectURL(blob);

// // Создаем ссылку для скачивания файла
// var link = document.createElement('a');
// link.href = url;
// link.download = 'order.txt';

// // Добавляем ссылку в документ и эмулируем клик по ней
// document.body.appendChild(link);
// link.click();

// // Очищаем URL объекта Blob для освобождения памяти
// URL.revokeObjectURL(url);
// }
