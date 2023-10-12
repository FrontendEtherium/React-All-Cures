import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Rating from "../StarRating";
import Doct from "../../assets/img/doct.png";
import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import { Container, Button } from "react-bootstrap"
import axios from 'axios';
import EditProfile from "./EditProfile";
import { backendHost } from '../../api-config';
import Comment from '../Comment'
import '../../assets/healthcare/css/mobile.css'
// import ArticleComment from '../ArticleComment';
import { userId } from "../UserId";
import { userAccess } from "../UserAccess";
import AllPost from "../BlogPage/Allpost";
import Heart from"../../assets/img/heart.png";
import { Modal } from "react-bootstrap";

import HelmetMetaData from '../HelmetMetaData'
import { imagePath } from "../../image-path";
import Chat from "./Chat"


class Profile extends Component {
  constructor(props) {
    super(props);
    const params = props.match.params
    this.editToggle = this.editToggle.bind(this)
    this.fetchDoctorData = this.fetchDoctorData.bind(this)
    this.state = {
      items: [],
      articleItems: [],
      comment: [],
      ratingValue: '',
      rating: [],
      firstName: [],
      lastName: [],
      isLoaded: false,
      param: params,
      edit: false,
      showMore: false,
      modalShow: false,
      show: false,
      imageExists: false,
      selectedFile: '',
      isFilePicked: false,
      imageUploadLoading: false,
      showAlert: false,
      alertMsg: '',
      show:false,
      docid: null,
      initial:4,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  // Image Upload 
	changeHandler = (event) => {
    if(event.target.files[0].size > 1048576){
      this.Alert('Image should be less than 1MB!')
      return
    }
    this.setState({
      selectedFile: event.target.files[0],
    }, (event) => this.handleImageSubmission(event))
	}

  handleImageSubmission = (e) => {
    // e.preventDefault()
    this.setState({imageUploadLoading: true})
    const formData = new FormData();
    formData.append('File', this.state.selectedFile);
    fetch(`${backendHost}/dashboard/imageupload/doctor/${this.props.match.params.id.split('-')[0]}`,
      {
        method: 'POST',
        body: formData,
      }
    )
    .then((response) => response.json())
    .then((result) => {
      setTimeout(() => {
        this.setState({
          isFilePicked: true,
          imageUploadLoading: false
        })
      }, 5000);
      
      this.Alert('Image uploaded successfully.')
    })
    .catch((error) => {
        return
    });
    }
  Alert = (msg) => {
    console.log(msg)
    this.setState({
       showAlert:true,
       alertMsg: msg
    })
    setTimeout(() => {
       this.setState({
         showAlert: false
       })
    }, 5000);
}
postLead = (id) => {
  
  this.showModal()
    axios.post(`${backendHost}/leads/count/${this.props.match.params.id.split('-')[0]}`)
    
    
    .then(res => {
     
      console.log('id', res.data);
    })
    .catch(err => err); 
}
  // DOCTOR'S WRITTEN CURES

  allPosts=() =>{                        // For all available blogs "/blogs"
    fetch(`${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${this.props.match.params.id.split('-')[0]}?offset=0&limit=${this.state.initial}`)
      .then((res) => res.json())
      .then((json) => {
        var temp = []
        json.forEach(i => {
          if (i.pubstatus_id === 3) {
            temp.push(i)
          }
        });
        this.setState(prevState => ({
          articleItems: temp,
          initial: prevState.initial + 4
        }));
      })
      .catch(err =>
        {return}
      )
  }

  getComments = (id) => {
    axios.get(`${backendHost}/rating/target/${id}/targettype/1`)
      .then(res => {
        var temp = []
        res.data.forEach(i => {
          if (i.reviewed === 1 && i.comments !== "null") {
            temp.push(i)
          }
        })
        this.setState({
          comment: temp
        })
      })
      .catch(err => {return})
  }



  showComments = (item, i) => {
    return (
      <>
        <div className="col-12">
          <div className="card my-4 ">
            <div className="card-body">
              <h5 className="h6"> {item.comments}</h5>
              <div className="card-info">
                <h6 className="card-subtitle mb-2 text-muted">
                  <b>By :  </b>  {item.first_name} {item.last_name}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  getRating = (docId) => {
    axios.get(`${backendHost}/rating/target/${docId}/targettype/1/avg`)
      .then(res => {
        this.setState({
          ratingValue: res.data
        }, () => {
          setTimeout(() => {
            this.showRating(this.state.ratingValue)
          }, 1000);
        })
      })
      .catch(err => {return})
  }

  
  getRate = (docId) => {
    axios.get(`${backendHost}/rating/target/${docId}/targettype/1?userid=${userId}`)
      .then(res => {
        this.setState({
          rating: res.data[0].ratingVal
        })
      })
      .catch(err => {return})
  }


  fetchDoctorData = (id) => {
    fetch(`${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`)
      // .then(res => JSON.parse(res))
      .then((res) => res.json())
      .then((json) => {
        document.title = `${json.docname_first} ${json.docname_last}`

        this.setState({
          isLoaded: true,
          items: json,
          docid: json.docid,
        })
      });

  }
  showRating = (val) => {
    if (document.getElementById('doctor-avg-rating')) {
      for (let i = 0; i < val; i++) {
        document.getElementById('doctor-avg-rating').children[i].classList.add('checked')
      }
    }
  }


  editToggle = () => {
    if (this.state.edit === false) {
      this.setState({
        edit: true
      })
    } else {
      this.setState({
        edit: false
      })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchDoctorData(this.props.match.params.id.split('-')[0])
    this.getComments(this.props.match.params.id.split('-')[0])
    this.getRating(this.props.match.params.id.split('-')[0])
    this.getRate(this.props.match.params.id.split('-')[0])
    this.allPosts()
	  
	   const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.href;
    document.head.appendChild(canonicalLink);

    console.log('Canonical link:', canonicalLink);


    return () => {
      document.head.removeChild(canonicalLink);
    };
  }

  setModalShow = (action) => {
    this.setState({
      modalShow: action
    })
  }
  handleClose = () => {
    this.setState({
      show: false
    })
  }

  handleShow = () => {
    this.setState({
      show: true
    })
  }

  checkIfImageExits = (imageUrl) => {
    fetch(imageUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          this.setState({
            imageExists: true
          })
        } else {
          this.setState({
            imageExists: false
          })
        }
      }).catch(err => {return});
  }

  onError = (e) => {
    if(e.target.parentElement){
      e.target.parentElement.innerHTML = `<i class="fas fa-user-md fa-6x"></i>`
    }
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {

      return (
        <>
          <Header history={this.props.history} />
          <div className="loader my-4">
              {/* <i className="fa fa-spinner fa-spin fa-6x" /> */}
              <img src={Heart} alt="All Cures Logo" id="heart"/>

            </div>
          <Footer />
        </>
      );

    } else if (isLoaded && items == null) {
      return (
        <>
          <Header history={this.props.history} />
          <Container className="mt-5 my-5">
            <h3 className="m-auto text-center"><span className="icon-loupe "></span></h3>
            <h3 className="text-center">Doctor not found</h3>
          </Container>
          <Footer />
        </>
      )
    } else if (isLoaded) {
      const { isFilePicked, showAlert, alertMsg } = this.state
      return (
        <div>
          {
                showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }
            <HelmetMetaData 
              title={items.prefix + ' ' + items.docname_first + ' ' +items.docname_last} 
              description={items.about} 
              image={`${imagePath}/cures_articleimages/doctors/${items.rowno}.png`}
              keywords = {items.docname_first +' '+ items.docname_last+' , '+ items.hospital_affliated+ ' , '+items.primary_spl}>
        </HelmetMetaData>
          <Header history={this.props.history} />

          <section className="Profileleft">
            <div className="container">
              <div className="row">
                <div className="col-md-8 pd-0">
                  <div className="profile-card clearfix">
                    <div className="col-md-3">
                      <div className="profileImageBlok">
                        <div className="profile-card-img text-center" id="profile-card-img">
                          {/* {
                            imageUploadLoading?
                              <div className="loader">
                                <img src={Heart} alt="All Cures Logo" id="heart"/>
                              </div>
                            : null
                          } */}
                          <h1 style={{display:'none'}}>All Cures is a product developed, managed and owned by 
                        Etherium Technologies. Our mission is to make it simple and convenient for users to get information on Cures from anywhere in the world. 
                        Our belief is that your wellness is your well-being. 
                        We are passionate about giving our users the unique 
                        experience that is both fulfilling and wholesome.</h1>
                        <h2  style={{display:'none'}}>Ayurveda, Homeopathy, Chinese Medicine, Persian, Unani</h2>
                        <img alt={items.docname_first} 
                                src={`${imagePath}/cures_articleimages/doctors/${items.rowno}.png?d=${parseInt(Math.random() * 1000)}`} 
                                onError = {(e) => this.onError(e)}
                              />
                          
                        </div>
                          {
                            this.props.match.params.id.split('-')[0] === userId || userAccess == 9?
                            <>
                              <label for="fileInput" className="image-edit-icon"> 
                                <i className="fas fa-edit fa-2x"></i>
                              </label>
                              <input id="fileInput" type="file" name="file" onChange={this.changeHandler} required/>
                            </>
                            : null
                          }
                        

                          {/* {isFilePicked ? (

                              <div>
                                
                                  <p>Filename: {selectedFile.name}</p>

                                  <p>Filetype: {selectedFile.type}</p>

                                  <p>Size in bytes: {selectedFile.size}</p>

                                  <p>

                                      lastModifiedDate:{' '}

                                      {selectedFile.lastModifiedDate.toLocaleDateString()}

                                  </p>

                              </div>

                              ) : (

                              <p>Select a file to show details</p>

                              )} */}
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="profile-info">
                        <div className="profile-infoL-card">
                          <div className="profile-info-name" id="DocDetails">
                            <div className="h4 font-weight-bold">
                              {items.prefix}. {items.docname_first} {items.docname_middle}{" "}
                              {items.docname_last}{" "}
                               {/* Show average rating */}
                            {
                              this.state.ratingValue ?
                                <div className=" mt-2 mb-4" id="doctor-avg-rating">
                                  <span class="fa fa-star opacity-7"></span>
                                  <span class="fa fa-star opacity-7"></span>
                                  <span class="fa fa-star opacity-7"></span>
                                  <span class="fa fa-star opacity-7"></span>
                                  <span class="fa fa-star opacity-7"></span>
                                </div>
                                : null
                            }
                            </div>
                            <div className="h5 text-capitalize"><i class="fas fa-award pr-1"></i>{items.primary_spl.toLowerCase()}</div>
                            <div className="h5 ">{items.experience}</div>
                            <div className="h5 text-capitalize">
                            <i class="fas fa-hospital pr-1"></i>
                               {items.hospital_affliated}{" "}
                              {items.country_code}
                              
                            </div>
                           
                            <div>



                            </div>


                          </div>

                        </div>
                        <div className="rating-reviews">
                          <div className="profile-info-rating">
                            <h2>
                              <form

                                className="rating"
                              >
                              </form>
                            </h2>
                          </div>
                          <div className="reviews" >

                            {
                              userAccess === '9' || parseInt(userId) === parseInt(this.props.match.params.id.split('-')[0]) ?
                                <Button variant="dark" onClick={() => this.setModalShow(true)}>
                                  Edit Profile
                                </Button>
                                : null
                            }
                            
                            <EditProfile
                              show={this.state.modalShow}
                              onHide={() => this.setModalShow(false)}
                              items={items}
                              fetchDoctor={this.fetchDoctorData}
                              id={this.props.match.params.id.split('-')[0]} />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="aboutDr">
                    <div className="h4 font-weight-bold">
                      About {items.prefix} .{items.docname_first} {items.docname_middle}{" "}
                      {items.docname_last}

                    </div>

                    <div id="about-contain">
                      <p className="text one">
                        {" "}
                        {items.about.includes('•')? items.about.split('•').map((i, idx) => <li className={`list-${idx}`}>{i}</li>): items.about}{" "}
                        {/* {this.props.match.params.id.split('-')[0] == 874?<li>More about him at <a href="https://planetayurveda.com" target="_blank" rel="noreferrer">www.planetayurveda.com</a>.</li>: null} */}
                      
                        {this.props.match.params.id.split('-')[0] == 872?<><br/>More about him at <a href="https://ayurvedguru.com" target="_blank" rel="noreferrer">www.ayurvedguru.com</a>.</>: null}
                        {this.props.match.params.id.split('-')[0] == 878?<><br/>More about him at <a href="http://www.ayushmanbhavayurveda.com/" target="_blank" rel="noreferrer">www.ayushmanbhavayurveda.com</a>.</>: null}
                        {/* {this.props.match.params.id.split('-')[0] == 878?<><br/>More about him at <a href="https://www.ayurvedanashik.com" target="_blank" rel="noreferrer">www.ayurvedanashik.com</a>.</>: null} */}
                        {this.props.match.params.id.split('-')[0] == 884?<><br/>More about him at <a href="http://expertayurveda.com/" target="_blank" rel="noreferrer">http://expertayurveda.com/</a>.</>: null}

                      </p>
                      <a href={`${items.website_url}`} target="_blank" rel="noreferrer" className="h6">{items.website_url}</a>

                    </div> 
                    <div></div>

                    <br />
                    <div className="abt-eduction ">
                      <div className="h4 font-weight-bold">Education</div>
                      {items.edu_training}
                    </div>
                    <div className="mt-5">
                      <div className="h4 font-weight-bold">Accomplishments</div>
                      {items.awards.split('•').map((i, idx) => <li className={`list-${idx}`}>{i}</li>)}
                    </div>

                    <br />
                    <div className="about-specialties">
                      <div className="h4 font-weight-bold">Specialties</div>
                      <ul>
                        <li>{items.primary_spl}</li>

                      </ul>
                      <ul>
                        <li>{items.other_spls}</li>

                      </ul>
                    </div>
                    <br />

                    {/* </div> */}
                    <div className="abt-eduction ">
                      <div className="h4 font-weight-bold">Miscellaneous
                      </div>
                      <div className="h6 font-weight-bold">City:            
                        <span> {items.cityname}</span>
                      </div>
                      <div className="h6 font-weight-bold">State:          
                         <span> {items.statename}</span>
                      </div>
                      <div className="h6 font-weight-bold">Country:          
                         <span> {items.country_code}</span>
                       
                      </div>
                      <div className="h6 font-weight-bold">Gender: 
                        {
                          items.gender === 2 ?
                            <span> Male </span>
                            : <span> Female</span>
                        }
                      </div>

                      {
                      items.subscription ===1
                       ?
                        <>
                               
        <Button className="ml-3 mt-4 btn-article-search" id="textComment"  onClick={this.postLead}>
       Contact Doctor
      </Button>

      

      <Modal show={this.state.show} onHide={this.hideModal} className="rounded mt-5" >
        <Modal.Header className="bg-review py-3" closeButton>
          <Modal.Title className="pl-4">{items.prefix}. {items.docname_first} {items.docname_middle}{" "}
                      {items.docname_last} contact info...</Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="rounded">
        <div  className="pl-4">
        
        </div>
        
        <div className="pl-4">

        
            </div>
        </Modal.Body>
        <Modal.Footer>
       
        </Modal.Footer>
      </Modal>
           
                        </>
                        : null
                    }
         
        

                   
                     

                    </div>

                  </div>
                  
                  
               
                

                  
                  {

userAccess?
  <>    
    {
          this.state.rating.length === 0 ?
            <span className='h5 mt-3'> You feedback is valuable to us, Please rate here... </span>
            : <p className='h5 mt-3'>Your Earlier Rated {this.state.rating } <span className="icon-star-1"></span><br/>Rate Again,</p>
            
        }          
  </>
: <div className='h5 mt-3'>Rate here</div>
}
        <div id="docRate">
          <Rating docid={this.props.match.params.id.split('-')[0]} ratingVal={this.state.rating} />
        </div>
  

                {
                  // userId && items.subscription === 1 ?
                  userId && items.subscription === 1 && userAccess != 1 ?
                  <>

                   <Chat imageURL={`${imagePath}/cures_articleimages/doctors/${items.rowno}.png`}   items={items} docid={this.state.docid} />

                  </>
                  :null
                }

                  
                  <div className="comment-box">

                    {
                      userId ?
                        <>
                          <Comment refreshComments={this.getComments} docid={this.props.match.params.id.split('-')[0]} />
                        </>
                        : null
                    }

                  </div>

                  {/* SHOW ALL COMMENTS */}
                  <div className="main-hero">
                    {!this.state.showMore ?
                      this.state.comment.slice(0, 3).map((item, i) => (
                        this.showComments(item, i)
                      )) :
                      this.state.comment.map((item, i) => (
                        this.showComments(item, i)
                      ))
                    }
                  </div>
                  {
                    this.state.comment ?
                      this.state.comment.length > 3 &&
                      <button id="show-hide-comments" className="white-button-shadow btn w-100"
                        onClick={() => {
                          this.state.showMore ?
                            this.setState({
                              showMore: false
                            }) :
                            this.setState({
                              showMore: true
                            })
                        }}>
                        {
                          !this.state.showMore ?
                            'Show more'
                            : 'Hide'
                        }
                      </button>
                      : null
                  }
                </div>
                <div className="col-md-4">
                  <div className="profile-card doctors-article d-flex flex-column hideScroll" style={{overflowY:" auto",maxHeight:"960px"}}>
                    <div className="h5 font-weight-bold mb-3">
                      {/* No cures By Dr. {items.docname_first} {items.docname_middle} {items.docname_last} yet */}
                      <div className="text-center">Explore Cures</div></div>
                    {this.state.articleItems ?
                      this.state.articleItems.map((i, index) =>  (
                        <AllPost
                          id={i.article_id}
                          title={i.title}
                          f_title={i.friendly_name}
                          w_title={i.window_title}
                          type={i.type}
                          content={decodeURIComponent(i.content ?
                            i.content.includes('%22%7D%7D%5D%7D') ?
                              i.content
                              : i.content.replace('%7D', '%22%7D%7D%5D%7D')
                            : null)}
                          // type = {i.type}
                          published_date={i.published_date}
                          over_allrating={i.over_allrating}
                          // country = {i.country_id}
                          imgLocation={i.content_location}
                        // history = {props.history}
                        />
                      ))
                      : null
                    }

                        {this.state.articleItems.length>0 &&(
                       
                       <div className="d-grid mt-3 mb-5 text-center">
      
                     <button onClick={this.allPosts} type="button" className="btn btn-danger">
                              Load More 
                                 </button>
                             </div>
    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="chat">
            <div className="container">
              <div className="row">
                <div className="">
                  {" "}
                  <a href="//#">
                    {" "}
                    <span className="icon-chatbot">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                      <span className="path6"></span>
                      <span className="path7"></span>
                      <span className="path8"></span>
                      <span className="path9"></span>
                      <span className="path10"></span>
                      <span className="path11"></span>
                      <span className="path12"></span>
                      <span className="path13"></span>
                      <span className="path14"></span>
                      <span className="path15"></span>
                      <span className="path16"></span>
                      <span className="path17"></span>
                      <span className="path18"></span>
                      <span className="path19"></span>
                    </span>{" "}
                  </a>{" "}
                </div>
              </div>
            </div>
          </section>
          <div>


          </div>
          <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">

                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <section className="appStore" >
                  <div className="container">
                    <div className="row">
                      <div className="appStoreBg clearfix" style={{ display: "flex", width: "100%", flexWrap: 'wrap' }}>
                        <div className="col-md-6 col-sm-6 col-sx-12">
                          <div className="innerapp">
                            <div className="doc-img">
                              <img src={Doct} alt="doct" />
                            </div>
                            <div className="btn-Gropu">
                              <a href="/#" className="appBTN">App Store</a>
                              <a href="/#" className="appBTN">App Store</a>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </section>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );

    }

  }
}

export default Profile;
