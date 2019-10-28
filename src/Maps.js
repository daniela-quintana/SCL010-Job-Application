import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import stores from './store_directory.json'
import './Maps.css' 

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
    stores: stores, 
    showingInfoWindow: false,
    activeMarker: {},
    selectedStore: {},
    store: [],
    }
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      selectedStore: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  
  onMapClicked = () => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };

  displayMarkers = () => {
      return this.state.stores.map((store, index) => {
      return <Marker 
        key={index} 
        title={store.Name}
        name={store.Address}
        position={{
          lat: store.Coordinates.lat,
          lng: store.Coordinates.lng,
        }}
     onClick={this.onMarkerClick}
     />
    })
  }
   
  // addToFavorites = () => {
  //   return this.state.stores.map((store, index) => {
  //   const favs = [];
  //   favs.push(stores[index])
  //   console.log(favs) 
  //     return (
  //       <h1> { store.Name } </h1>
  //     )
  //   })}

   btnFavorites = () => {
     const select = this.state.selectedStore;
     const selected = this.state.store;
     selected.push(select);
     console.log(selected)
  }

  render() {
    const mapStyles = {
      width: '65%',
      height: '60%',
    };

    // const addFavorites = () => {
    //   const favorites = [];
    //   this.state.stores.map((store, index) => {
    //   favorites.push(store[index])
    //     return console.log(stores[index].Name)   
    //   })}

    
 return (
<div className='maps'>
  <div className='tableContainer'>
  <h1>My Favorites Stores</h1>
     <div className="favNames">
      </div>

      <Button color='warning' onClick={ this.btnFavorites } > Guardar en favoritos</Button>

      <Table>
      <thead>
        <tr>
          <th>*</th>
          <th>Name</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td> {this.state.selectedStore.name} </td>
          <td> {this.state.selectedStore.title} </td> 
          <button className="btn btn-danger"
                // onClick={ this.removeTasks.bind(this, i) }
                > X </button>
        </tr>
      </tbody> 
    </Table>
  </div>

  <div className="mapsContainer">
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 19.435316, lng: -99.136017}}
    >
        {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedStore.title}</h1>
                <p>{this.state.selectedStore.name}</p>
              </div>
          </InfoWindow>
    </Map>
</div>    
</div>
 );
    }
  }

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyB4r3AjjNWZK7oaojmRqgYfoJv90519Gco'
  })(Maps);