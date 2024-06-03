import { useRef, useMemo, useState, useImperativeHandle } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Rating, { RatingProps } from '@mui/material/Rating';
import {
    DataGrid,
    GridColDef,
    GridFilterItem,
    GridToolbarExport,
    GridFilterOperator,
    GridActionsCellItem,
    GridToolbarContainer,
    GridRowSelectionModel,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridFilterInputValueProps,
    GridColumnVisibilityModel,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { fullDateTime } from 'src/utils/format-time';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import EmptyContent from 'src/components/empty-content';

import { AirlineItemData } from '../../airline/airline-item';

// ----------------------------------------------------------------------

const baseColumns: GridColDef[] = [
    {
        field: 'airline',
        headerName: 'Airline',
        flex: 1,
        minWidth: 160,
        hideable: false,
        renderCell: (params) => (
            <Stack spacing={2} direction="row" alignItems="center" sx={{ minWidth: 0 }}>
                <Image src="https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/BP.svg" alt={params.row.airline.name} sx={{ width: 32, height: 32 }} />
                <Typography component="span" variant="body2" noWrap>
                    {params.row.name}
                </Typography>
            </Stack>
        ),
    },
    {
        field: 'booking',
        headerName: 'Booking REF',
        minWidth: 120,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <Typography variant="body2" noWrap>
                {params.row.booking}
            </Typography>
        ),
    },
    {
        type: 'singleSelect',
        field: 'status',
        headerName: 'Status',
        align: 'center',
        headerAlign: 'center',
        width: 100,
        editable: true,
        sortable: false,
        filterable: false,
        valueOptions: ['online', 'alway', 'busy'],
        renderCell: (params) => (
            <Label
                variant="soft"
                color={
                    (params.row.status === 'busy' && 'error') ||
                    (params.row.status === 'alway' && 'warning') ||
                    'success'
                }
                sx={{ mx: 'auto' }}
            >
                {params.row.status}
            </Label>
        ),
    },
    {
        field: '_id',
        headerName: 'ID',
        minWidth: 220,
        renderCell: (params) => (
            <Tooltip title={params.row.id} placement="top">
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    '&:hover': {
                        '& p': {
                            color: 'primary.main',
                        },
                        '& svg': {
                            opacity: 0.72,
                        }
                    },
                }}>
                    <Typography variant="body2" sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: 160,
                        color: 'text.secondary',
                    }} noWrap>
                        {`#${params.row.id}`}
                    </Typography>
                    <Iconify icon="ph:copy" sx={{
                        color: 'primary.main',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                    }} />
                </Box>
            </Tooltip>
        ),
    },
    {
        field: 'name',
        headerName: 'Family name',
        minWidth: 160,
        renderCell: (params) => (
            <Typography variant="body2" noWrap>
                {params.row.name}
            </Typography>
        ),
    },
    {
        type: 'dateTime',
        field: 'departure_date',
        headerName: 'Next Departure',
        align: 'right',
        headerAlign: 'right',
        width: 132,
        renderCell: (params) => (
            <Box component="span">{fullDateTime(params.row.departureDate)}</Box>
        ),
    },
    {
        field: 'amount',
        headerName: 'Amount',
        minWidth: 100,
        renderCell: (params) => (
            <Typography variant="body2" noWrap>
                EUR {params.row.amount}
            </Typography>
        ),
    },
    {
        type: 'dateTime',
        field: 'created_at',
        headerName: 'Creation Date',
        align: 'right',
        headerAlign: 'right',
        width: 132,
        renderCell: (params) => (
            <Box component="span">{fullDateTime(params.row.createdAt)}</Box>
        ),
    },
    {
        type: 'actions',
        field: 'actions',
        headerName: 'Actions',
        align: 'right',
        headerAlign: 'right',
        width: 80,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        getActions: (params) => [
            <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:eye-bold" />}
                label="View"
                onClick={() => console.info('VIEW', params.row.id)}
            />,
            <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:pen-bold" />}
                label="Edit"
                onClick={() => console.info('EDIT', params.row.id)}
            />,
            <GridActionsCellItem
                showInMenu
                icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                label="Delete"
                onClick={() => console.info('DELETE', params.row.id)}
                sx={{ color: 'error.main' }}
            />,
        ],
    },
];

// ----------------------------------------------------------------------

type Props = {
    data: {
        id: string;
        airline: AirlineItemData;
        booking: string;
        name: string;
        status: string;
        departureDate: Date;
        amount: number;
        createdAt: Date;
    }[];
};

const HIDE_COLUMNS = {
    id: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['id', 'actions'];

export default function TravelOrderDataGrid({ data: rows }: Props) {
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    const [columnVisibilityModel, setColumnVisibilityModel] =
        useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

    const columns = useMemo(
        () =>
            baseColumns.map((col) =>
                col.field === 'rating'
                    ? {
                        ...col,
                        filterOperators: ratingOnlyOperators,
                    }
                    : col
            ),
        []
    );

    const getTogglableColumns = () =>
        columns
            .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
            .map((column) => column.field);

    const selected = rows.filter((row) => selectedRows.includes(row.id)).map((_row) => _row.id);

    console.info('SELECTED ROWS', selected);

    return (
        <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={rows}
            columns={columns}
            onRowSelectionModelChange={(newSelectionModel) => {
                setSelectedRows(newSelectionModel);
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
                toolbar: CustomToolbar,
                noRowsOverlay: () => <EmptyContent title="No Data" />,
                noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
                columnsPanel: {
                    getTogglableColumns,
                },
            }}
        />
    );
}

// ----------------------------------------------------------------------

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
            <Box sx={{ flexGrow: 1 }} />
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

// ----------------------------------------------------------------------

function RatingInputValue({ item, applyValue, focusElementRef }: GridFilterInputValueProps) {
    const ratingRef: React.Ref<any> = useRef(null);

    useImperativeHandle(focusElementRef, () => ({
        focus: () => {
            ratingRef.current.querySelector(`input[value="${Number(item.value) || ''}"]`).focus();
        },
    }));

    const handleFilterChange: RatingProps['onChange'] = (event, newValue) => {
        applyValue({ ...item, value: newValue });
    };

    return (
        <Rating
            ref={ratingRef}
            precision={0.5}
            value={Number(item.value)}
            onChange={handleFilterChange}
            name="custom-rating-filter-operator"
            sx={{ ml: 2 }}
        />
    );
}

const ratingOnlyOperators: GridFilterOperator[] = [
    {
        label: 'Above',
        value: 'above',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.field || !filterItem.value || !filterItem.operator) {
                return null;
            }

            return (params): boolean => Number(params.value) >= Number(filterItem.value);
        },
        InputComponent: RatingInputValue,
        InputComponentProps: { type: 'number' },
        getValueAsString: (value: number) => `${value} Stars`,
    },
];
