import React from "react";
import LineItemTable from "../LineItemTable/LineItemTable.component";
import { Button } from "@mui/material";

interface ITableScreenState{
    showTable:boolean;
}

export default class TableScreen extends React.Component<{},ITableScreenState> {

    state={
        showTable:false,
    }

    toggleTable =() =>{
        this.setState({showTable:!this.state.showTable})
    }

    renderElements =()=>{
        if(this.state.showTable){
            return (<div>
                            <LineItemTable/>
                    <Button variant="contained" onClick={this.toggleTable}>Save</Button>
            </div>)
        }else{
            return (<div>
                <Button variant="contained" onClick={this.toggleTable}>Create Estimate</Button>
            </div>)
        }
    }

    render() {
        return this.renderElements();
    }
  }