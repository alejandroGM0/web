import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function UpdateDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #00ff88',
          borderRadius: 2,
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle sx={{ color: '#00ff88', borderBottom: '1px solid rgba(0, 255, 136, 0.2)' }}>
        🚀 Portfolio Update
      </DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <Typography sx={{ color: '#fff', marginBottom: 2 }}>
          Welcome to my updated portfolio! This site has been redesigned with:
        </Typography>
        <Box component="ul" sx={{ color: '#ccc', paddingLeft: 2 }}>
          <li>New neural network background animation</li>
          <li>Improved responsive design</li>
          <li>Better project showcase</li>
          <li>Enhanced performance</li>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#00ff88',
            border: '1px solid #00ff88',
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 136, 0.1)',
            },
          }}
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateDialog;
