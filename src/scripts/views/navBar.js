import React from 'react'

const NavBar = React.createClass({
	 render: function() {
	 	return (
	 		<nav className="nav-bar" >
	 			<h1>ok corpus</h1>
	 			<div className="nav-list">
	 			  <a className="waves-effect waves-light btn" href="#sketches">sketch menu</a>
	 			  <a className="waves-effect waves-light btn" href="#home">home</a>
	 			</div>
	 		</nav>
	 	)
 	}
})

export default NavBar
