import React, {useState, useEffect} from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import './style.css'
import { backendHost } from '../../api-config';

const Side = props => {
    const [items, setItems] = useState([])
    const [overviewArticle, setOverviewArticle] = useState('')
    function  allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/isearch/hierarchy/${props.diseaseId}`)
          .then((res) => res.json())
          .then((json) => {
            setItems(json)
          })
          .catch(err => 
            console.log(err)
        )
      }

      useEffect(() => {
        allPosts()
        if(props.regionalPosts){
        props.regionalPosts.forEach(i => {
            if(i.type === "1") setOverviewArticle(i.article_id)
            // if(i.type === "3") setCureArticle(i.article_id)
        });
    }
        console.log(props.regionalPosts)
        // eslint-disable-next-line
    }, [])

    return (
        <>
    
            <Nav className="d-md-block"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item className="set-width pl-3">
                <div className="h3 pl-2 pb-1" id="l-menu"><u className="text-decoration-none">Menu</u></div>
                <div className="guide mt-4">
                    <div className="h5 pl-2">{props.name} Guide</div>
                    {/* <div className="card"> */}
                    <div className=" menu-item">
                        <Link className="text-dark h6" to={`/cure/${overviewArticle}`}>Overview & Facts</Link>
                    </div>
                    <div className=" menu-item">
                        <Link className="text-dark h6">Symptoms & Diagnosis</Link>
                    </div>
                    <div className=" menu-item">
                        <Link className="text-dark h6">Treatment & Care</Link>
                    </div>
                    {/* <div className=" menu-item">
                        <Link className="text-dark h6">Living with</Link>
                    </div> */}
                </div>
                <div className="related mt-5">
                {   
                    items.length !== 0?
                        <>
                        <div className="h4 pl-2">Related to {props.name}</div>
                        {
                            items.map((i) => (
                                <div className=" menu-item" key={i.dc_id.toString()}>
                                    <Link to={`/cures/${i.dc_name}`} className="text-dark h6">{i.dc_name}</Link>
                                </div>
                            ))
                        }
                        </>
                    : null
                }
                </div>
                {/* </ul> */}
            </Nav.Item>
            </Nav>
          
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar