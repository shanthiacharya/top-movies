import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardMedia from '@material-ui/core/CardMedia';
import './MovieDialog.css'

export default class MovieDialog extends React.Component {
    

  render() {

    const {movie,handleClose} =this.props;
    
    return (
     
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={!!movie}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{ movie && movie.title} </DialogTitle>
          <DialogContent>
            <DialogContentText>
            { movie && movie.overview}
            </DialogContentText>
            <CardMedia
                    className="movie-detail-image"
                    image ={`http://image.tmdb.org/t/p/w500${movie && movie.poster_path}`}
                    title={movie && movie.title}
                    />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Release Date"
              type="date"
              value ={movie && movie.release_date}
              disabled
              fullWidth
            />
          </DialogContent>
          <DialogActions>
           
            <Button onClick={handleClose} color="primary">
             Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
