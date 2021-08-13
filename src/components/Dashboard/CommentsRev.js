import React, { Component } from "react";

import axios from 'axios';
import Results from './Results'


import List from '@material-ui/core/List';
import { mainListItems, secondaryListItems } from './listItems';
// import '../../assets/healthcare/css/comment.css';

class CommentsRev extends Component {
  constructor(props) {
    super(props);
    // const params = props.match.params
    this.state = { 
      items: [],
      commentItems: [],
      isLoaded: false,
      selectedCheckboxes: [],
      unselectedCheckboxes: []
      // param: params,
      // getComments: 'all',
    };
  }
  getComments(val) {
    
    axios.get(`/rating/comments${val}`)
      .then(res => {
        console.log(res.data)
        var s = [];
        res.data.map(i => {
          s.push(i.rate_id);
        })
        console.log(s)
        this.setState({
          commentItems:res.data,
          unselectedCheckboxes: s
        })
        console.log('kjdghkhgkhgsd',this.state.unselectedCheckboxes)
      })
      // .then(res => {
      //   res.data.map((i) => {
      //     console.log(i.rate_id)
      //   })
      //   // console.log(check)
      // })
      .catch(err => console.log(err))
    
  }


  postApproved(selected, rejected) {
    console.log(selected.join())
    console.log(rejected.join())
    
    axios.post(`/rating/reviewedby/1/reviewed/1`, {
      "rateids": selected.join(),
      "rateids_rejected": rejected.join()
    })
      .then(res => {
        console.log(res)
       
      })
      .catch(err => console.log(err))

    
  }

  

  componentDidMount() {
    
  
    this.getComments('/')

    
  }
  
  onChange = id => {
    const index = this.state.unselectedCheckboxes.indexOf(id);
    if (index > -1) {
      this.state.unselectedCheckboxes.splice(index, 1);
    }
    console.log('after delete: ',this.state.unselectedCheckboxes)
    console.log('##########################',id)
    const selectedCheckboxes = this.state.selectedCheckboxes;
    console.log(selectedCheckboxes)
    // Find index
    const findIdx = selectedCheckboxes.indexOf(id);

    // Index > -1 means that the item exists and that the checkbox is checked
    // and in that case we want to remove it from the array and uncheck it
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }

    this.setState({
      selectedCheckboxes: selectedCheckboxes
    });
    
    // this.setState({
    //   UnselectedCheckboxes: UnselectedCheckboxes
    // });
  };
render(){
  const { selectedCheckboxes, unselectedCheckboxes } = this.state;
  
   function select(e) {
    
    var checkboxes = document.getElementsByClassName('check');
   
    for (var checkbox of checkboxes) {
        checkbox.checked = e.target.checked;
    }
    
  }

  
  return (
    <>
    
              <div className="tab-content">
              <div><input type="checkbox" onClick={select} className="select-all" />
              <label for="checkbox" className="select-all">Select All</label></div>
              <div className="my-3 container" style={{zIndex: '999999'} }>
                <Results/>
                
                                    <select name=""className="form-select"
                                      onChange={(e)=> {
                                        
                                        // this.setState({
                                        //   getComments: e.target.value
                                        // })
                                        if(e.target.value == '0') {
                                          this.getComments('/0')
                                        }else if(e.target.value == '1') {
                                          this.getComments('/1') 
                                        }else {
                                          this.getComments('/')
                                        }
                                      }}
                                      id="">
                                      <option value="all"  onClick={() => this.getComments('/')}>All</option>
                                      <option value="1" onClick={() => this.getComments('/1')} >Approved</option>
                                      <option value="0"  onClick={() => this.getComments('/0')}>UN Approved</option>
                                      
                                    </select>
                                    
                                </div>
             

 
    
                      <div id="patient" className="tab-pane active">
                        
                        <div className="rating-outer" id="rating">
                        
                        {this.state.commentItems.map((item,i) => {
                            return (
                              <>
                                <div className="rating-patient">
                            <div className="rating-patient-grid clearfix">
                              <div className="paitent-profile">
                             
                                {" "}
                              </div>
                              {
                                item.reviewed === 1 ?
                                  <div>
                                  <input type = "checkbox"
                                  onChange={() => this.onChange(item.rate_id)}
                                  selected={selectedCheckboxes.includes(item.rate_id)}
                                  className="check"
                                  // checked
                                  not checked 
                                />
                                

                              </div>
                              : <input type = "checkbox"
                              onChange={() => this.onChange(item.rate_id)}
                              selected={selectedCheckboxes.includes(item.rate_id)}
                              className="check"
                              
                            />
                        }
                              
                              
                             
                             

                              <div className="patient-msg">
                              
                                <p>{item.rate_id}</p>
                              </div>
                            </div>
                          </div>
                              </>
                            )
                          })}
                          <p>Selected checkboxes: {JSON.stringify(selectedCheckboxes)}</p>
                         
                          <div>
                                
                                <button onClick={() => {this.postApproved(selectedCheckboxes, unselectedCheckboxes)}}>Submit</button>
                              </div>
                         
                        </div>
                      </div>
                      <div id="recomended" className="tab-pane fade">
                        <h3>Menu 1</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
    </>
    
  )
}

}
export default CommentsRev; 