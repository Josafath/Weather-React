

export default function PopUp() {
    
    return(
        <div id="myModal" className="modal">
        <div className="modal-content">
            <h1>Location not found. </h1>
            <p>Search must be in the form of "City", "City, State" or "City, Country".</p>
            <button id="button-close" onClick= {() =>  document.querySelector(".modal").style.display = 'none'}>Close</button>
        </div>
    </div>
    )
}