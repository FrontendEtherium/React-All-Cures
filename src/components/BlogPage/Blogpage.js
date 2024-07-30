import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import AllPost from './Allpost.js';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import Heart from"../../assets/img/heart.png";

export default class Blogpage extends Component{

    constructor(props) {
        super(props);
        const params = props.match.params
        this.state = { 
          limit: 15,
          offset: 0,
          dc: props.location.search.split('&')[1],
          noMoreArticles: false,
          param: params,
          items: [],
          isLoaded: false,
          LoadMore: false,
          regionPostsLoaded: false,
          country: new URLSearchParams(this.props.location.search).get('c'),
          diseaseCondition: new URLSearchParams(this.props.location.search).get('dc'),
          articleFilter: 'recent',
          isDiseasePostsActive: false
        };
      }

      allPosts(loadMore) {                        
        const headers = new Headers({
          'Authorization': 'Bearer local@7KpRq3XvF9' 
        });

        if(loadMore === 'loadMore') {
          this.setState({LoadMore: false})
        }
        if(this.state.noMoreArticles){
          return
        } else {
          fetch(`${backendHost}/article/allkv?limit=${this.state.limit}&offset=${this.state.offset}`,{
            method: 'GET',
            headers: headers
          })
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then((json) => {
            if(json.length === 0){
              this.setState({ noMoreArticles: true })
              return null
            }
            let temp = []
            if(this.state.articleFilter === 'recent'){
                temp = json.filter(i => i.pubstatus_id === 3)
            } else if(this.state.articleFilter === 'earliest'){
                temp = json.filter(i => i.pubstatus_id === 3)
            }
            temp.sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
            this.setState({LoadMore: true, isLoaded: true, items: loadMore ? [...this.state.items, ...temp] : temp})
          })
          .catch(err => {return})
        }
      }
      
      diseasePosts(type){                     
          this.setState({ isDiseasePostsActive: true }); 
          fetch(`${backendHost}/isearch/${type}`)
          .then((res) => res.json())
          .then((json) => {
            json.sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
            this.setState({
              isLoaded: true,
              items: json,
            });
          })
          .catch(err => {return})
      }

      regionalPosts(){
        fetch(`${backendHost}/isearch/treatmentregions/${this.state.dc.split('=')[1]}`)       
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            regionPostsLoaded: true,
            items: json.reverse(),
          });
        })
        .catch(err => {return})
      }

       handleScroll = () => {
        const { articleFilter, isDiseasePostsActive } = this.state;

        if (isDiseasePostsActive) {
          return;
        }
        
        if (articleFilter === 'recent' || articleFilter === 'earliest') {
          const bottom =
            Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      
          if (bottom) {
            this.setState(
              {
                offset: this.state.offset + 15,
              },
              () => this.allPosts('loadMore')
            );
            console.log('offset', this.state.offset);
          }
        }
      };
      
      articleFilterClick(e, filter) {
        this.setState({articleFilter: filter, offset: 0})
        var siblings = e.target.parentNode.parentElement.children
        if(siblings){
            for(var i=0;i<siblings.length; i++){
                if(siblings[i].classList.contains('active')){
                    siblings[i].classList.remove('active')
                }
              }
            e.target.parentElement.classList.add('active')
        }
      }

      componentDidMount() {
        if(this.props.match.params.type !== undefined){
          this.diseasePosts(this.props.match.params.type)
        } else if(this.props.location.search){
          this.regionalPosts()
        } else {
          this.allPosts()
        }
      }

      componentDidUpdate(prevProps, prevState){
        if ( prevProps.match.params.type !== this.props.match.params.type ){
          if(this.props.match.params.type){
            this.diseasePosts(this.props.match.params.type)
          } else {
            this.allPosts()
          }
        }
        window.addEventListener('scroll', this.handleScroll, {
          passive: true
        });

        return () => {
          window.removeEventListener('scroll', this.handleScroll);
        };
      }
      
    render(){
        var { isLoaded, items, regionPostsLoaded, LoadMore } = this.state;
        if(!isLoaded && !regionPostsLoaded) {
        return (
        <>
          <Header history={this.props.history}/>
            <div className="loader my-4">
              <img src={Heart} alt="All Cures Logo" id="heart"/>
            </div>
          <Footer/>
        </>  
      );
    } 
    else if(isLoaded){
        return(
            <>
            <Header history={this.props.history}/>
                <div className="container cures-search my-4">
                  {
                    this.props.match.params.type?
                    <div className="h3 text-capitalize text-center font-weight-bold mb-4">Cures Related to "{this.props.match.params.type.toLowerCase()}"</div>
                    :<div className="tab-nav">
                    <ul>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'recent'}, () => {
                            this.allPosts()
                            this.articleFilterClick(e, 'recent')
                            })}>Recent</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'earliest'}, () => {
                            this.allPosts()
                            this.articleFilterClick(e, 'earliest')
                            })}>Earliest</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'diabetes'}, () => {
                            this.diseasePosts('diabetes')
                            this.articleFilterClick(e, 'diabetes')
                            })}>Diabetes</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'arthritis'}, () => {
                            this.diseasePosts('arthritis')
                            this.articleFilterClick(e, 'arthritis')
                            })}>Arthritis</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'thyroid'}, () => {
                            this.diseasePosts('thyroid')
                            this.articleFilterClick(e, 'thyroid')
                            })}>Thyroid</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'insomnia'}, () => {
                            this.diseasePosts('insomnia')
                            this.articleFilterClick(e, 'insomnia')
                            })}>Insomnia</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'Hypertension'}, () => {
                            this.diseasePosts('Hypertension')
                            this.articleFilterClick(e, 'Hypertension')
                            })}>Hypertension</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'Skin Care'}, () => {
                            this.diseasePosts('Skin Care')
                            this.articleFilterClick(e, 'Skin Care')
                            })}>Skin Care</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'migraine'}, () => {
                            this.diseasePosts('migraine')
                            this.articleFilterClick(e, 'migraine')
                            })}>Migraine</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'Psoriasis'}, () => {
                            this.diseasePosts('Psoriasis')
                            this.articleFilterClick(e, 'Psoriasis')
                            })}>Psoriasis</button>
                       </li>
                       <li role="presentation" className='my-1'>
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'Healthy Living'}, () => {
                            this.diseasePosts('Healthy Living')
                            this.articleFilterClick(e, 'Healthy Living')
                            })}>Healthy Living</button>
                       </li>
                    </ul>
                 </div>
                  }
                 
{items.length === 0 && !this.state.isLoaded && (this.state.articleFilter !== 'recent' || this.props.match.params.type) ? (
  <div className='my-5 py-4 h5 container text-center'>We do not have any cures for this condition yet but our editorial team is working on it. In the meantime, if you have a cure, Please <Link to="/article">Click Here</Link> to add the cure to our site.</div>
) : null}

                    <div className="row mt-4" id="posts-container">
                    {items.map((i) => (
                      i.pubstatus_id === 3 ?            
                        <AllPost
                            docID = {i.docID}
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
                            country = {i.country_id}
                            content = {decodeURIComponent(i.content)}
                            type = {i.type}
                            imgLocation = {i.content_location}
                            published_date = {i.published_date}
                            key = {i.article_id}
                            over_allrating={i.over_allrating}
                            authorName = {i.authors_name}
                            allPostsContent={() => this.allPosts()}
                        />
                        : null
                    ))}
                    </div>
                </div>
                {
                  LoadMore  && (this.state.articleFilter === 'recent' || this.state.articleFilter === 'earliest') ?
                    <div className="loader my-4">
                      <img src={Heart} alt="All Cures Logo" id="heart"/>
                    </div>
                  : null
                }
                {
                  this.state.noMoreArticles  && (this.state.articleFilter === 'recent' || this.state.articleFilter === 'earliest') ?
                    <div className='container h4 text-center mb-5 pb-2'>
                      You have reached end of page. Thanks!
                    </div>
                    : null
                } 
            <Footer/>
            </>
        );
    } else if(regionPostsLoaded){
      return(
        <>
            <Header history={this.props.history}/>
                <div className="container my-4">
                  {
                    this.state.param.type?
                    <h1 className="h2 text-center">Cures related to "{this.state.param.type}"</h1>
                    :<h1 className="h2 text-center">All Cures</h1>
                  }
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                      parseInt(i.country_id) === parseInt(this.state.country) ?            
                        <AllPost
                            id = {i.article_id}
                            title = {i.title}
                            key = {i.article_id}
                        />
                        : null
                    ))}
                    </div>
                </div>
            <Footer/>
            </>
      );
    }
}
}
