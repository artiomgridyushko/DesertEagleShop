document.addEventListener('DOMContentLoaded', function() {
  var telegramInput = document.querySelector('input[name="telegram"]');

  // Ensure the "@" is always at the beginning and cannot be removed
  telegramInput.addEventListener('input', function() {
    if (!telegramInput.value.startsWith('@')) {
      telegramInput.value = '@' + telegramInput.value.replace(/@/g, '');
    }
  });

  // Prevent the "@" from being deleted
  telegramInput.addEventListener('keydown', function(event) {
    if (telegramInput.selectionStart === 0 && (event.key === 'Backspace' || event.key === 'Delete')) {
      event.preventDefault();
    }
  });
});

function sendFormData() {
  var name = document.querySelector('input[name="name"]').value;
  var phone = document.querySelector('input[name="phone"]').value;
  var telegram = document.querySelector('input[name="telegram"]').value;

  var products = JSON.parse(localStorage.getItem('productData'));


  if (!telegram.startsWith('@')) {
    alert('Телеграм должен начинаться с символа @.');
    return;
  }

  if (name && telegram) {
    if (products && products.length > 0) {
      var productsMessage = 'Товары в корзине:\n\n';
      var totalPrice = 0;
      products.forEach(function (product) {
        productsMessage += 'Название: ' + product.title + '\n';
        productsMessage += 'Цена: ' + product.price + '\n';
        productsMessage += 'Количество: ' + product.quantity + '\n';
        productsMessage += 'Тип: ' + product.typeOFProduct + '\n';
        var subtotal = product.price * product.quantity;
        totalPrice += subtotal;
        productsMessage += 'Сумма: ' + subtotal + '\n';
        productsMessage += '\n';
      });
      productsMessage += 'Общая сумма заказа: ' + totalPrice + '\n';

      var message = 'Новая заявка!\n\n';
      message += 'Имя: ' + name + '\n';
      if (phone) {
        message += 'Номер телефона: ' + phone + '\n';
      }
      message += 'Телеграм: ' + telegram + '\n\n';
      message += productsMessage;

      var token = '7078493412:AAHgD4pvapCv7UaViSDgek1tjuWxxqqJncI';
      var chatId = '-1002213479267';

      var url =
        'https://api.telegram.org/bot' +
        token +
        '/sendMessage?chat_id=' +
        chatId +
        '&text=' +
        encodeURIComponent(message);

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert('Заявка успешно отправлена в чат!');
          localStorage.removeItem('productData');
          location.reload();
        })
        .catch((error) => {
          console.error('Ошибка:', error);
          alert('Произошла ошибка при отправке заявки.');
        });
    } else {
      alert('В корзине нет товаров. Пожалуйста, добавьте товары в корзину перед отправкой заявки.');
    }
  } else {
    alert('Пожалуйста, заполните все обязательные поля формы.');
  }
}


const basketCount = document.querySelector('#cart');
const basketModl = document.querySelector('#basketModal');
const basketModlContent = document.querySelector('#basketModal-container');
const mobilBurgerModal = document.getElementById('mobil-burger-modal');
const burgerModalLiNav = document.querySelectorAll('.burger-modal-li');
const mainUnitContainer = document.getElementById('main_unit-container');
const productMainWrapp = document.getElementById('product__main_wrapp');
const navItem = document.querySelectorAll('.nav-item');
const productMain = document.getElementById('product__main');
const productAddBasketBtn = document.getElementById('product__add-basket_btn');
const reviewBlockBtns = document.querySelectorAll('.review__more_btn');
const burgermenuNavs = document.querySelectorAll('.burger-modal-li a');

if (!localStorage.getItem('productData')) localStorage.setItem('productData', JSON.stringify([]));
else basketCount.textContent = JSON.parse(localStorage.getItem('productData')).length;

const swiperBanner = new Swiper('.swiper_baner', {
  slidesPerView: 1,
  spaceBetween: 10,
  direction: 'horizontal',
  loop: false,
  navigation: {
    nextEl: '#nextslide_baner',
    prevEl: '#prevslide_baner'
  }
});

const fetchData = async () => {
  try {
    const response = await fetch('./dataProduct/dataProduct.json');
    const { eSigs, chewingGum, iqos, sticks, snus } = await response.json();
    const eSigsBlock = document.querySelector('#eSigs');
    const chewingGumBlock = document.querySelector('#chewingGum');
    const iqosBlock = document.querySelector('#iqos');
    const sticksBlock = document.querySelector('#sticks');
    const snusBlock = document.querySelector('#snus');

    const HTMLTemplate = (idElement, data) => {
      for (let product of data) {
        const new_test = JSON.stringify(product);
        idElement.innerHTML += ` 
      <div class="swiper-slide">
        <div class="product-contaianer-wrapp">
          <div class="product-contaianer">
            <div class="product-block">
              <div class="product-block-img-container">
                <img class="product-block-img" src="${product.img}" alt="Product 1" />
                <p class="product-title">${product.title}</p>
              </div>
              <button
                class="product-btn"
                data-test = '${new_test}'
             
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div> `;
      }
    };

    HTMLTemplate(eSigsBlock, eSigs);
    HTMLTemplate(chewingGumBlock, chewingGum);
    HTMLTemplate(iqosBlock, iqos);
    HTMLTemplate(sticksBlock, sticks);
    HTMLTemplate(snusBlock, snus);

    const test_product_data = document.querySelectorAll('.product-btn');
    test_product_data.forEach((el) => {
      el.addEventListener('click', (e) => {
        mainUnitContainer.style.display = 'none';
        productMainWrapp.style.display = 'flex';
        const newproduct = e.target.getAttribute('data-test');
        const Testproduct = JSON.parse(newproduct);
        const { img, moreDetails, productOptionImage, title, typeOfProduct, price } = Testproduct;
        productMain.innerHTML = `
       <div class="product__img_container">
        <img src="${img}" alt="product" class="product__img" />
        <div class="product__img_menu-container" onclick="handleImageClick(event)">
        ${productOptionImage.map((item) => `<img src='${item}' alt='product' class='product__img_manu' data-src='${item}' />`).join('')}
      </div>
      
        <div class="productMobal_add_price-container">
          <div class="product__price_container">${price}<span>Р</span></div>
          <button type="button" class="product__add-basket_btn">Добавить в корзину</button>
        </div>
      </div>
      <div class="product__info_container">
        <div class="product__title_contianer">
          <h1>${title}</h1>
          <div class="product__view-quantity_container">
            <div class="product__title_container">
              <div class="product__title">Вид</div>
              <select class="product__options" id="product__options" oninput="updatePriceOnChange(event)">
                       ${typeOfProduct
                         .map((item) => `<option value='${item.type}' id ="${item.id}">${item.type}</option>`)
                         .join('')}
              </select>
            </div>
            <div class="c_title_container">
              <div class="product__title_container">
                <div class="product__title">Кол-во</div>
              <input class="product__options product_input"  id ="product_input"  oninput="quantityField(event); updatePriceOnChange(event)";" type="number" value="1">
              </div>
            </div>
          </div>
        </div>
        <div class="product__description_container">${moreDetails}</div>
        <div class="product__price_contianer">
          <div class="product__price_container">${price} <span>руб</span></div>
          <button type="button" class="product__add-basket_btn" id = "product__add-basket_btn"onclick="addbasketProductStorage('${img}','${title}','${price}')">Добавить в корзину</button>
        </div>
      </div>
`;
      });
    });
    const swiperDefultSetting = {
      slidesPerView: 4,
      spaceBetween: 35,
      direction: 'horizontal',
      loop: true,
      watchOverflow: false
    };
    const swiperBreakpoits = {
      350: {
        slidesPerView: 2,
        spaceBetween: 6
      },
      648: {
        slidesPerView: 3,
        spaceBetween: 6
      },
      780: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 35
      },
      1290: {
        slidesPerView: 4,
        spaceBetween: 35
      }
    };
    const swiperESigsBlock = new Swiper('.eSigsBlock', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#eSigsBlocknextBtn'
      },
      breakpoints: swiperBreakpoits
    });
    const swiperChewingGumBlcok = new Swiper('.chewingGumBlcok', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#chewingGumnexBtn'
      },
      breakpoints: swiperBreakpoits
    });
    const swiperIqosBlock = new Swiper('.iqosBlock', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#iqosBlocknexBtn'
      },
      breakpoints: swiperBreakpoits
    });
    const swiperSticksBlock = new Swiper('.sticksBlock', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#sticksBlocknexBtn'
      },
      breakpoints: swiperBreakpoits
    });
    const snusSticksBlock = new Swiper('.snusBlock', {
      ...swiperDefultSetting,
      navigation: {
        nextEl: '#snusBlocknexBtn'
      },
      breakpoints: swiperBreakpoits
    });
    const reviws = document.querySelector('.reviews');
    const reviewsSwiper_Block = new Swiper(reviws, {
      slidesPerView: 3,
      spaceBetween: 31,
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '#nextReview',
        prevEl: '#prevReview'
      },
      watchOverflow: false,
      breakpoints: {
        350: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        500: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        780: {
          slidesPerView: 2,
          spaceBetween: 35
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
    const nextReview = document.querySelector('#nextReview');
    const prevReview = document.querySelector('#prevReview');
    if (reviewsSwiper_Block.isBeginning) {
      prevReview.style.display = 'none';
      nextReview.style.display = 'flex';
    }
    if (reviewsSwiper_Block.isEnd) {
      prevReview.style.display = 'flex';
      nextReview.style.display = 'none';
    }
    nextReview.addEventListener('click', () => {
      if (reviewsSwiper_Block.isBeginning) {
        prevReview.style.display = 'none';
        nextReview.style.display = 'flex';
      }
      if (reviewsSwiper_Block.isEnd) {
        prevReview.style.display = 'flex';
        nextReview.style.display = 'none';
      }
    });
    prevReview.addEventListener('click', () => {
      if (reviewsSwiper_Block.isBeginning) {
        prevReview.style.display = 'none';
        nextReview.style.display = 'flex';
      }
      if (reviewsSwiper_Block.isEnd) {
        prevReview.style.display = 'flex';
        nextReview.style.display = 'none';
      }
    });

    // console.log(reviewsSwiper_Block.isBeginning);
    // console.log(reviewsSwiper_Block.isEnd);

    return { eSigs, chewingGum, iqos, sticks, snus };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();

const calculatePrice = (type, quantity, title) => {
  let price = 0;

  // СНЮС

  if (title === 'DUALL NEO') {
        price = 30;
  }

  if (title === 'ZERO S') {
        price = 40;
  }

  if (title === 'XROS III MIN') {
        price = 70;
  }
   
  if (title === 'XROS PRO') {
      price = 110;
  }

 

  // ЭЛЕКТРОННЫЕ СИГАРЕТЫ
  if (title === 'Rell Orange') {
      price = 25;
  }

  if (title === 'Самоубийца&Грех') {
      price = 20;
    }

  if (title === 'Самоубийца') {
      price = 20;
    }

  if (title === 'Podonki&Aнархия') {
      price = 18;
    }
  
  if (title === 'Podonki&Malasian') {
      price = 15;
  }

  if (title === 'Podonki V1') {
      price = 15;
  }

  if (title === 'Podonki V2') {
      price = 15;
  }

  if (title === 'Blood') {
      price = 15;
  }

  if (title === 'Duall') {
      price = 15;
  }

  if (title === 'Sabotage') {
      price = 15;
  }

  if (title === 'Mad') {
    price = 15;
  }

  if (title === 'PRIGOVOR') {
    price = 15;
  }

  if (title === 'Бошки') {
    price = 10;
  }
  
  if (title === 'Hotspot') {
    price = 10;
  }

  if (title === 'Urbn 1500') {
    price = 10;
  }

  if (title === 'Vapesoul 3500') {
    price = 15;
  }

  if (title === 'Мишки 4000') {
    price = 15;
  }

  if (title === 'Elbar pod') {
    price = 17;
  }

  if (title === 'Ditron') {
    price = 17;
  }

  if (title === 'Картридж elf bar pod') {
    price = 10;
  }

  if (title === 'Картридж Ditron') {
    price = 10;
  }

  if (title === 'Картридж Xros') {
    price = 14;
  }

  if (title === 'Картридж всру/вмейт') {
    price = 14;
  }

  if (title === 'Картридж Charon baby') {
    price = 12;
  }

  if (title === 'Картридж Aegis Hero 2') {
    price = 18;
  }

  if (title === 'Картидж Ditron') {
    price = 10;
  }

  if (title === 'Испаритель b-siries 0.2 om') {
    price = 14;
  }

  if (title === 'Испаритель PnP 0.15 om') {
    price = 12;
  }


  if (title === 'Poek') {
    price = 15;
  }

  if (title === 'Bonum') {
    price = 15;
  }

  if (title === 'Fave') {
    price = 15;
  }

  if (title === 'The simpsons') {
    price = 20;
  }

  if (title === 'Futurama') {
    price = 20;
  }

  if (title === 'Faff') {
    price = 20;
  }

  // console.log("Price for", type, "with quantity", quantity, "and title", title, "is", price);
  return price;
};

const updatePriceOnChange = (event) => {
  const newQuantity = parseInt(document.getElementById('product_input').value); // Получаем новое количество из поля ввода
  const productType = document.getElementById('product__options').value; // Получаем значение выбранного вида продукта
  const productTitle = document.querySelector('.product__title_contianer h1').textContent.trim(); // Получаем название продукта

  const newPrice = calculatePrice(productType, newQuantity, productTitle); // Вычисляем новую цену

  // Обновляем цену на странице
  document.querySelectorAll('.product__price_container').forEach((priceContainer) => {
    priceContainer.textContent = newPrice + ' руб';
  });
};

// Глобальная функция для обработки клика на изображении в меню
function handleImageClick(event) {
  const newImgSrc = event.target.getAttribute('data-src'); // Получаем путь к новому изображению
  const productImg = document.querySelector('.product__img'); // Находим основное изображение
  productImg.setAttribute('src', newImgSrc); // Меняем его src на путь нового изображения
}


let moreButtonState = false;
reviewBlockBtns.forEach((moreBtn) => {
  moreBtn.addEventListener('click', () => {
    moreButtonState = !moreButtonState;
    if (moreButtonState) {
      moreBtn.parentNode.querySelector('.text').style.height = 'max-content';
      moreBtn.textContent = 'свернуть';
    } else {
      if (outerWidth > 500) {
        moreBtn.parentNode.querySelector('.text').style.height = '170px';
      } else if (outerWidth < 500) {
        moreBtn.parentNode.querySelector('.text').style.height = '94px';
      }
      moreBtn.textContent = 'подробнее...';
    }
  });
});

document.addEventListener('DOMContentLoaded ', function () {
  var downloadTrigger = document.getElementById('downloadTrigger');

  downloadTrigger.addEventListener('click ', function () {
    var downloadLink = document.createElement('a ');
    downloadLink.href = 'Новый-документ.pdf '; // Замените на путь к вашему документу
    downloadLink.download = 'Типы.pdf '; // Замените на желаемое имя файла

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
});

// Проверяем, было ли уже показано окно
if (!localStorage.getItem('ageConfirmationShown')) {
  // Если окно еще не было показано, показываем его
  window.onload = function () {
    document.getElementById('ageModal').style.display = 'flex';
  };

  // Помечаем, что окно было показано
  localStorage.setItem('ageConfirmationShown', 'true');
}

// Функция для обработки ответа "Да"
function confirmAge() {
  document.getElementById('ageModal').style.display = 'none';
  // Записываем информацию о подтверждении возраста
  localStorage.setItem('ageConfirmed', 'true');
}

const rejectAge = () => alert('Вы должны быть старше 18 лет для доступа к сайту.');

const openForm = () => {
  if (basketModl.style.display == 'block') basketModl.style.display = 'none';
  if (mobilBurgerModal.style.display == 'block') mobilBurgerModal.style.display = 'none';
  document.getElementById('myForm').style.display = 'flex';
};

const basketProductHtml = (basketModlContent, storageProduct) => {
  const calculatePrice = (type, quantity, title) => {
    let price = 0;

    // СНЮС

    if (title === 'DUALL NEO') {
      price = 30;
}

if (title === 'ZERO S') {
      price = 40;
}

if (title === 'XROS III MIN') {
      price = 70;
}
 
if (title === 'XROS PRO') {
    price = 110;
}



// ЭЛЕКТРОННЫЕ СИГАРЕТЫ
if (title === 'Rell Orange') {
    price = 25;
}

if (title === 'Самоубийца&Грех') {
    price = 20;
  }

if (title === 'Самоубийца') {
    price = 20;
  }

if (title === 'Podonki&Aнархия') {
    price = 18;
  }

if (title === 'Podonki&Malasian') {
    price = 15;
}

if (title === 'Podonki V1') {
    price = 15;
}

if (title === 'Podonki V2') {
    price = 15;
}

if (title === 'Blood') {
    price = 15;
}

if (title === 'Duall') {
    price = 15;
}

if (title === 'Sabotage') {
    price = 15;
}

if (title === 'Mad') {
  price = 15;
}

if (title === 'PRIGOVOR') {
  price = 15;
}

if (title === 'Бошки') {
  price = 10;
}

if (title === 'Hotspot') {
  price = 10;
}

if (title === 'Urbn 1500') {
  price = 10;
}

if (title === 'Vapesoul 3500') {
  price = 15;
}

if (title === 'Мишки 4000') {
  price = 15;
}

if (title === 'Elbar pod') {
  price = 17;
}

if (title === 'Ditron') {
  price = 17;
}

if (title === 'Картридж elf bar pod') {
  price = 10;
}

if (title === 'Картридж Ditron') {
  price = 10;
}

if (title === 'Картридж Xros') {
  price = 14;
}

if (title === 'Картридж всру/вмейт') {
  price = 14;
}

if (title === 'Картридж Charon baby') {
  price = 12;
}

if (title === 'Картридж Aegis Hero 2') {
  price = 18;
}

if (title === 'Испаритель b-siries 0.2 om') {
  price = 14;
}

if (title === 'Испаритель PnP 0.15 om') {
  price = 12;
}


if (title === 'Poek') {
  price = 15;
}

if (title === 'Bonum') {
  price = 15;
}

if (title === 'Fave') {
  price = 15;
}

if (title === 'The simpsons') {
  price = 20;
}

if (title === 'Futurama') {
  price = 20;
}

if (title === 'Faff') {
  price = 20;
}

    // console.log("Price for", type, "with quantity", quantity, "and title", title, "is", price);
    return price;
  };

  let summ = 0;
  storageProduct.forEach((count) => {
    count.totalPrice = calculatePrice(count.typeOFProduct, count.quantity, count.title) * count.quantity;
    // console.log("Total price for", count.typeOFProduct, "with quantity", count.quantity, "is", count.totalPrice);
    summ += count.totalPrice;
  });

  // console.log("Summ:", summ);

  basketModlContent.innerHTML = `<div class="basketModal-product-block-wrapp">
    ${storageProduct
      .map(
        (item, index) =>
          `<div class="basketModal-product-block">
            <div class="basketModal-img-container">
              <img src="${item.img}" />
              <div class="basketModal-title-container">
                <h3>${item.title} <p class ="basket__title_view">${item.typeOFProduct}</p></h3>
                <p>${item.quantity} штук</p>
              </div>
            </div>
            <img src="./images/icons/cross.png" alt="delet" class="basketModal-delet-product" onclick="deletProductStorage(${index})" />
          </div>`
      )
      .join('')}
    </div >
    <div class="basketModal-total-amount">
      <div class="basketModal-total-container">
        <div>Итог:</div>
        <div>${summ}<span> рублей.</span></div>
      </div>
      <button class="basketModla-btn" type="button" onclick="openForm()">Оставить заявку</button>
    </div>`;
};

const closeForm = () => (document.getElementById('myForm').style.display = 'none ');
const openMobalBurger = () => {
  if (basketModl.style.display == 'flex') basketModl.style.display = 'none';
  mobilBurgerModal.style.display = 'block';
};
const closeMobalBurger = () => (mobilBurgerModal.style.display = 'none');
const openBasker = () => {
  basketModl.style.display = 'flex';
  if (basketModl.style.display == 'flex') mobilBurgerModal.style.display = 'none';
  const basketProducts = JSON.parse(localStorage.getItem('productData'));
  basketProductHtml(basketModlContent, basketProducts);
};
const closeBasker = () => (basketModl.style.display = 'none');
const deletProductStorage = (id) => {
  const ProductsStorage = JSON.parse(localStorage.getItem('productData'));
  const newProductStorage = ProductsStorage.filter((elem, index) => index !== id);
  localStorage.setItem('productData', JSON.stringify(newProductStorage));
  basketProductHtml(basketModlContent, newProductStorage);
  basketCount.textContent = newProductStorage.length;
};

burgerModalLiNav.forEach((nav) => {
  nav.addEventListener('click', () => {
    mobilBurgerModal.style.display = 'none';
    if (mainUnitContainer.style.display == 'none' && productMainWrapp.style.display == 'flex') {
      mainUnitContainer.style.display = 'block';
      productMainWrapp.style.display = 'none';
    }
  });
});
navItem.forEach((nav) => {
  nav.addEventListener('click', () => {
    if (mainUnitContainer.style.display == 'none' && productMainWrapp.style.display == 'flex') {
      mainUnitContainer.style.display = 'block';
      productMainWrapp.style.display = 'none';
    }
  });
});
const ClickHomePage = () => {
  if (mainUnitContainer.style.display == 'none' && productMainWrapp.style.display == 'flex') {
    mainUnitContainer.style.display = 'block';
    productMainWrapp.style.display = 'none';
  }
};

const quantityField = (e) => {
  if (e.target.value.length == 2) {
    let firstNumber = parseInt(e.target.value.charAt(0), 10);
    if (firstNumber == 0) document.getElementById('product_input').value = 1;
  }
  if (e.target.value < 0) document.getElementById('product_input').value = 1;
};
const addbasketProductStorage = (img, title, price) => {
  const typeoFProduct = document.getElementById('product__options');
  const quantity = Number(document.getElementById('product_input').value);
  const typeID = typeoFProduct.options[typeoFProduct.selectedIndex].id;
  const typeValue = typeoFProduct.value;
  const countBlockAnimate = document.querySelector('.cart-count');
  countBlockAnimate.classList.add('cart-countAniamtiaon');
  setTimeout(function () {
    countBlockAnimate.classList.remove('cart-countAniamtiaon');
  }, 1000);

  addnewProduct = JSON.parse(localStorage.getItem('productData'));
  let newQuantity = 0;
  if (quantity == 0) {
    newQuantity = 1;
    document.getElementById('product_input').value = newQuantity;
  } else newQuantity = quantity;

  if (addnewProduct.length == 0) {
    let sum = 0;
    if (newQuantity > 1) sum = Number(price) * newQuantity;
    addnewProduct.push({
      img: img,
      title: title,
      quantity: newQuantity,
      typeID: Number(typeID),
      typeOFProduct: typeValue,
      price: Number(price),
      totalPrice: sum
    });
    localStorage.setItem('productData', JSON.stringify(addnewProduct));
  } else {
    addnewProduct = addnewProduct.map((item) => {
      if (item.title === title && item.typeID === Number(typeID)) {
        (item.quantity = item.quantity + newQuantity), (item.totalPrice = item.quantity * item.price);
        return item;
      } else return item;
    });
    let isFound = addnewProduct.some((item) => item.title === title && item.typeID === Number(typeID));
    if (!isFound) {
      let sum = 0;
      if (newQuantity > 1) sum = Number(price) * newQuantity;
      addnewProduct.push({
        img: img,
        title: title,
        quantity: newQuantity,
        typeID: Number(typeID),
        typeOFProduct: typeValue,
        price: Number(price),
        totalPrice: sum
      });
    }

    localStorage.setItem('productData', JSON.stringify(addnewProduct));
  }
  basketProductHtml(basketModlContent, addnewProduct);

  basketCount.textContent = JSON.parse(localStorage.getItem('productData')).length;
};

function submitForm() {
  var formData = new FormData(document.getElementById('applicationForm '));

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // Ваши действия после успешной отправки формы
        alert('Заявка успешно отправлена! ');
        closeForm(); // Закрываем форму после успешной отправки
      } else {
        // Ваши действия в случае ошибки отправки формы
        alert('Произошла ошибка при отправке заявки. ');
      }
    }
  };

  xhr.open('POST ', 'submit.php ', true);
  xhr.send(formData);
}
burgermenuNavs.forEach((el) => {
  el.addEventListener('click', () => {
    setTimeout(() => {
      const blockId = el.getAttribute('href').substring(1);
      const blockSection = document.getElementById(blockId);
      let test_block = blockSection.offsetTop;
      window.scrollTo({
        top: test_block - 100,
        behavior: 'smooth'
      });
    }, 12);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const navbarLinks = document.querySelectorAll('.navbar a');
  window.addEventListener('scroll', () => {
    updateActiveNav();
  });

  navbarLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      navbarLinks.forEach((link) => link.classList.remove('active'));
      this.classList.add('active');
      updateAnimationPosition(this);
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });

  function updateActiveNav() {
    const scrollPosition = window.scrollY;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;

    navbarLinks.forEach((link) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        let offset = 0;

        // Рассчитываем смещение в зависимости от способа скролла
        if (scrollPosition >= targetSection.offsetTop - navbarHeight - 130) {
          offset = 200; // Если скролл произошел ручками
        } else {
          offset = 200; // Если скролл был инициирован нажатием на кнопку навигации
        }
        const targetSectionTop = targetSection.offsetTop - navbarHeight - offset;
        const targetSectionBottom = targetSectionTop + targetSection.offsetHeight;
        // if (targetId === 'contact') {
        //   offset += 700; // Больший отступ для раздела "Контакты"
        // }

        if (scrollPosition >= targetSectionTop && scrollPosition < targetSectionBottom) {
          updateAnimationPosition(link);
          navbarLinks.forEach((link) => link.classList.remove('active'));
          link.classList.add('active');
        } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          updateAnimationPosition(link);
          navbarLinks.forEach((link) => link.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  function updateAnimationPosition(clickedLink) {
    const navbarAnimation = document.querySelector('.navbar_animation');
    const linkRect = clickedLink.getBoundingClientRect();
    navbarAnimation.style.left = `${linkRect.left}px`;
    navbarAnimation.style.width = `${linkRect.width}px`;
  }

  function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      window.scrollTo({
        top: targetSection.offsetTop - navbarHeight - 200, // Смещение на 50px вверх при скролле ручками
        behavior: 'smooth'
      });
    }
  }
});
