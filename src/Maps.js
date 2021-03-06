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
    favStores: [],
    };
    this.handleAddFavs = this.handleAddFavs.bind(this);
  }

  handleAddFavs(favStores) {
    this.setState({
     favStores: [...this.state.favStores, favStores]
    })
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

    removeFavs(index) {
        if (window.confirm("¿Estás seguro de eliminar este pedido?")) {
        this.setState({
          favStores: this.state.favStores.filter((e, i) =>{
            return i !== index
          })
        })
        return this.setState.favStores;
      }}

  btnFavorites = () => {
     const select = this.state.selectedStore.name; 
     const selected = this.state.store;
     selected.push(select);
     this.setState({
      favStores: selected
    });
    return console.log(this.state.favStores)
    }

    
render() {
  const mapStyles = {
    width: '65%',
    height: '60%',
  };

  const { favStores } =  this.state;
  
return (
<div className='maps'>
  <div className='tableContainer'>
  <h1>Favorites Stores</h1>
     <div className="favNames">
      </div>

      <Button color='warning' onClick={ this.btnFavorites } > Guardar en favoritos</Button>

      <Table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
       { favStores && favStores !== undefined ? favStores.map((favStores, i) => (
          <tr color="danger" key = { i }>
            <button className="btnFavs" onClick={ this.state.store }>{ favStores }</button>
            <button className="btn btn-danger"
                  onClick={ this.removeFavs.bind(this, i) }
                  > X </button>
          </tr>
        )) : null }
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