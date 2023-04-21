import React from "react";
import ILineItem from "../../DTOs/LineItem.dto";
import { Button, TableCell, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'


export interface ILineItemProps{
    item:ILineItem,
    index:number
}

export default class LineItem extends React.Component<ILineItemProps> {
    
    render(): React.ReactNode {       
        return(
            <TableRow style={{backgroundColor:this.props.index % 2 == 0 ? "white":"gray",}}>
                <TableCell >{this.props.item.Title}</TableCell>
                <TableCell >${this.props.item.LaborCost}</TableCell>
                <TableCell >${this.props.item.MaterialCost}</TableCell>
                <TableCell >${this.props.item.InclusiveCost}</TableCell>
                <TableCell >{this.props.item.Units}</TableCell>
                <TableCell >${this.props.item.TotalCost.toFixed(2)} </TableCell>
                <TableCell style={{display:"flex"}}>
                    <Button>
                        <EditIcon></EditIcon>
                    </Button>    
                    <Button>
                        <DeleteIcon></DeleteIcon>
                    </Button>    
                </TableCell>
        </TableRow>
    )
}
}