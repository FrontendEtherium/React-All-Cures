import { Link } from 'react-router-dom'
import { imagePath } from '../../image-path';

const ProfileTab = ({ firstName, lastName, rowno, name, pSpl, hospital, state, country, eduTraining }) => {

  const onError = (e) => {
    if(e.target.parentElement){
      e.target.parentElement.innerHTML = `<i class="fas fa-user-md fa-6x"></i>`
    }
 }
  
  return (
  
    <div>
      <div className="tab-content">
        <div id="men" className="tab-pane fade in active">
          <div className="tab-content-detail clearfix mr-20">
            <div className="dr-detail">
              <div className="tab-content-img">
                  <img src={`${imagePath}/cures_articleimages/doctors/${rowno}.png?d=${parseInt(Math.random()* 1000)}`} 
      onError={(e) => onError(e)}/>
                  </div>
              <div className="col-md-12 col-sm-12">
                <div className="detail-l">
                  {/* <div className="rating"> <span className="icon-star-1"></span>
                    <p>{ratingVal}</p>
                  </div> */}
                  <div className="name">
                   <h3>Dr. {firstName} {lastName}</h3>
                  <h5>{pSpl}</h5>           {/* Primary Specialization */}
                  <h5>{hospital} {state} {country}</h5>
                  {/* <h5>{eduTraining.substr(0, 90)}</h5> */}
                       <h5>About Dr. {firstName} {lastName}</h5>
                    <p></p>
                  </div>
                  <div className="btn-group"> 
                  <Link to={ `/profile/${rowno}-${firstName}-${lastName}` } className="btn-bg profile-btn color-white" id="profile">
                         Visit Profile
                        </Link>
                    {/* {
                      acPerm ? 
                        <Link to={ `/profile/${rowno}` } className="btn-bg profile-btn color-white" id="profile">
                         Visit Profile
                        </Link>
                      : <button id="profile"
                          className="btn btn-bg profile-btn color-white text-capitalize font-weight-normal" 
                          onClick={() => setModalShow(true)}
                        >
                         Visit Profile
                        </button>
                    } */}
                  
                    </div>
                </div>
              </div>
          
              </div>
            </div>
          </div>
      </div>
    </div>
  )};

export default ProfileTab;
