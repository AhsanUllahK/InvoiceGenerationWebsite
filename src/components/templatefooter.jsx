import React from "react";
import { Grid,Typography } from "@mui/material";

const TemplateFooter = () => {
  return (
    <Grid
      item={true}
      container
      sx={{
        marginTop:10,
        paddingTop: 1,
        width: 1100,
        marginLeft:2,
        marginRight:2,
        marginBottom: 1, 
        border: "2px solid",
        paddingBottom: 1,
      }}
    >
      <Typography
        sx={{
          paddingLeft: 10,
          paddingRight: 10,
          textAlign:"center"
        }}
      >
        Should you have any queries concerning this Invoice please contact Mr.
        Abubakar Munawar +966 59 729 7575
      </Typography>
      <Typography
        sx={{
          paddingLeft: 25,
          paddingRight: 28,
        }}
      >
        This is computer generated document, and dose not required any
        signature.
      </Typography>
    </Grid>
  );
};

export default TemplateFooter;
