import React from "react";

import HashLoader from "react-spinners/ClipLoader";

function Loader(){

let [loading, setLoading]= usestate(true);

let [color, setColor]=usestate("#ffffff");

const override =css`

display: block;

margin: 0 auto;

border-color: red;

`;

return (

<div>

<div className="sweet-loading">

<HashLoader color='#000' loading={loading} css='' size={80} />

</div>

</div>

);
}

export default Loader;