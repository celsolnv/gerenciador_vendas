import { DialogContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';

export default function LoadingComponent({isOpen}) {
  return (
        <Dialog
            open={isOpen}
        >
            <DialogContent >
                <CircularProgress />
            </DialogContent>

        </Dialog>
  );
}