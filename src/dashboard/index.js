import { Route, Switch } from "react-router-dom";
//COMPONENTS
import Chat from "./components/chat";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

// PAGES
import Home from "./pages/home/home";

// PRODUCT
import ProductView from "./pages/products/view";
import ProductForm from "./pages/products/form";
// DEALERS
import DealersView from "./pages/dealers/view";
import DealersForm from "./pages/dealers/form";

// QUOTATION
import QuotationView from "./pages/invoices/quotation/view";
import QuotationForm from "./pages/invoices/quotation/form";
import Quotation from "./pages/invoices/quotation/quotation";

// TRANSACTION
import TransactionView from "./pages/invoices/transactions/view";
import TransactionForm from "./pages/invoices/transactions/form";
import Transaction from "./pages/invoices/transactions/transactions";

import Settings from "./pages/settings/index";
import Account from "./pages/accounts/view";

import Logout from "./logout/logout";

function Dashboard() {
  return (
    <div id="main-wrapper">
      <Chat />
      <Header />
      <Sidebar />

      <Switch>
        {/* PRODUCT ROUTES  */}
        <Route path="/product/form/:id">
          <ProductForm />
        </Route>
        <Route path="/product/form">
          <ProductForm />
        </Route>
        <Route exact path="/product">
          <ProductView />
        </Route>
        {/* PRODUCT ROUTES END  */}

        {/* Dealers ROUTES  */}
        <Route path="/customer/form/:id">
          <DealersForm />
        </Route>
        <Route path="/customer/form">
          <DealersForm />
        </Route>
        <Route path="/supplier/form/:id">
          <DealersForm />
        </Route>
        <Route path="/supplier/form">
          <DealersForm />
        </Route>
        <Route exact path="/customer">
          <DealersView />
        </Route>
        <Route exact path="/supplier">
          <DealersView />
        </Route>
        {/* Dealers ROUTES END  */}

        {/* Quotation ROUTES  */}
        <Route exact path="/quotation/view/:id">
          <Quotation />
        </Route>
        <Route exact path="/quotation/form/:id">
          <QuotationForm />
        </Route>
        <Route exact path="/quotation/form">
          <QuotationForm />
        </Route>
        <Route exact path="/quotation">
          <QuotationView />
        </Route>
        <Route exact path="/proceed/:type/:invoice">
          <TransactionForm />
        </Route>
        {/* Quotation ROUTES END  */}

        {/* Accounts */}
        <Route exact path="/accounts">
          <Account />
        </Route>
        {/* End  */}
        <Route exact path="/setting">
          <Settings />
        </Route>

        <Route exact path="/companyLogout">
          <Logout />
        </Route>

        {/* Sale ROUTES  */}
        <Route exact path="/transaction/view/:id">
          <Transaction />
        </Route>
        <Route exact path="/:type/form/:id">
          <TransactionForm />
        </Route>
        <Route exact path="/redirect/:type/:sale_id">
          <TransactionForm />
        </Route>
        <Route exact path="/:type/form">
          <TransactionForm />
        </Route>
        <Route exact path="/:type">
          <TransactionView />
        </Route>
        {/* Sale ROUTES END  */}

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
export default Dashboard;
