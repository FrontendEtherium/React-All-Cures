import React, { useState, useEffect } from 'react';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'
import CenterWell from '../Disease/CenterWell'

const ArticlePreview = (props) => {
    const [items, setItems] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [articleFilter, setArticleFilter]= useState(props.dcName? props.dcName: 'recent')
    
    function allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv`)
          .then((res) => res.json())
          .then((json) => {
            var temp = []
            if(articleFilter === props.dcName){
                json.forEach(i => {
                    if(i.dc_name === props.dcName && i.pubstatus_id === 3 && i.type.includes(2)){
                        temp.push(i)
                    }
                });
                setItems(temp)
            }
              else if(articleFilter === 'recent'){
                
                json.forEach(i => {
                    if(i.pubstatus_id === 3){
                        temp.push(i)
                    }
                });
                setItems(temp)
              } else if(articleFilter === 'earliest'){
                  json.forEach(i => {
                      if(i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  setItems(temp.reverse())
              } else if(articleFilter === 'diabetes'){
                  json.forEach(i => {
                      if(i.dc_name === 'Diabetes' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  setItems(temp)
              } else if(articleFilter === 'neurology'){
                  json.forEach(i => {
                      if(i.dc_name === 'Neurology' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  setItems(temp)
              } else if(articleFilter === 'arthritis'){
                  json.forEach(i => {
                      if(i.dc_name === 'Arthritis' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  setItems(temp)
              } else if(articleFilter === 'anemia'){
                  json.forEach(i => {
                      if(i.dc_name === 'Anemia' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  setItems(temp)
              }
            setLoaded(true)
          })
          .catch(err => 
            console.log(err)
        )
    }

    function articleFilterClick(e, filter) {
        setArticleFilter(filter)
        var siblings = e.target.parentNode.parentElement.children
        if(siblings){
            for(var i=0;i<siblings.length; i++){
                if(siblings[i].className =='active'){
                    siblings[i].classList.remove('active')
                }
              }
            e.target.parentElement.classList.add('active')
        }
    }

    useEffect(() => {
        allPosts()
    }, [articleFilter])

    if(!isLoaded){
        return (
            <div className="loader my-4">
                <i className="fa fa-spinner fa-spin fa-6x" />
            </div>
        );
    }
    else {
        return(
        <>
        <div className="container">
            <div className="row">
            <div class="tab-nav">
                {
                   props.type === "cures"?
                   null:
                   <>
               <div class="comman-heading">
                  <div class="h4 mt-4 text-capitalize">
                     {articleFilter} Cures
                  </div>
               </div>
               
                   <ul>
                   <li role="presentation" class="active ">
                      <button className="btn mr-2" onClick={(e) => articleFilterClick(e, 'recent')}>Recent</button>
                   </li>
                   <li role="presentation">
                      <button className="btn mr-2" onClick={(e) => articleFilterClick(e, 'earliest')}>Earliest</button>
                   </li>
                   <li role="presentation">
                      <button className="btn mr-2" onClick={(e) => articleFilterClick(e, 'diabetes')}>Diabetes</button>
                   </li>
                   <li role="presentation">
                      <button className="btn mr-2" onClick={(e) => articleFilterClick(e, 'neurology')}>Neurology</button>
                   </li>
                   <li role="presentation">
                      <button className="btn mr-2" onClick={(e) => articleFilterClick(e, 'arthritis')}>Arthritis</button>
                   </li>
                   <li role="presentation">
                      <button className="btn mr-2" onClick={(e) => articleFilterClick(e, 'anemia')}>Anemia</button>
                   </li>
                   {/* <li role="presentation">
                      <button className="btn" onClick={(e) => articleFilterClick(e, 'recent')}>Most Rated</button>
                   </li> */}
                </ul>
               </>
    }
               
            </div>
               {/* <div className="comman-heading">
                  <div className="h4 float-left mr-4">Recent Articles</div> */}
                {/* <span><Link className="btn btn-article-search color-white" to="/cures">All Articles</Link></span> */}

               {/* </div> */}
            </div>
            <div className="row">
            <div className="main-hero" id="main-hero">
                {items.filter((i, idx) => idx < 9).map((i) => {
                    var content = []
                    var contentBlocks = []
                    var imgLocation = i.content_location
                    var imageLoc = '';
                    if(i.content){
                        content = JSON.parse(decodeURIComponent(i.content.includes('%22%7D%7D%5D%7D')?i.content: i.content.replaceAll('%7D', '%22%7D%7D%5D%7D')))
                        contentBlocks = content.blocks
                    }
                    if(imgLocation && imgLocation.includes('cures_articleimages')){
                        imageLoc = `https://all-cures.com/`+imgLocation.replaceAll('json', 'png').split('/webapps/')[1]
                    } else {
                        imageLoc = 'https://all-cures.com/cures_articleimages//299/default.png'
                    }
                    return(
                    <div className="col-4">
                    <div className="card my-2 w-100">
                        <div className='card-img'><img src={imageLoc} /></div>
                        <div className="card-body">
                            <h5 className="card-title text-capitalize"><Link to={`/cure/${i.article_id}`}>{i.title.toLowerCase()}</Link></h5>
                            <div className="card-info">
                                <h6 className="card-subtitle mb-2 text-muted text-capitalize">
                                    {i.window_title.toLowerCase()}
                                </h6>
                                <p className="card-text card-article-content-preview">
                                    {
                                        contentBlocks?
                                            contentBlocks.map((j, idx) => idx<1 && (
                                                <CenterWell
                                                    content = {j.data.content}
                                                    type = {j.type}
                                                    text = {j.data.text.substr(0, 200) + '....'}
                                                    title = {j.data.title}
                                                    message = {j.data.message}
                                                    source = {j.data.source}
                                                    embed = {j.data.embed}
                                                    caption = {j.data.caption}
                                                    alignment = {j.data.alignment}
                                                    imageUrl = {j.data.file? j.data.file.url: null}
                                                    url = {j.data.url}
                                                />
                                            ))
                                            : null
                                    }
                                {/* {
                                    i.content ?
                                    decodeURIComponent(i.content).blocks.map((j) => (
                                        <CenterWell
                                            content = {j.data.content}
                                            type = {j.type}
                                            text = {j.data.text}
                                            title = {j.data.title}
                                            message = {j.data.message}
                                            source = {j.data.source}
                                            embed = {j.data.embed}
                                            caption = {j.data.caption}
                                            alignment = {j.data.alignment}
                                            imageUrl = {j.data.file? j.data.file.url: null}
                                            url = {j.data.url}
                                        />
                                    ))
                                    : null
                                } */}
                                    {/* ${p.body.substr(0, 200)}<a href="#">...read more</a> */}
                                </p>
                                {/* <span><Link to={`/cure/${i.article_id}`}>...read more</Link></span> */}
                            </div>
                            {/* <a href="#" className="card-link" id="comment-link">Comment</a> */}
                            {/* <a href="#" className="card-link">Like</a> */}
                        </div>
                    </div>
                    {/* </Link> */}
                </div>
                )}) }
            </div>
            </div>
            </div>
        </>
    )
}
}

export default ArticlePreview