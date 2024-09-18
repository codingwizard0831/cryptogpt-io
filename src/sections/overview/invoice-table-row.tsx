import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import LoadingButton from '@mui/lab/LoadingButton';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  index: number;
  onApprove: (id: any) => void;
  loading: boolean;
};

export default function InvoiceTableRow({
  row,
  index,
  onApprove,
  loading = false
}: Props) {
  const { id, address, amount, created_at, status } = row;

  const handleApprove = () => {
    onApprove(id);
  };

  return (
    <TableRow hover>
      <TableCell>
        <ListItemText
          primary={index + 1}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
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
      <TableCell>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          sx={{ bgcolor: (theme) => theme.palette.primary.main, color: 'text.primary' }}
          onClick={handleApprove}
          disabled={status !== "admin_waiting"}
        >
          Approve
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
}
