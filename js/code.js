var urlBase = 'http://137.184.14.240/LAMPAPI';
var extension = 'php';

var userId = 0;
var Name = "";
var Photo = "";
var b = "";

function doLogin()
{
	userId = 0;
	Name = "";
		
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5(password);
	
	document.getElementById("result").innerHTML = "";


	var tmp = {Login:login,Password:hash};

	var jsonPayload = JSON.stringify(tmp);
	
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("result").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				Name = jsonObject.Name;
				Photo = jsonObject.photo;

				saveCookie();
	
				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("result").innerHTML = err.message;
	}

}

function createAccount()
{

	var login = document.getElementById("loginName").value;
	var createPassword = document.getElementById("loginPassword").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	var photo = document.getElementById("photoid").value;
	var name = document.getElementById("nameid").value;
	
		
	if(createPassword == confirmPassword && createPassword.length > 7 && (login != "" && createPassword != "" && confirmPassword != "" && photo != "" && name != ""))
	{
		var tmp = {Login:login};
		var jsonPayload = JSON.stringify( tmp );
		var url = urlBase + '/GetID.' + extension;

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					var jsonObject = JSON.parse( xhr.responseText );
					good = jsonObject.id;

					if(good == 0)
					{

						var hash = md5(createPassword);
						var tmp1 = {Name:name,Login:login,Password:hash, Contactphoto:photo};
						var jsonPayload1 = JSON.stringify( tmp1 );
						
						var url1 = urlBase + '/Register.' + extension;

						var xhr1 = new XMLHttpRequest();
						xhr1.open("POST", url1, true);
						xhr1.setRequestHeader("Content-type", "application/json; charset=UTF-8");
						try
						{
							xhr1.onreadystatechange = function() 
							{
								if (this.readyState == 4 && this.status == 200) 
								{

									doLogin();
								}
							};
							xhr1.send(jsonPayload1);
						}
						catch(err)
						{
							document.getElementById("result").innerHTML = err.message;
						}

					}
					else
					{
						document.getElementById("result").innerHTML = "Username already exists.";
					}
					
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("result").innerHTML = err.message;
		}
	}
	else
	{
		if(!(login != "" && createPassword != "" && confirmPassword != "" && photo != "" && name != ""))
			document.getElementById("result").innerHTML = "All fields required.";
		else if(createPassword != confirmPassword)
			document.getElementById("result").innerHTML = "Password fields must match.";
		else
			document.getElementById("result").innerHTML = "Password must be at least 8 charactors long.";
	}
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "Name=" + Name + ",userId=" + userId + ",photo=" + Photo +";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "Name" )
		{
			Name = tokens[1];
		}
		else if( tokens[0] == "photo" )
		{
			Photo = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("Name").innerHTML = Name;
		document.getElementById("pfp").src = Photo;
	}
}

function doLogout()
{
	userId = 0;
	Name = "";
	Photo = "";
	document.cookie = "Name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}


/* ADDED FUNCTION */

function goToLoginPage()
{
	userId = 0;
	Name = "";
	Photo = "";
	document.cookie = "Name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "login.html";
}

function goToSignUpPage()
{
	userId = 0;
	Name = "";
	Photo = "";
	document.cookie = "Name= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "create.html";
}

function hidesearchbar()
{
	document.getElementById('hider').style.display='none';
}


function contactInfo (i)
{
	var splits = i.split(",");

	var contactname = splits[0];
	var contactphoto = splits[1];
	var ID = splits[2];

	document.getElementById('hider').style.display='none';
	document.getElementById('hiderOpo').style.display='block';
	document.getElementById('searchText').style.display='none';
	document.getElementById("grabInfo").innerHTML = "<img id='pfp3' src = '" + contactphoto + "'/>" + " <p id='txtsearchformat2'>" + contactname + "</p>\r\n";
	document.getElementById("grabInfo2").innerHTML = "<p id='txtsearchformat5'>" + contactname + "</p>\r\n";
	document.getElementById('pfp3').style.display='block';

	var tmp = {ID:ID};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/ContactInfo.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var json = JSON.parse( xhr.responseText );

				document.getElementById("photo").innerHTML = json.photo;
				document.getElementById("email").innerHTML = json.email;
				document.getElementById("number").innerHTML = json.number;
				document.getElementById("address").innerHTML = json.address;
				document.getElementById("relationship").innerHTML = json.relationship;
				document.getElementById("note").innerHTML = json.note;
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{}
	
}

function backToSearch()
{
	document.getElementById('hiderOpo').scrollTop = 0;
	document.getElementById('hider').style.display='block';
	document.getElementById('hiderOpo').style.display='none';
	document.getElementById('searchText').style.display='block';
	document.getElementById('pfp3').style.display='none';
}

/* ---------- */

function addColor()
{
	var newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	var tmp = {color:newColor,userId,userId};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/AddColor.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function search()
{
	var srch = document.getElementById("searchText").value;
	var list = "";

	var tmp = {Search:srch,UserID:userId};
	var jsonPayload = JSON.stringify( tmp );

	var url = urlBase + '/Search.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var json = JSON.parse( xhr.responseText );
				

				for(var i = 0; i < json.results.length || i > 10; i++)
				{
					list += "<div onclick='contactInfo(\"" + json.results[i].Name  + "," + json.results[i].ContactPhoto + "," + json.results[i].ID  + "\");' class='buttonThing'><img id='pfp2' src = '" + 
					json.results[i].ContactPhoto + "'/>" + " <p id='txtsearchformat'>" + json.results[i].Name  + "</p></div>\r\n";
				}

				document.getElementById('hider').style.display='block';
				document.getElementById("List").innerHTML = list;
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{}
	
	/*var json = [
		{"Name": "Kanye West", "contactphoto": "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed00f17d4a99d0006d2e738%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D154%26cropX2%3D4820%26cropY1%3D651%26cropY2%3D5314"},
		{"Name": "Kanye Zest", "contactphoto": "https://i0.wp.com/thisbugslife.com/wp-content/uploads/2021/03/depositphotos_19638723-stock-photo-fresh-orange-fruit-with-leaf.jpg?ssl=1"},
		{"Name": "Kanye Rest", "contactphoto": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/11/22/08/kanye.jpg?width=982&height=726&auto=webp&quality=75"},
		{"Name": "Kanye Best", "contactphoto": "https://storage.googleapis.com/afs-prod/media/746904c6b2d84f798dfe797eef55f0ac/400.jpeg"},
		{"Name": "Donda West", "contactphoto": "https://th.bing.com/th/id/OIP.ZRIwZX8FnKm5llDAOsXs9gAAAA?w=177&h=180&c=7&r=0&o=5&pid=1.7"},
		{"Name": "Kim West", "contactphoto": "https://onobello.com/wp-content/uploads/2020/01/Kim-Kardashian-KKW-Beauty-2020-Camapign-OnoBello-5.jpg"},
		{"Name": "Super Man", "contactphoto": "https://th.bing.com/th/id/OIP.hJer70S1WigQvWoooTmTDQHaEK?w=258&h=182&c=7&r=0&o=5&pid=1.7"},
		{"Name": "Bat Man", "contactphoto": "https://th.bing.com/th/id/OIP.cWQUPZFYSb7_-G8x-79qowHaHa?w=183&h=184&c=7&r=0&o=5&pid=1.7"},
		{"Name": "KanyeLoves Kanye", "contactphoto": "https://th.bing.com/th/id/OIP.XAsMofaeyNsT1tkUxARb0QHaHa?w=177&h=180&c=7&r=0&o=5&pid=1.7"}
	
	];*/

	/*var list = "";

	for(var i = 0; i < json.length; i++)
	{
		list += "<div onclick='contactInfo(\"" + json[i].Name  + "," + json[i].contactphoto + "\");' class='buttonThing'><img id='pfp2' src = '" + 
		json[i].contactphoto + "'/>" + " <p id='txtsearchformat'>" + json[i].Name  + "</p></div>\r\n";
	}*/

	/*
iteration 1
<div onclick='contactInfo("Kanye,West,ImageLink");' class='buttonThing'>
<img id='pfp2' src = 'image1'/> <p id='txtsearchformat'> Kanye West </p>
</div>

iteration 2
<div onclick='contactInfo("Kanye,Zest,ImageLink2");' class='buttonThing'>
<img id='pfp2' src = 'image2'/> <p id='txtsearchformat'> Kanye Zest </p>
</div>
	*/
	//document.getElementById("List").innerHTML = "asdffffffffffffffffffffffffffffffffffffffffffffffff";
}