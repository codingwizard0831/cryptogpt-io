import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type EmptyItemProps = StackProps & {
  title?: string;
  imgUrl?: string;
  filled?: boolean;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyItem({
  title,
  imgUrl,
  action,
  description,
  sx,
  ...other
}: EmptyItemProps) {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3,
        backgroundColor: theme => alpha(theme.palette.divider, 0.1),
        backdropFilter: 'blur(10px)',
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        alt="empty content"
        src={imgUrl || '/assets/icons/empty/ic_content.svg'}
        sx={{ width: 1, maxWidth: 160 }}
      />

      {title && (
        <Typography
          variant="h6"
          component="span"
          sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography variant="caption" sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}>
          {description}
        </Typography>
      )}

      {action && action}
    </Box>
  );
}
