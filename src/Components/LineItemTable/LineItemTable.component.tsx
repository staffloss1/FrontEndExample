import { TableContainer, Paper, TableHead, TableCell, TableBody, Table, TableRow, Divider, TablePagination, TableFooter } from '@mui/material';
import React from "react";
import LineItemInput from '../LineItemInput/LineItemInput.component';
import ILineItem from '../../DTOs/LineItem.dto';
import LineItem from '../LineItem/LineItem.component';

interface ILineItemTableState {
    lineItems: ILineItem[],
    laborTotal: number,
    materialTotal: number,
    inclusiveTotal: number,
    currentPage: number
}

export default class LineItemTable extends React.Component<{},ILineItemTableState> {
    
    state = {
        lineItems: [] as ILineItem[],
        laborTotal: 0,
        materialTotal: 0,
        inclusiveTotal: 0,
        currentPage: 0,
    };
    
    handleAddLineItem = (lineItem: ILineItem) => {
        this.setState((prevState) => ({
          lineItems: [...prevState.lineItems, lineItem]
        }));
    };

    getLaborCostTotal = (): number => {
        let res = 0;
        this.state.lineItems
            .forEach(element => {
            res = res + element.LaborCost
        });
        return res;
    }

    getMaterialCostTotal = (): number => {
        let res = 0;
        this.state.lineItems
            .forEach(element => {
            res = res + element.MaterialCost
        });
        return res;
    }

    getInclusiveCostTotal = (): number => {
        let res = 0;
        this.state.lineItems
            .forEach(element => {
            res = res + element.InclusiveCost
        });
        return res;
    }

    getTotalCost = (): number =>{
        return this.getInclusiveCostTotal() + this.getLaborCostTotal() + this.getMaterialCostTotal();
    }


    ShowTable = () => {
        return (
            <TableContainer component={Paper} style={{width: '80%', height: '50vh'}}>
            <Table
            aria-label="Line Items">
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Item Title</TableCell>
                  <TableCell align='left'>Labor Costs</TableCell>
                  <TableCell align='left'>Material Costs</TableCell>
                  <TableCell align='left'>Inclusive Costs</TableCell>
                  <TableCell align='left'>Units</TableCell>
                  <TableCell align='left'>Total Cost</TableCell>
                  <TableCell align='left'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.lineItems.map((item, index)=>(
                    <LineItem item={item} index={index} key={index}></LineItem>
                ))}
                    <Divider/>
                </TableBody>
                <TableHead>
                    <TableRow>
                    <TableCell>
                    </TableCell>
                    <TableCell align='left'>Labor Cost Total</TableCell>
                    <TableCell align='left'>Material Cost Total</TableCell>
                    <TableCell align='left'>Inclusive Cost Total</TableCell>
                    <TableCell align='left'>Total Costs</TableCell>
                    <TableCell align='left'></TableCell>
                    <TableCell align='left'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell>
                    </TableCell>
                    <TableCell align='left'>${this.getLaborCostTotal().toFixed(2)}</TableCell>
                    <TableCell align='left'>${this.getMaterialCostTotal().toFixed(2)}</TableCell>
                    <TableCell align='left'>${this.getInclusiveCostTotal().toFixed(2)}</TableCell>
                    <TableCell align='left'></TableCell>
                    <TableCell align='left'>${this.getTotalCost().toFixed(2)}</TableCell>
                    <TableCell align='left'></TableCell>
                    </TableRow>
              </TableBody>
              <LineItemInput AddItemCallback={this.handleAddLineItem}></LineItemInput>
            </Table>
            <TableFooter>
                {/* This pagination currently does nothing, but would be nice to have */}
                <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={this.state.lineItems.length}
                          rowsPerPage={20}
                          page={this.state.currentPage}
                          onPageChange={()=>{}}
                        ></TablePagination>
            </TableFooter>
          </TableContainer>
          
        )
    }
    
    render() {
      return (this.ShowTable());
    }
  }