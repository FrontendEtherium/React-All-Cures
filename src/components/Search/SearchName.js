import React, { Component } from 'react' ;
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfileTab from './ProfileTab';
import Cookies from 'js-cookie';

import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import { Container } from 'react-bootstrap';
import { backendHost } from '../../api-config';
import Test from '../LandingPage/test'


class SearchName extends Component {
  constructor(props){
    super(props);
    const params = props.match.params
    this.state = {
        url: props.url,
      items: [],
      isLoaded: false,
      param: params,
      acPerm: Cookies.get('acPerm'),
      reload: false
    }
  }

  fetchDoctors(name) {
    document.title = `All Cures | Search | ${name}`
      fetch(`${backendHost}/SearchActionController?cmd=getResults&city=&doctors=${name}&Latitude=32.7266&Longitude=74.8570`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.map.DoctorDetails.myArrayList,
        })            
      });
  }

  fetchDiseaseList(){
    Promise.all([
      fetch(`${backendHost}/article/all/table/disease_condition`).then(res => res.json())
      ])
      .then(diseaseData => {
        this.setState({
          speciality: diseaseData
      });
      })
  }

    componentDidMount() {
      this.fetchDoctors(this.props.match.params.name);
      this.fetchDiseaseList();  
      const some = Header.onSug
    }
  
    componentDidUpdate(prevProps){
      if ( prevProps.match.params.name !== this.props.match.params.name){
        console.log('prevpropsssssssss: ', prevProps.match.params.name, this.props.match.params.name )
        this.fetchDoctors(this.props.match.params.name)
      }
    }
  
    setModalShow =(action) => {
      this.setState({
        modalShow: action
      })
    }
  
  render() {
    var { isLoaded,items } = this.state;
      if(!isLoaded) {
        return (
        <>
          <Header history={this.props.history} url={this.props.match.url}/>
            <Container className="mt-5 my-5 loading">
              <h3 className="text-left">Loading...</h3>
            </Container>
          <Footer/>
        </>  
      );
      } else if(isLoaded && items.length === 0) {
          if(this.state.param.city){
            return(
              <>
              <Header history={this.props.history} url={this.props.match.url}/>
                <Container className="mt-5 my-5 loading">
                <h3 className="pt-5 text-center"><span className="icon-loupe "></span></h3>
                <h3 className="mt-3 text-center">We couldn't find any doctors matching '{this.state.param.city}'</h3>
                <p className="text-center">You could try again. </p>
                </Container>
              <Footer/>
              </>
            );
          } else if(this.state.param.name){
            return(
              <>
              <Header history={this.props.history}/>
                <Container className="mt-5 my-5">
                <h3 className="pt-5 text-center"><span className="icon-loupe "></span></h3>
                <h3 className="text-center">We couldn't find any doctors matching '{this.state.param.name}'</h3>
                <p className="text-center">You could try again. </p>
                </Container>
              <Footer/>
              </>
            );
          }
        
      }
      else if(isLoaded){
        return(
          <div>
            <Header history={this.props.history} url={this.props.match.url}/>
              <section className="physicians-tab">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 pd-0">
                      <div className="tab-nav">
                        <div className="comman-heading">
                          <h2>All Physicians</h2>
                        </div>
                        {/* Nav tabs */}
                        <ul className="nav">
                          <li className="active"><a data-toggle="pill" href="#men">Men</a></li>
                          <li><a data-toggle="pill" href="#women">Women</a></li>
                          <li><a data-toggle="pill" href="#children">Children</a></li>
                          <li><a data-toggle="pill" href="#date">16 Sep, 2020</a></li>
                        </ul>
                        <a href="javascriptvoid(0)" className="moreFilters color-white btn-bg">
                          More Filters
                        </a> 
                      </div>
                        {items.map((i) => (
                          <ProfileTab
                            docid= {i.map.doctorid}
                            name = {i.map.name}
                            pSpl = {i.map.primary_spl}
                            hospital = {i.map.hospital_affliated}
                            state = {i.map.state}
                            country = {i.map.country_code}
                            acPerm = {this.state.acPerm}
                            url = {this.props.url}
                            reload = {this.state.reload}
                            setModalShow = {this.setModalShow}
                          />
                        ))}
                        <Test
                          show={this.state.modalShow}
                          onHide={() => this.setModalShow(false)}
                        />
                    </div>
                  </div>
                </div> 
              </section>
              <Footer/>
            </div>
        ); 
    }
} 
}
export default SearchName; 