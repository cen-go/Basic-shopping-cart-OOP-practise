class Product {
  constructor(title, image, price, description) {
    this.title = title;
    this.imageUrl = image;
    this.description = description;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];
  totalOutput;

  get totalPrice() {
    return this.items.reduce((result, curItem) => result += curItem.price, 0);   
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.textContent = `Total: \$ ${this.totalPrice.toFixed(2)}`;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.classList.add("cart");
    cartEl.innerHTML = `
      <section>
        <h2>Total: \$ ${0}</h2>
        <button type="button">Order Now</button>
      </section>
    `;
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    App.addProductToCart(this.product);
    console.log("adding product...");
    console.log(this.product);
  }
  render() {
    const prodEl = document.createElement("li");
    prodEl.classList.add("product-item");
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button type="button">Add to Cart</button>
        </div>
      </div>
    `;
    const addToCartButton = prodEl.querySelector("button");
    addToCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product("A Pillow", "assets/images/pillow-1.webp", 19.99, "A soft pillow."),
    new Product("A carpet", "assets/images/carpet-1.webp", 89.99, "High quality Iran carpet.")    
  ];
  constructor() {}
  render() {
    const prodList = document.createElement("ul");
    prodList.classList.add("product-list");
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    } 
    return prodList;   
  }
}

class Shop {

  render() {    
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();


