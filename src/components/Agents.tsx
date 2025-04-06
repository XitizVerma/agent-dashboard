import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import {useState} from "react";
import {Button} from "@mui/material";
import {AddAgents} from "./AddAgents";
import {Data} from "./Data";

interface ColumnData {
    dataKey: keyof Data;
    label: string;
    width?: number;
}

const columns: ColumnData[] = [
    {
        width: 100,
        label: 'Name',
        dataKey: 'name',
    },
    {
        width: 100,
        label: 'Email',
        dataKey: 'email',
    },
    {
        width: 100,
        label: 'Phone Number',
        dataKey: 'phone',
    },
    {
        width: 100,
        label: 'Password',
        dataKey: 'password',
    }
];

const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    )),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    style={{
                        width: column.width,
                        textAlign: 'center'
                    }}
                    sx={{
                        backgroundColor: 'lightblue',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index: number, row: Data) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export const Agents = () => {
    const [data,setData] = useState<Data[]>([]);

    function addData(agent: Data) {
        data.push(agent);
        setData(data);
        setAddAgentsExpanded(false);
    }
    const [addAgentsExpanded, setAddAgentsExpanded] = React.useState(false);

    return (
        <div>

            <Button
                type="submit"
                variant="contained"

                size="large"
                onClick={() => {setAddAgentsExpanded(!addAgentsExpanded)}}
                sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    marginLeft: '80%',
                    textTransform: 'none',
                    fontSize: '1rem'
                }}
            >
                Add Agents 🙎🏻‍♂️
            </Button>

            <Paper style={{ height: 400, width: '70%', marginLeft:'auto', marginRight:'auto' }}>
                <TableVirtuoso
                    data={data}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
            {
             addAgentsExpanded && (
                 <AddAgents
                     index={data.length}
                     onSubmit={addData}
                     onDiscard={() => setAddAgentsExpanded(false)}
                 />
                )
            }
        </div>
    );
}