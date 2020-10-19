import React, { Component, useState, useEffect } from 'react';
import Firebase from 'firebase'
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";


class ExcelReader extends Component {
  constructor(props) {
    super(props);
    // this.ref = Firebase.firestore().collection("places");
    // this.unsubscribe = null;
    this.state = {


    }
    
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  handleFile() {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      ///// Parse data 
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      ///// Get first worksheet 
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      //// Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws);
      //// Update state 
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        console.log(JSON.stringify(this.state.data, null, 2));
        
      // const myDataStr = data.toString();
      // const test = Object.values( data );
      const myDataStr = JSON.stringify(data);  
      
      console.log(">>>>>>>>>", myDataStr);
      const db = Firebase.firestore();
      db.collection("places").doc().set({
        
        // address: data[0].Address,
        // business_status: data[0].Business_status,
        // category: data[0].CategoryNo,
        // cn_descr: data[0].Cn_descr,
        // cn_name: data[0].Cn_name,
        // country_code: data[0].Country_code,
        // created_at: data[0].Created_at,
        // creator: data[0].Creator,
        // currency: data[0].Currency,
        // en_descr: data[0].En_descr,
        // en_name: data[0].En_name,
        // formatted_phone_number: data[0].Formatted_phone_number,
        // fr_descr: data[0].Fr_descr,
        // fr_name: data[0].fr_name,
        // geo: data[0].Geo_location,
        // guide_id: data[0].Guide_id,
        // is_featured: data[0].Is_featured,
        // jp_descr: data[0].Jp_descr,
        // jp_Name: data[0].Jp_name,
        // kr_descr: data[0].Kr_descr,
        // kr_name: data[0].Kr_name,
        // locality: data[0].Locality,
        // modifier: data[0].Modifier,
        // opening_hours: data[0].Opening_hours,
        // ph_descr: data[0].Ph_descr,
        // ph_name: data[0].Ph_name,
        // // photos: data[0].Photos,
        // price1: data[0].Price1,
        // price2: data[0].Price2,
        // rating: data[0].Rating,
        // status: data[0].Status,
        // tc_descr: data[0].Tc_descr,
        // tc_name: data[0].Tc_name,
        // // updated_at: data[0].Updated_at,
        // use_yn: data[0].Use_yn,
        // user_ratings_total: data[0].User_ratings_total,
        // website: data[0].Website

        // category: data[0].CategoryNo,
        // en_name: data[0].NameEn,
        // kr_name: data[0].NameKr,
        // cn_name: data[0].NameCn,
        // tc_name: data[0].NameTc,
        // fr_name: data[0].NameFr,
        // jp_name: data[0].NameJp,
        // ph_name: data[0].NamePh,

        // en_descr: data[0].DesciptionEn,
        // kr_descr: data[0].DescriptionKr,
        // cn_descr: data[0].DescriptionCn,
        // tc_descr: data[0].DescriptionTc,
        // fr_descr: data[0].DescriptionFr,
        // jp_descr: data[0].DescriptionJp,
        // ph_descr: data[0].DescriptionPh,

        // address: data[0].Address,
        // latitude: data[0].Latitude,
        // longitude: data[0].Longitude,
        // CountryCode: data[0].CountryCode,
        // PhoneNo: data[0].PhoneNo,
        // Locality: data[0].Locality


        category: data[0].CategoryNo,
        en_name: data[0].NameEn,
        kr_name: data[0].NameKr,
        cn_name: data[0].NameCn,
        tc_name: data[0].NameTc,
        fr_name: data[0].NameFr,
        jp_name: data[0].NameJp,
        ph_name: data[0].NamePh,
        en_descr: data[0].DescriptionEn,
        kr_descr: data[0].DescriptionKr,
        cn_descr: data[0].DescriptionCn,
        tc_descr: data[0].DescriptionTc,
        fr_descr: data[0].DescriptionFr,
        jp_descr: data[0].DescriptionJp,
        ph_descr: data[0].DescriptionPh,
        address: data[0].Address,
        latitude: data[0].Latitude,
        longitude: data[0].Longitude,
        country_code: data[0].CountryCode,
        PhoneNo: data[0].PhoneNo,
        Locality: data[0].Locality
        


      })
      .then(function() {
            alert("successfully uploaded!");
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            alert(error);
            console.error("Error writing document: ", error);
        });
        console.log("000000000000000",  myDataStr);
      });
      
      // console.log(">>>>>>>>>>>>>>>>>", data)
    };
  
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }
 
  render() {
    return (
      <div>
        {/* <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={this.handleFile}>
              Image
            </Button>
            <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
          </Grid> */}


        <label htmlFor="file"></label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <br />
  
        {/* <input type='submit' 
          value="Save"
          onClick={this.handleFile} /> */}

            <Button variant="contained"  style={{position:"absolute", top:163, width:100, height: 37}} color="primary" onClick={this.handleFile}>
              Save
            </Button>
      </div>
        
    )
  }
}
 
export default ExcelReader;