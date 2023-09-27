import {
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import TemplateFooter from "./templatefooter";
import TemplateHeader from "./templateheader";
import TemplateNotesAndRemarks from "./templatenotesandremarks";
import { DataGrid } from "@mui/x-data-grid";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InvoiceTemplate = ({ invoiceData, itemDetails }) => {
  const reportTemplateRef = useRef(null);

  const dummy_data = [
    {
      companyName: "Riyadh Internaitonal Food Company",
      additionalNumber: 2706,
      streetName: "Prince Turki bin Abdulaziz(I)",
      addtionalStreet: 100,
      buildingNumber: 6711,
      postalCode: 13512,
      city: "Riyadh",
      provinceState: "Riyadh",
      district: "Hittin",
      internationalCode: "sa",
    },
  ];
  const customer_data = dummy_data[0];

  const columns = [
    {
      field: "itemQuantity",
      headerName: "Quantity / كمية",
      headerAlign: "center",
      align: "right",
      flex: 0.65,
      // width:130
    },
    {
      field: "itemCode",
      headerName: "Item Code / رمز الصنف",
      headerAlign: "center",
      align: "left",
      flex: 1,
      // width:170
    },
    {
      field: "itemDescription",
      headerName: "Item Description / وصف السلعة",
      align: "left",
      headerAlign: "center",
      flex: 2,
      // width:460
    },
    {
      field: "itemPriceEach",
      headerName: "Price Each / السعر كل",
      headerAlign: "center",
      align: "right",
      flex: 0.9,
      renderCell: (params) => (
        <div style={{ textAlign: "right" }}>
          {new Intl.NumberFormat("en-US", {style:"currency", currency:"SAR"}).format(params.value).replace("SAR","")}
        </div>
      ),
      // width:150
    },
    {
      field: "amount",
      headerName: "Amount / قيمة",
      headerAlign: "center",
      align: "right",
      // width:150
      flex: 1,
      renderCell: (params) => (
          <div style={{ textAlign: "right" }}>
            {new Intl.NumberFormat("en-US", { style:"currency", currency:"SAR"}).format(params.value).replace("SAR","")+"T"}
          </div>
        )
    },
  ];

  const printInvioce = useReactToPrint({
    content: () => reportTemplateRef.current,
    documentTitle: "InvoiceTemplate",
  });

  return (
    <>
      <Box sx={{ paddingTop: 10, paddingRight: 10, textAlign: "center" }}>
        <Button
          className="button"
          color="primary"
          variant="contained"
          onClick={printInvioce}
        >
          Print / مطبعة
        </Button>
      </Box>
      <Box>
        <Grid
          container
          sx={{ padding: 10, width: 1180 }}
          ref={reportTemplateRef}
        >
          <Grid item={true} container>
            {invoiceData && (
              <>
                <TemplateHeader invoiceData={invoiceData} />

                <Grid container item={true} sx={{ border: "2px solid" }}>
                  <Grid item={true} container sx={{ display: "flex" }}>
                    {/* Dates Part */}
                    <Grid item={true} sx={{ paddingLeft: 5, flex: 2 }}>
                      <Grid item={true} container>
                        <Grid
                          item={true}
                          sx={{
                            display: "block",
                            paddingRight: "2px",
                          }}
                        >
                          <Typography
                            sx={{
                              paddingTop: 4,
                              fontWeight: "bold",
                              paddingRight: 5,
                              fontSize: "15px",
                            }}
                          >
                            Invoice #
                          </Typography>

                          <Typography
                            sx={{
                              paddingTop: 5.8,
                              paddingRight: 1,
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            Invoice Date
                          </Typography>

                          <Typography
                            sx={{
                              paddingTop: 5.8,
                              paddingRight: 1,
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            Due Date
                          </Typography>
                        </Grid>

                        <Grid
                          item={true}
                          sx={{
                            paddingLeft: "40px",
                            paddingTop: "12px",
                            // paddingRight: "10px",
                          }}
                          xs={2.2}
                        >
                          <TextField
                            value={invoiceData.invoiceNumber}
                            variant="outlined"
                            size="medium"
                            sx={{
                              width: 160,
                              paddingBottom: "8px",
                              paddingTop: "2px",
                            }}
                            inputProps={{
                              style: {
                                textAlign: "right",
                                paddingLeft: 2,
                              },
                            }}
                          />
                          <TextField
                            value={invoiceData.invoiceDate}
                            variant="outlined"
                            size="medium"
                            sx={{
                              width: 160,
                              paddingBottom: "8px",
                              paddingTop: "5px",
                            }}
                            inputProps={{
                              style: {
                                textAlign: "right",
                                paddingLeft: 2,
                              },
                            }}
                          />
                          <TextField
                            value={invoiceData.invoiceDueDate}
                            size="medium"
                            sx={{
                              width: 160,
                              paddingTop: "5px",
                            }}
                            inputProps={{
                              style: {
                                textAlign: "right",
                                paddingLeft: 2,
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item={true}
                      sx={{
                        paddingRight: 5,
                        height: 210,
                        flex: 0.8,
                        // width: 350,
                        border: "1px solid black",
                      }}
                    >
                      <Typography sx={{ paddingLeft: 2 }}>
                        Customer Name: {invoiceData.customerName}
                      </Typography>
                    </Grid>
                    <Grid container item={true} sx={{ height: 210, flex: 3 }}>
                      {Object.entries(customer_data).map(([key, value]) => (
                        <Grid
                          key={key}
                          item
                          container
                          sx={{
                            height: 20,
                            width: "100%",
                            border: "1px solid black",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: 12,
                              display: "flex",
                              justifyContent: "center",
                              flex: 2,
                              alignItems: "center",
                              paddingLeft: 1,
                            }}
                          >
                            {key}
                          </Typography>
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ mx: 1 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: 12,
                              display: "flex",
                              flex: 3,
                              justifyContent: "center",
                              alignItems: "center",
                              paddingRight: 1,
                            }}
                          >
                            {value}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  {/* Customer Details */}
                  <Grid
                    item={true}
                    container
                    sx={{
                      paddingRight: 2,
                      paddingLeft: 3,
                      paddingTop: 1,
                      display: "flex",
                      flexDirection: "row",
                      paddingBottom: 1,
                    }}
                  >
                    <Grid item={true} sx={{ display: "block" }} xs={2}>
                      <Typography
                        sx={{
                          paddingTop: 1,
                          paddingLeft: 1,
                          fontSize: "13px",
                          fontWeight: "bold",
                          paddingBottom: 0.5,
                        }}
                      >
                        NGT Quote #
                      </Typography>
                      <TextField
                        value={invoiceData.quote}
                        variant="outlined"
                        size="small"
                        sx={{ width: 150 }}
                      />
                    </Grid>

                    <Grid item={true} sx={{ display: "block" }} xs={2}>
                      <Typography
                        sx={{
                          paddingTop: 1,
                          paddingLeft: 1,
                          fontSize: "13px",
                          fontWeight: "bold",
                          paddingBottom: 0.5,
                        }}
                      >
                        Customer Account #
                      </Typography>
                      <TextField
                        value={invoiceData.customerAccount}
                        variant="outlined"
                        size="small"
                        sx={{ width: 150 }}
                        inputProps={{
                          style: {
                            textAlign: "right",
                            paddingLeft: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item={true} sx={{ display: "block" }} xs={2}>
                      <Typography
                        sx={{
                          paddingTop: 1,
                          paddingLeft: 1,
                          fontSize: "13px",
                          fontWeight: "bold",
                          paddingBottom: 0.5,
                        }}
                      >
                        Customer VAT #
                      </Typography>
                      <TextField
                        value={invoiceData.VATno}
                        variant="outlined"
                        size="small"
                        sx={{ width: 150 }}
                        inputProps={{
                          style: {
                            textAlign: "right",
                            paddingLeft: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item={true} sx={{ display: "block" }} xs={2}>
                      <Typography
                        sx={{
                          paddingTop: 1,
                          paddingLeft: 1,
                          fontWeight: "bold",
                          fontSize: "13px",
                          paddingBottom: 0.5,
                        }}
                      >
                        P.O Number
                      </Typography>
                      <TextField
                        value={invoiceData.pONumber}
                        variant="outlined"
                        size="small"
                        sx={{ width: 150 }}
                        inputProps={{
                          style: {
                            textAlign: "right",
                            paddingLeft: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item={true} sx={{ display: "block" }} xs={2}>
                      <Typography
                        sx={{
                          paddingTop: 1,
                          paddingLeft: 1,
                          fontWeight: "bold",
                          fontSize: "13px",
                          paddingBottom: 0.5,
                        }}
                      >
                        Store
                      </Typography>
                      <TextField
                        value={invoiceData.store}
                        variant="outlined"
                        size="small"
                        sx={{ width: 150 }}
                      />
                    </Grid>

                    <Grid item={true} sx={{ display: "block" }} xs={2}>
                      <Typography
                        sx={{
                          paddingTop: 1,
                          fontWeight: "bold",
                          paddingLeft: 1,
                          fontSize: "13px",
                          paddingBottom: 0.5,
                        }}
                      >
                        Customer Contact
                      </Typography>
                      <TextField
                        value={invoiceData.customerContactPerson}
                        variant="outlined"
                        size="small"
                        sx={{ width: 150 }}
                        inputProps={{
                          style: {
                            textAlign: "right",
                            paddingLeft: 2,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* itemlist part */}
                  <Grid
                    // item={true}
                    container
                    display={"block"}
                    sx={{ width: 1100 }}
                  >
                    <DataGrid
                      sx={{
                        // padding: 2,
                        lineHeight: 3,
                      }}
                      columns={columns}
                      rows={itemDetails}
                      getRowId={(row) => row.itemCode}
                      minHeight={"40px"}
                      hideFooter={true}
                      autoHeight
                      getRowHeight={() => "auto"}
                    />

                    <TemplateNotesAndRemarks
                      invoiceData={invoiceData}
                      itemDetails={itemDetails}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          {/*  footer  */}
          <TemplateFooter />
        </Grid>
      </Box>
    </>
  );
};

export default InvoiceTemplate;
