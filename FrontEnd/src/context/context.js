import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProductContext = React.createContext();

export default class ProductProvider extends Component {
  state = {
    products: [],
    filterProducts: [],
    cart: [],
    price: 0,
    maxPrice: 0,
    minPrice: 0,
    loading: true,
    tshirt: false,
    jeans: false,
    trousers: false,
    loggedin: false,
    jwt: "",
    name:"",
    email:""
  };

  async componentDidMount() {
    const products = await axios.get("/api/v1/products/getallproducts");

    let Products = products.data.data[0];
    let maxPrice = Math.max(...Products.map((items) => items.price));
    this.setState({
      products: Products,
      filterProducts: Products,
      price: maxPrice,
      maxPrice: maxPrice,
      loading: false,
      modalOpen: false,
    });

    // if (Cookies.get("jwt")) {
    //   this.setState({
    //     loggedin: true,
    //   });
    // }
  }

  logoutHandler = async () => {
    const stat = await axios.get("/api/v1/users/logout");
    console.log(stat);
    console.log(this.state.jwt);
    this.setState({
      loggedin: false,
    });
    alert("Do you want to log out");
  };

  signupHandler = async (name, email, pass, cpass) => {
    const params = JSON.stringify({
      name: name,
      email: email,
      password: pass,
      passwordConfirm: cpass,
    });
    try {
      const jwtoken = await axios.post("/api/v1/users/signup", params, {
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(jwtoken.data.token);
      this.setState({
        loggedin: true,
        jwt: jwtoken,
        name:jwtoken.data.data.user.name,
        email:jwtoken.data.data.email
      });
    } catch (err) {
      console.log(err);
      this.setState({
        loggedin: false,
      });
    }
  };

  cartHandler=async ()=>{
    const cartParams=JSON.stringify({
      name:this.state.name,
      email:this.state.email,
      cart:this.state.cart
    });

    const newCart=await (axios.post("/api/v1/products/cart",cartParams,{
      headers: {
        "content-type": "application/json",
      },
    }))
    console.log(newCart.data.data[0].cart);
    this.setState({
      cart:newCart.data.data[0].cart
    })
    console.log(this.state.cart)
  }

  loginHandler = async (email, pass) => {
    const params = JSON.stringify({
      email: email,
      password: pass,
    });
    
    try {
      const jwtoken = await axios.post("/api/v1/users/login", params, {
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(jwtoken.data.data.user.name);
      
      this.setState({
        loggedin: true,
        jwt: jwtoken,
        name:jwtoken.data.data.user.name,
        email:jwtoken.data.data.email
      });
      this.cartHandler();
      
    } catch (err) {
      console.log(err);
      this.setState({
        loggedin: false,
      });
    }
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value,
      },
      this.filterProducts
    );
  };

  addToCart = (prod) => {
    this.setState({
      cart: [...this.state.cart, prod],
      modalOpen: true,
    });
    setTimeout(() => {
      this.setState({
        modalOpen: false,
      });
    }, 1500);
  };

  filterProducts = () => {
    let {
      products,
      price,
      maxPrice,
      minPrice,
      loading,
      tshirt,
      jeans,
      trousers,
    } = this.state;
    price = parseInt(price);
    let tempProducts = [...products];
    tempProducts = tempProducts.filter((el) => el.price <= price);

    if (tshirt) {
      tempProducts = tempProducts.filter((prod) => prod.category === "tshirt");
    }
    if (jeans) {
      tempProducts = tempProducts.filter((prod) => prod.category === "jeans");
    }
    if (trousers) {
      tempProducts = tempProducts.filter(
        (prod) => prod.category === "trousers"
      );
    }

    this.setState({
      filterProducts: tempProducts,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          addToCart: this.addToCart,
          loginHandler: this.loginHandler,
          signupHandler: this.signupHandler,
          logoutHandler: this.logoutHandler,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer, ProductContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <ProductConsumer>
        {(value) => <Component {...props} context={value} />}
      </ProductConsumer>
    );
  };
}
