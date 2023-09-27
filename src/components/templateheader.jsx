import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import QRCode from "react-qr-code";

const TemplateHeader = ({ invoiceData }) => {

  return (

    <Grid container>
      {/* PART 1 */}
      <Grid item={true} container>
        <Grid
          item={true}
          xs={3}
          sx={{
            paddingLeft: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 2,
          }}
        >
          <Typography> CR# {invoiceData.CRno}</Typography>
          <Typography>VAT# {invoiceData.VATno}</Typography>
        </Grid>

        <Grid item={true} xs={6} sx={{ justifyContent: "center" }}>
          <Typography variant="h4" gutterBottom align="center">
            {invoiceData.companyNameEn}
          </Typography>
          <Typography style={{ fontSize: 15 }} gutterBottom align="center">
            Limited Liability Company
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            {invoiceData.companyNameAr}
          </Typography>
          <Typography variant="h4" align="center">
            VAT Invoice
          </Typography>
        </Grid>
        <Grid
          item={true}
          xs={3}
          sx={{
            display: "flex",
            align: "center",
            justifyContent: "center",
          }}
        >
          <QRCode
            size={100}
            style={{ height: "100", maxWidth: "100%", width: "100%" }}
            value={"invoice data"}
            viewBox={`0 0 100 100`}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TemplateHeader;
