function Gallery({pictureCard}){

    function oncommentClicked(){
        alert("clicked")
    }

    return(
        <div className="picture-card">
        <div className="picture">
            <img src ={pictureCard.url} alt= {pictureCard.title}/>
            <div className="overlay">
                <button className="commentBtn" onClick={oncommentClicked}>
                    message
                </button>
            </div>
        </div>
        </div>
    )
}

export default Gallery