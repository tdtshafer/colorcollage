'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { createClient } from 'pexels';

class BackgroundColor extends React.Component {
  state = {
    color: this.getRandomColor(),
    photo: this.getPhotoFromPexels(),
    imageUrl: "",
  };

  handleClick = () => {
    this.setState({ 
      color: this.getRandomColor(),
      photo: this.getPhotoFromPexels(),
     })
  };


  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  getRandomColor() {
      let red = this.getRandomRGB().toString()
      let green = this.getRandomRGB().toString()
      let blue = this.getRandomRGB().toString()

      return {
        r: red,
        g: green,
        b: blue,
        a: '1',
        hex: this.rgbToHex(red, green, blue)
      }
  };

  getRandomRGB() {
      return Math.floor(Math.random() * 255)
  };

  getPhotoFromPexels() {
    let photo = this.requestPhotos();
    console.log(photo)
  }

  async requestPhotos() {
    let randomWords = require('random-words')
    let query = randomWords();
    let color = (n) => this.state.color.hex;
    let client = createClient(process.env.REACT_APP_PEXELS_API_KEY)
    let photos = await client.photos.search({ query: query, color: color, per_page: 1 })
    this.setState({imageUrl: photos["photos"][0]["src"]["large"]});
  }

  render() {

    const styles = reactCSS({
      'default': {
        main: {
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
          height: '100vh',
        },
      },
    });

    return (
      <div>
        <div style={ styles.main } onClick={ this.handleClick }>
        <img 
          src={ this.state.imageUrl}
          alt="image"
        />
        </div>
      </div>
    )
  }
}

export default BackgroundColor