import React,{useState, useEffect} from "react";
import { Grid, Typography } from "@mui/material";


const TemplateNotesAndRemarks = ({invoiceData, itemDetails}) => {

  const [subTotal, setSubTotal] = useState("");
const [vatTotal, setVatTotal] = useState("");
const [totalValue, setTotalValue] = useState("");


useEffect(() => {
  let amount = 0;
  itemDetails.forEach((row) => {
    amount += parseFloat(row.amount);
  });
  
  const subtotalFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SAR' }).format(amount);
  setSubTotal(subtotalFormatted);
}, [itemDetails]);


useEffect(() => {
let amount = 0;
itemDetails.forEach((row) => {
  amount += parseFloat(row.amount);
});  
const newVatTotal = amount * 0.15;
  const vatTotalFormatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "SAR" }).format(newVatTotal);
  setVatTotal(vatTotalFormatted);
  
  const totalAmount = amount + newVatTotal;
  const totalFormatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "SAR" }).format(totalAmount);
  setTotalValue(totalFormatted);
}, []);

// Now, you can use 'subTotal', 'vatTotal', and 'totalValue' in your component
return (
    <Grid item={true} sx={{ display: "flex"}}>
      <Grid item={true} sx={{ flex: 3 }}>
        <Grid
          item={true}
          sx={{
            height: 45,
            border: "1px solid",
            paddingLeft: 1,
          }}
        >
          <Typography>
            {invoiceData.notes === ""
              ? "Thank you for your busines."
              : invoiceData.notes}
          </Typography>
        </Grid>
        <Grid
          item={true}
          sx={{
            height: 95,
            border: "1px solid",
            paddingTop: 1,
            paddingLeft: 1,
          }}
        >
          {invoiceData.remarks === "" ? (
            <>
              <Typography sx={{ fontSize: "13px" }}>Bank Details:</Typography>
              <Typography sx={{ fontSize: "13px" }}>
                Bank Name: Saudi National Bank
              </Typography>
              <Typography sx={{ fontSize: "13px" }}>
                Account No# 37800000282610
              </Typography>
              <Typography sx={{ fontSize: "13px" }}>
                IBAN No: SA6310000037800000282610
              </Typography>
            </>
          ) : (
            <Typography>{invoiceData.remarks}</Typography>
          )}
        </Grid>
      </Grid>

      <Grid item={true} sx={{ flex: 1.3 }}>
        <Grid
          item={true}
          sx={{
            border: "1px solid",
            height: 40,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{paddingLeft:3,paddingTop:0.5}}>Subtotal</Typography>
          <Typography variant="h7" sx={{paddingRight:3,paddingTop:1}}>{subTotal}</Typography>
        </Grid>

        <Grid
          item={true}
          sx={{
            border: "1px solid",
            height: 40,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{paddingTop:0.5,paddingLeft:3}}> VAT 15%</Typography>
          <Typography variant="h7" sx={{paddingRight:3,paddingTop:1}}>{vatTotal}</Typography>
        </Grid>
        <Grid
          item={true}
          sx={{
            border: "1px solid",
            height: 60,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" sx={{ paddingLeft:3, fontWeight: "bold", paddingTop: 1.2 }} >
            Total
          </Typography>
          <Typography variant="h6" sx={{ paddingRight:3, fontWeight: "bold", paddingTop: 1.3, align:"right" }}>
            {totalValue}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TemplateNotesAndRemarks;
