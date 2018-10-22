import React, { Component } from 'react';
import './App.css';
import MovieCard from './components/MovieCard'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MovieDialog from './components/MovieDialog'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';

const apiKey = '6bfc2f7acaf19caf13f2d5b4ecbd5ae1';

const styles = {
  root: {
    flexGrow: 1,
  },
};


class App extends Component {

  constructor(props) {
    super (props);
    this.state = {movies:[],selectedmovie:null,searchText:''};
  }

  selectMovie = movie => {
   
    this.setState ({selectedmovie:movie })
    console.log("Setting state" + this.selectedmovie)
}
  clearMovie =() => this.setState({selectedmovie:''})
  async componentDidMount() {
    const response = await fetch (`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
    const json = await response.json();   
    this.setState ({movies:json.results});
    // console.log ("Results" + JSON.stringify(json.results))

   
  }

  handleSearch =  async e => {
    e.preventDefault();
    const {searchText} = this.state;
    console.log ("Searching..");
    const response = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`);
    const json = await response.json();    
    this.setState ({movies:json.results});
    console.log ("Search Results" + JSON.stringify(json.results))
   
  }
  handleSearchTermChange = (event) =>  {
    event.preventDefault();
    this.setState({searchText:event.target.value})
  }
  
  
  render() {

     const {movies,searchText} = this.state
    return (
      <div >
      <AppBar position="fixed" color="primary" >
        <Toolbar>
          <Typography variant="h6" color="inherit" className="title">
            Top Movies
          </Typography>
          <form onSubmit ={this.handleSearch}>
          <TextField
              type ="search"
              value= {searchText}
              onChange={this.handleSearchTermChange }
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="Search"
                      
                    >
                     <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
        />
          </form>
        </Toolbar>
      </AppBar>
        <div className="movies">
          {movies.map( movie => <MovieCard key={movie.id} movie={movie} selectMovie={this.selectMovie}/>)}
        </div>
        <MovieDialog movie={this.state.selectedmovie} handleClose={this.clearMovie} />

    </div>
    );
  }
}

export default withStyles(styles)(App);
