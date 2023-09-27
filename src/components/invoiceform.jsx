import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// import DeleteIcon from "@mui/icons-material/DeleteIcon"
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

const InvoiceForm = ({
  invoiceData,
  setInvoiceData,
  itemDetails,
  setItemDetails,
}) => {
  const [recaptchaVal, setRecaptchaVal] = useState(null);

  const navigate = useNavigate();
  // date validation needs to be added.

  const formValidation = (invoiceData) => {
    if (invoiceData.invoiceDueDate < invoiceData.invoiceDate) {
      alert("Invioce Due date must be greater or equal to invoice date.");
      return false;
    }
    for (const field in invoiceData) {
      if (["customerVAT", "notes", "remarks"].includes(field)) continue;
      if (!invoiceData[field]) return false;
    }
    return true;
  };

  const recaptchahandler = () => {
    setRecaptchaVal(!recaptchaVal);
  };

  const addMorehandler = () => {
    setItemDetails((prevItemDetails) => [
      ...prevItemDetails,
      {
        itemQuantity: 0,
        itemCode: "",
        itemDescription: "",
        itemPriceEach: 0,
        amount: 0,
      },
    ]);
  };

  const handleInvoiceData = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInvoiceItemData = (e, index) => {
    const { name, value } = e.target;
    const updatedname = name.replace(/\d/g, "");

    setItemDetails((prevItemDetails) => {
      const updatedItems = [...prevItemDetails];
      updatedItems[index] = {
        ...updatedItems[index],
        [updatedname]: value,
      };

      return updatedItems;
    });
  };

  const deleteHandler = (indexDelete) => {
    const updatedList = [...itemDetails];

    updatedList.splice(indexDelete, 1);

    setItemDetails(updatedList);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaVal) {
      alert(`reCAPTCHA must be filled. \nيجب ملء reCAPTCHA`);
    } else if (!formValidation(invoiceData)) {
      alert(`All fields are mandatory. \n جميع الحقول إلزامية .`);
    } else {
      navigate("/invoicetemplate");
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Enter Invoice Data
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>Company Name</Typography>
              <TextField
                fullWidth
                name="companyNameEn"
                value={invoiceData.companyNameEn}
                onChange={handleInvoiceData}
                //
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ textAlign: "right" }}>
                اسم الشركة (عربي)
              </Typography>
              <TextField
                fullWidth
                name="companyNameAr"
                value={invoiceData.companyNameAr}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>CR# / السجلات التجارية</Typography>
              <TextField
                fullWidth
                name="CRno"
                value={invoiceData.CRno}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>VAT# /ضريبة القيمة المضافة</Typography>
              <TextField
                fullWidth
                name="VATno"
                value={invoiceData.VATno}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Invoice # / رقم الفاتورة</Typography>
              <TextField
                fullWidth
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Invoice Date/تاريخ الفاتورة</Typography>
              <TextField
                fullWidth
                type="date"
                name="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Due Date/تاريخ الاستحقاق</Typography>
              <TextField
                fullWidth
                type="date"
                name="invoiceDueDate"
                value={invoiceData.invoiceDueDate}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Quote #/يقتبس</Typography>
              <TextField
                fullWidth
                name="quote"
                value={invoiceData.quote}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>customer account/حساب العميل</Typography>
              <TextField
                fullWidth
                name="customerAccount"
                value={invoiceData.customerAccount}
                onChange={handleInvoiceData}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>P.O. Number/رقم طلب الشراء</Typography>
              <TextField
                fullWidth
                name="pONumber"
                value={invoiceData.pONumber}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Store/محل</Typography>
              <TextField
                fullWidth
                name="store"
                value={invoiceData.store}
                onChange={handleInvoiceData}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Customer Name/اسم الزبون</Typography>
              <TextField
                fullWidth
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Customer Address/عنوان العميل</Typography>
              <TextField
                fullWidth
                name="customerAddress"
                value={invoiceData.customerAddress}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                Customer Contact Person/شخص الاتصال بالعملاء
              </Typography>
              <TextField
                fullWidth
                name="customerContactPerson"
                value={invoiceData.customerContactPerson}
                onChange={handleInvoiceData}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Notes/ملحوظات</Typography>
              <TextField
                fullWidth
                name="notes"
                value={invoiceData.notes}
                onChange={handleInvoiceData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Remarks/ملاحظات</Typography>
              <TextField
                fullWidth
                name="remarks"
                value={invoiceData.remarks}
                onChange={handleInvoiceData}
              />
            </Grid>
            {/* here */}
            <Box component="fieldset" md={12} sm={12} lg={12} width={1100} padding={1} marginLeft={2}>
              <>
                <legend>
                  <h4>Item Details / تفاصيل العنصر</h4>
                </legend>
                  <Grid item={true} sx={{paddingBottom:3}}>
                    <Box textAlign="left">
                      <Button variant="contained" onClick={addMorehandler}>
                        Add Item / اضافة عنصر
                      </Button>
                    </Box>
                  </Grid>
                <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "left",
                      fontWeight: "bold",
                      paddingLeft: 1.5,
                      fontSize: 13,
                    }}
                  >
                    Quantity / كمية
                  </Typography>

                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: 13,
                      paddingRight: 5,
                      display: "flex",
                      justifyContent: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Item Code / رمز الصنف
                  </Typography>
                  <Typography
                    sx={{
                      flex: 3,
                      display: "flex",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Description / وصف
                  </Typography>
                  <Typography
                    sx={{
                      flex: 1.2,
                      display: "flex",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Price Each / السعر كل
                  </Typography>
                  <Typography
                    sx={{
                      flex: 1,
                      paddingLeft: 2,
                      display: "flex",
                      fontSize: 13,
                      justifyContent: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Amount / قيمة
                  </Typography>
                  <Typography
                    sx={{
                      flex: 0.8,
                      display: "flex",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Actions / أجراءات
                  </Typography>
                </Grid>

                {itemDetails.map((item, index) => (
                  <Grid
                    container
                    item
                    xs={12}
                    md={12}
                    sx={{ display: "flex" }}
                    columnGap={1}
                    marginBottom={1}
                    key={index}
                  >
                    <TextField
                      sx={{ flex: 0.8 }}
                      type="number"
                      name={`itemQuantity${index}`}
                      value={item.itemQuantity}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={(e) => handleInvoiceItemData(e, index)}
                    />
                    <TextField
                      sx={{ flex: 1.2 }}
                      name={`itemCode${index}`}
                      value={item.itemCode}
                      onChange={(e) => handleInvoiceItemData(e, index)}
                    />
                    <TextField
                      sx={{ flex: 3 }}
                      name={`itemDescription${index}`}
                      value={item.itemDescription}
                      onChange={(e) => handleInvoiceItemData(e, index)}
                    />
                    <TextField
                      sx={{ flex: 1 }}
                      type="number"
                      inputProps={{ style: { textAlign: "right" } }}
                      name={`itemPriceEach${index}`}
                      value={item.itemPriceEach}
                      onChange={(e) => handleInvoiceItemData(e, index)}
                    />
                    <TextField
                      sx={{ flex: 1 }}
                      type="number"
                      name={`amount${index}`}
                      value={item.amount}
                      inputProps={{ style: { textAlign: "right" } }}
                      onChange={(e) => handleInvoiceItemData(e, index)}
                    />
                    <Grid item={true} sx={{ flex: 0.8, paddingTop: 1 }}>
                      <Box textAlign="center">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={deleteHandler}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </>
            </Box>

            <Grid item xs={12}>
              {/*Use this secret key for communication between your site and reCAPTCHA 
              6LfcbDEoAAAAANx5AbLezJOr4X5X2XDhLg4AtBK1
              */}
              <ReCAPTCHA
                sitekey="6LfcbDEoAAAAALulxLbHnU-Xa27WcHlJV_sJPlxf"
                onChange={recaptchahandler}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit / يُقدِّم
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default InvoiceForm;
