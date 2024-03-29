import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

import { Container } from "react-bootstrap";
import AllPost from './Allpost';
import { backendHost } from '../../api-config';

import headers from '../../api-fetch';


export default class Blogpage extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          items: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch(`${backendHost}/article/all`,{
          method: 'GET',
          headers: headers 

        })
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              items: json,
            });
          })
          .catch(err => {return}
        )
      }
    render(){
        var { isLoaded,items } = this.state;
        if(!isLoaded) {
        
        return (
        <>
          <Header/>
            <Container className="mt-5 my-5 loading">
              <h3 className="text-left">Loading...</h3>
            </Container>
          <Footer/>
        </>  
      );
    } else if(isLoaded){
        return(
            <>
            <Header/>
            
                <div className="container my-4">
                    <h1 className="h1 text-center">Recent Posts</h1>
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                        <AllPost
                            key={i[0]}
                            id = {i[0]}
                            title = {i[1]}
                            f_title = {i[2]}
                            w_title = {i[6]}
                        />
                    ))}
                    </div>
                </div>
            <Footer/>
            </>
        );
    }
}
}