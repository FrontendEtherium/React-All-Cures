import React, {Component} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import AllPost from './Allpost';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'





export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0
            
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    receivedData() {
        axios
            .get(`/article/all`)
            .then(res => {

                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>
                     <div className="container my-4">
                     <div className="row" id="posts-container">
                     <AllPost
                                            key={pd[0]}
                                            id = {pd[0]}
                                            title = {pd[1]}
                                            f_title = {pd[2]}
                                            w_title = {pd[6]}
                                        />
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
    render() {
        return (
            <div>
                <Header/>
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
                     <Footer/>
            </div>
            

        )
        
    }
    
}
