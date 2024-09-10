import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  index: number;
};

export default function InvoiceTableRow({
  row,
  index
}: Props) {
  const { address, amount, created_at, status } = row;

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" noWrap sx={{ textAlign: 'center' }}>
              {index+1}
            </Typography>
          }
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={`${amount} CRGPT`}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={address}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
        />
      </TableCell>

      <TableCell>{fDate(created_at)}</TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (status === 'paid' && 'success') ||
            (status === "admin_waiting" && 'warning') ||
            (status === 'overdue' && 'error') ||
            'default'
          }
        >
          {status === "admin_waiting" ? "Pending" : status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
