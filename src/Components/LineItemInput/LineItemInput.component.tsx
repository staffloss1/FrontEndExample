import { Button, IconButton, InputAdornment, TableCell, TableRow, TextField } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import ILineItem from "../../DTOs/LineItem.dto";

interface ILineItemInputProps {
    AddItemCallback: (input: ILineItem) => void,
}

interface ILineItemInputState {
    Title: string,
    LaborCost: number,
    MaterialCost: number,
    InclusiveCost: number,
    Units:number,
    TotalCost: number,
    touched: boolean,
}

export default class LineItemInput extends React.Component<ILineItemInputProps, ILineItemInputState> {

    state = {
        Title: '',
        LaborCost: 0,
        MaterialCost: 0,
        InclusiveCost: 0,
        TotalCost: 0,
        Units: 1,
        touched:false,
      };

      titleError=(): boolean =>{
        return this.state.touched && !this.inputIsValid();
      }


    isValidNumberInput = (inputValue: string): boolean => {
        const regex = /^(\d*\.)?\d+$/;
        return regex.test(inputValue);
    }

    formatNumberWithTwoDecimals = (value: string) => {
        let floatValue = parseFloat(value);
        if (floatValue % 1 === 0) {
          return Number(floatValue.toFixed(2));
        }
        let decimalPlaces = (floatValue.toString().split('.')[1] || []).length;
        while (decimalPlaces > 2) {
          floatValue *= 10;
          decimalPlaces--;
        }
        return Number(floatValue.toFixed(2));
    }


      handleAddItem = () => {
        const { AddItemCallback } = this.props;
        const { Title, LaborCost, MaterialCost, InclusiveCost, Units, TotalCost } = this.state;
    
        const newItem: ILineItem = {
          Title,
          LaborCost,
          MaterialCost,
          InclusiveCost,
          Units,
          TotalCost
        };
    
        AddItemCallback(newItem);
    
        this.setState({
          Title: '',
          LaborCost: 0,
          MaterialCost: 0,
          InclusiveCost: 0,
          Units: 1,
          touched:false,
          TotalCost:0
        });
    };

    handleLaborCostChange = (event: any) =>{
        if(this.isValidNumberInput(event.target.value)){
            let value = this.formatNumberWithTwoDecimals(event.target.value);
            this.setState({LaborCost:value},()=>{
                this.updateLineItemTotal();
            });
        }
    }

    
    handleMaterialCostChange = (event: any) =>{
        if(this.isValidNumberInput(event.target.value)){
            let value = this.formatNumberWithTwoDecimals(event.target.value);
            this.setState({MaterialCost:value},()=>{
                this.updateLineItemTotal();
            });
        }
    }

    
    handleInclusiveCostChange = (event: any) =>{
        if(this.isValidNumberInput(event.target.value)){
            let value = this.formatNumberWithTwoDecimals(event.target.value);
            this.setState({InclusiveCost:value},()=>{
                this.updateLineItemTotal();
            })
        }
    }

    handleUnitsChange = (event: any) => {
        if(this.isValidNumberInput(event.target.value)){
            let value = Number(event.target.value);
            this.setState({Units:value},()=>{
                this.updateLineItemTotal();
            });
        }
    }

    updateLineItemTotal = () =>{
        const units = this.state.Units;
        let newTotalCost = (this.state.LaborCost * units) + (this.state.MaterialCost * units) + (this.state.InclusiveCost * units);
        this.setState({TotalCost:newTotalCost})
    }

    inputIsValid = () =>{
        return this.state.Title.trim().length > 0;
    }

    render(): React.ReactNode {
        return (<TableRow aria-label="Input Row">
            <TableCell>        
                <TextField
                aria-label="Title Input"
                onChange={(e)=>{this.setState({Title:e.target.value})}}
                value={this.state.Title}
                label="Title"
                helperText={this.titleError()?"Line Item must have a Title.":""}
                onBlur={()=>this.setState({touched:true})}
                error={this.titleError()}
                />
            </TableCell>
            
            <TableCell>        
            <TextField
                aria-label="Labor Cost Input"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                onChange={this.handleLaborCostChange}
                label="Labor Costs"
                placeholder="0.00"
                value={this.state.LaborCost != 0? this.state.LaborCost : ""}
                type="number"
                />
            </TableCell>
            
            <TableCell>        
                <TextField
                aria-label="Material Cost Input"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                onChange={this.handleMaterialCostChange}
                label="Material Costs"
                
                value={this.state.MaterialCost != 0? this.state.MaterialCost : ""}
                placeholder="0.00"
                type="number"
                />
            </TableCell>
            <TableCell>        
                <TextField
                aria-label="Inclusive Cost Input"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                onChange={this.handleInclusiveCostChange}
                
                value={this.state.InclusiveCost != 0? this.state.InclusiveCost : ""}
                label="Inclusive Costs"
                placeholder="0.00"
                type="number"
                />
            </TableCell>
            <TableCell>        
                <TextField
                aria-label="Units"
                onChange={this.handleUnitsChange}
                label="Units"
                value={this.state.Units}
                type="number"
                />
            </TableCell>
            <TableCell>
            <TextField
                aria-label="Total Costs"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                value={this.state.TotalCost.toFixed(2)}
                label="Total Costs"
                placeholder="0.00"
                type="number"
                disabled={true}
                />
            </TableCell>
            <TableCell>        
                <Button
                variant="contained"
                aria-label="Submit Line Item Button"
                disabled={!this.inputIsValid()}
                onClick={this.handleAddItem}>
                    <AddIcon/>
                </Button>
            </TableCell>
        </TableRow>)
    }

}