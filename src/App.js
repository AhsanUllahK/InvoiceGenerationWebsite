import { useState } from "react";
import InvoiceForm from "./components/invoiceform";
import InvoiceTemplate from "./components/invoicetemplate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [itemDetails, setItemDetails] = useState([
    // {
    //   itemQuantity: 0,
    //   itemCode: "",
    //   itemDescription: "",
    //   itemPriceEach: 0,
    //   amount: 0,
    // },
    {
      itemQuantity: 5,
      itemCode: "oil",
      itemDescription: "Cooking",
      itemPriceEach: "240",
      amount: "1500",
    },
    {
      itemQuantity: 17,
      itemCode: "percil",
      itemDescription: "My Pecile",
      itemPriceEach: "24",
      amount: "408",
    },
    {
      itemQuantity: 11,
      itemCode: "register",
      itemDescription: "School Register(500pages)",
      itemPriceEach: "310",
      amount: "3410",
    },
  ]);

  const [invoiceData, setInvoiceData] = useState({
    companyNameEn: "",
    companyNameAr: "",
    CRno: Number,
    VATno: Number,
    invoiceNumber: Number,
    invoiceDate: Date,
    invoiceDueDate: Date,
    quote: "",
    customerAccount: Number,
    customerVAT: Number,
    pONumber: Number,
    store: "",
    customerName: "",
    customerAddress: "",
    customerContactPerson: Number,
    notes: "",
    remarks: "",
  });

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/invoicegenerationwebsite"
            element={
              <InvoiceForm
                itemDetails={itemDetails}
                invoiceData={invoiceData}
                setInvoiceData={setInvoiceData}
                setItemDetails={setItemDetails}
              />
            }
          />
          <Route
            path="/invoicetemplate"
            element={
              <InvoiceTemplate
                invoiceData={invoiceData}
                itemDetails={itemDetails}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
