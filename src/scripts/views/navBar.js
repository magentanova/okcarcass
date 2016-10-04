import React from 'react'

const NavBar = React.createClass({
	 render: function() {
	 	return (
	 		<nav className="nav-bar" >
	 			<div className="nav-list">
	 			  <a href="#sketches">sketch menu</a>
	 			  <a href="#home">home</a>
	 			</div>
	 		</nav>
	 	)
 	}
})

export default NavBar
