import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
// import EditModal from './EditModal'
import {Container} from "react-bootstrap";
import AllPost from './Allpost.js';
import  Pagination  from '../../Pagination';
import axios from 'axios'
import ReactPaginate from 'react-paginate';


export default class Blogpage extends Component{

    constructor(props) {
        super(props);
        console.log(props)
        const params = props.match.params
        this.state = { 
          // url: props.url,
          param: params,
          items: [],
          isLoaded: false,
          offset: 0,
            data: [],
            perPage: 4,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
      }

      receivedData() {
        axios
            .get(`/article/allkv`)
            .then(res => {

              
                const data = res.data;
                
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                
                const postData = slice.map(pd => <React.Fragment>
                  
                  <div className="container-fluid">
                  <div className="row" >
                  
                    {pd.title}
                    {pd.w_title}
                    
                    </div>
                    </div>
                </React.Fragment>)
                

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                   
                    postData
                })
            });
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };
  
      
     
      
      componentDidMount() {
        this.receivedData()        
      }
      
    render(){
        return(
            <>
            <Header/>
            
            <div>
                {this.state.postData}
                
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
            <Footer/>
            </>
        );
    }
}