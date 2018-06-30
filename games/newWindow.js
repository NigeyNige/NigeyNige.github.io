function onClick(path) {
	let myWindow;
	if (path === 'bookshop')
    	myWindow = window.open(path, "", "width=480, height=270");  // Opens a new window
	else if (path === 'web-mech')
		myWindow = window.open(path, "", "width=800, height=600");
	myWindow.focus();
}